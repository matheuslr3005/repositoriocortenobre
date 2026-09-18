/* Simulador da Storefront API para testar a integração sem credenciais.
   Só serve ao desenvolvimento local: não vai para produção (.vercelignore). */
const gid = (tipo, n) => `gid://shopify/${tipo}/${n}`;

const PRODUTOS = [
  { handle: 'ximango-8-osso', titulo: 'Ximango 8" · cabo osso', preco: '239.90', tags: ['aco:inox','modelo:ximango','lamina:8','cabo:osso'], estoque: 4,
    desc: 'Virola de alumínio e topo em acrílico preto.' },
  { handle: 'fulltang-9-madeira', titulo: 'Fulltang 9" · cabo madeira', preco: '239.90', comparar: '279.90', tags: ['aco:inox','modelo:fulltang','lamina:9','cabo:madeira'], estoque: 2,
    desc: 'Espiga inteira com talas pinadas em latão.' },
  { handle: 'fulltang-7-figurada', titulo: 'Fulltang 7" · madeira figurada', preco: '189.90', tags: ['aco:inox','modelo:fulltang','lamina:7','cabo:madeira'], estoque: 0,
    desc: 'Guarda em latão gravado e bainha de couro inclusa.' },
  { handle: 'carbono-9-chifre', titulo: 'Carbono 9" · cabo chifre', preco: '199.90', tags: ['aco:carbono','modelo:ximango','lamina:9','cabo:chifre'], estoque: 6,
    desc: 'Lâmina forjada com gravação. Cabo em chifre escuro com virola de alumínio.' },
  { handle: 'carbono-12-ximango', titulo: 'Ximango 12" · aço carbono', preco: '289.90', tags: ['aco:carbono','modelo:ximango','lamina:12','cabo:chifre'], estoque: 1,
    desc: 'Lâmina longa de desossa em carbono forjado.' },
];

const noProduto = (p, i) => ({
  id: gid('Product', 100 + i),
  handle: p.handle,
  title: p.titulo,
  description: p.desc,
  availableForSale: p.estoque > 0,
  tags: p.tags,
  productType: 'Faca',
  images: { nodes: [{ url: `http://localhost:8123/img/${p.handle}.webp`, altText: p.titulo }] },
  options: [{ name: 'Título', values: ['Padrão'] }],
  variants: { nodes: [{
    id: gid('ProductVariant', 200 + i),
    title: 'Padrão',
    availableForSale: p.estoque > 0,
    quantityAvailable: p.estoque,
    price: { amount: p.preco, currencyCode: 'BRL' },
    compareAtPrice: p.comparar ? { amount: p.comparar, currencyCode: 'BRL' } : null,
    selectedOptions: [{ name: 'Título', value: 'Padrão' }],
  }] },
});

const carrinhos = new Map();

const acharVariante = (id) => {
  const i = PRODUTOS.findIndex((_, idx) => gid('ProductVariant', 200 + idx) === id);
  return i < 0 ? null : { indice: i, produto: PRODUTOS[i] };
};

function montarCarrinho(id) {
  const linhas = carrinhos.get(id) || [];
  const nos = linhas.map((l, n) => {
    const v = acharVariante(l.merchandiseId);
    return {
      id: `${id}-line-${n}`,
      quantity: l.quantity,
      cost: { totalAmount: { amount: (Number(v.produto.preco) * l.quantity).toFixed(2), currencyCode: 'BRL' } },
      merchandise: {
        id: l.merchandiseId,
        title: 'Padrão',
        price: { amount: v.produto.preco, currencyCode: 'BRL' },
        image: { url: `http://localhost:8123/img/${v.produto.handle}.webp` },
        product: { handle: v.produto.handle, title: v.produto.titulo },
      },
    };
  });
  const total = nos.reduce((s, l) => s + Number(l.cost.totalAmount.amount), 0).toFixed(2);
  return {
    id,
    checkoutUrl: `http://localhost:8123/mock-checkout?cart=${encodeURIComponent(id)}`,
    totalQuantity: nos.reduce((s, l) => s + l.quantity, 0),
    cost: { subtotalAmount: { amount: total, currencyCode: 'BRL' }, totalAmount: { amount: total, currencyCode: 'BRL' } },
    lines: { nodes: nos },
  };
}

export function responder(corpo) {
  const { query, variables = {} } = corpo;

  if (query.includes('query Pecas')) {
    const nodes = PRODUTOS.map(noProduto);
    return { data: { collection: { products: { nodes } }, products: { nodes } } };
  }

  if (query.includes('query Carrinho')) {
    const id = variables.id;
    return { data: { cart: carrinhos.has(id) ? montarCarrinho(id) : null } };
  }

  if (query.includes('cartCreate')) {
    const id = gid('Cart', Math.random().toString(36).slice(2));
    carrinhos.set(id, variables.input?.lines || []);
    return { data: { cartCreate: { cart: montarCarrinho(id), userErrors: [] } } };
  }

  if (query.includes('cartLinesAdd')) {
    const { id, lines } = variables;
    const atuais = carrinhos.get(id) || [];
    lines.forEach((nova) => {
      const igual = atuais.find((l) => l.merchandiseId === nova.merchandiseId);
      if (igual) igual.quantity += nova.quantity;
      else atuais.push({ ...nova });
    });
    carrinhos.set(id, atuais);
    return { data: { cartLinesAdd: { cart: montarCarrinho(id), userErrors: [] } } };
  }

  if (query.includes('cartLinesUpdate')) {
    const { id, lines } = variables;
    const atuais = carrinhos.get(id) || [];
    lines.forEach((alvo) => {
      const n = Number(alvo.id.split('-line-')[1]);
      if (atuais[n]) atuais[n].quantity = alvo.quantity;
    });
    carrinhos.set(id, atuais);
    return { data: { cartLinesUpdate: { cart: montarCarrinho(id), userErrors: [] } } };
  }

  if (query.includes('cartLinesRemove')) {
    const { id, lineIds } = variables;
    const fora = lineIds.map((l) => Number(l.split('-line-')[1]));
    carrinhos.set(id, (carrinhos.get(id) || []).filter((_, n) => !fora.includes(n)));
    return { data: { cartLinesRemove: { cart: montarCarrinho(id), userErrors: [] } } };
  }

  return { errors: [{ message: 'Operação não simulada pelo mock.' }] };
}

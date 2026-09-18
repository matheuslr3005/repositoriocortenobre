/* ==========================================================================
   Corte Nobre · Shopify Storefront API
   --------------------------------------------------------------------------
   Aqui só entra o token PÚBLICO de Storefront (o que começa com as chaves de
   "Headless" ou de um app customizado com acesso de Storefront). Esse token é
   feito para rodar no navegador e só dá acesso ao catálogo e ao carrinho.
   NUNCA coloque neste arquivo o token de Admin API: ele é secreto e daria
   acesso a pedidos e clientes a quem abrisse o código do site.
   ========================================================================== */
import { SHOPIFY, PECAS as PECAS_LOCAIS } from './dados.js';

export const ativo = () =>
  Boolean(SHOPIFY?.dominio && SHOPIFY?.token && !SHOPIFY.dominio.includes('sua-loja'));

const endereco = () =>
  SHOPIFY.endpoint || `https://${SHOPIFY.dominio}/api/${SHOPIFY.versao}/graphql.json`;

/* ---------- transporte ---------- */
export async function consulta(query, variables = {}) {
  const resposta = await fetch(endereco(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY.token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!resposta.ok) throw new Error(`Shopify respondeu ${resposta.status}`);

  const { data, errors } = await resposta.json();
  if (errors?.length) throw new Error(errors.map((e) => e.message).join(' · '));
  return data;
}

/* ---------- catálogo ---------- */
const CAMPOS_PRODUTO = `
  id
  handle
  title
  description
  availableForSale
  tags
  productType
  images(first: 4) { nodes { url(transform: {maxHeight: 1400}) altText } }
  options { name values }
  variants(first: 20) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      selectedOptions { name value }
    }
  }
`;

const CONSULTA_PRODUTOS = `
  query Pecas($quantidade: Int!, $colecao: String) {
    collection(handle: $colecao) {
      products(first: $quantidade) { nodes { ${CAMPOS_PRODUTO} } }
    }
    products(first: $quantidade, sortKey: CREATED_AT, reverse: true) {
      nodes { ${CAMPOS_PRODUTO} }
    }
  }
`;

/* As tags mandam nos filtros do site. Formato: "aco:inox", "modelo:fulltang",
   "lamina:8", "cabo:osso". Sem tag, o site tenta deduzir do título. */
function daTag(tags, chave) {
  const achou = tags.find((t) => t.toLowerCase().startsWith(`${chave}:`));
  return achou ? achou.split(':')[1].trim().toLowerCase() : null;
}

function deduzir(produto) {
  const texto = `${produto.title} ${produto.productType} ${produto.description}`.toLowerCase();
  const polegadas = texto.match(/(\d{1,2})\s*"/)?.[1] || texto.match(/(\d{1,2})\s*polegada/)?.[1];
  return {
    aco: /carbono/.test(texto) ? 'carbono' : 'inox',
    modelo: /fulltang|full tang|espiga inteira/.test(texto) ? 'fulltang' : 'ximango',
    polegadas: polegadas ? Number(polegadas) : null,
    cabo: /osso/.test(texto) ? 'osso' : /chifre/.test(texto) ? 'chifre' : /madeira|imbuia/.test(texto) ? 'madeira' : null,
  };
}

/* Quando o handle do produto bate com uma peça local, o site usa as fotos já
   tratadas em img/. É o que mantém o visual do catálogo mesmo com o Shopify
   servindo preço e estoque. */
function fotosDe(produto, local) {
  const doShopify = produto.images.nodes.map((i) => i.url);
  if (local?.fotos?.length) return local.fotos;
  return doShopify.length ? doShopify : [];
}

export function mapear(produto) {
  const tags = produto.tags || [];
  const deduzido = deduzir(produto);
  const local = PECAS_LOCAIS.find((p) => p.id === produto.handle);
  const variante = produto.variants.nodes.find((v) => v.availableForSale) || produto.variants.nodes[0];

  const polegadas = Number(daTag(tags, 'lamina')) || deduzido.polegadas || local?.polegadas || null;
  const cabo = daTag(tags, 'cabo') || deduzido.cabo || local?.cabo || null;

  return {
    id: produto.handle,
    idShopify: produto.id,
    nome: produto.title,
    aco: daTag(tags, 'aco') || deduzido.aco,
    modelo: daTag(tags, 'modelo') || deduzido.modelo,
    polegadas,
    lamina: polegadas ? `${polegadas}"` : (local?.lamina ?? ''),
    cabo,
    caboRotulo: local?.caboRotulo || (cabo ? cabo[0].toUpperCase() + cabo.slice(1) : 'A combinar'),
    detalhe: (produto.description || local?.detalhe || '').trim(),
    preco: variante ? Math.round(Number(variante.price.amount) * 100) : null,
    moeda: variante?.price?.currencyCode || 'BRL',
    precoDe: variante?.compareAtPrice ? Math.round(Number(variante.compareAtPrice.amount) * 100) : null,
    disponivel: produto.availableForSale,
    variantId: variante?.id || null,
    variantes: produto.variants.nodes.map((v) => ({
      id: v.id,
      titulo: v.title,
      disponivel: v.availableForSale,
      preco: Math.round(Number(v.price.amount) * 100),
      opcoes: v.selectedOptions,
    })),
    fotos: fotosDe(produto, local),
  };
}

export async function buscarPecas() {
  const dados = await consulta(CONSULTA_PRODUTOS, {
    quantidade: 60,
    colecao: SHOPIFY.colecao || 'facas',
  });
  const nos = dados.collection?.products?.nodes?.length
    ? dados.collection.products.nodes
    : dados.products.nodes;
  return nos.map(mapear).filter((p) => p.fotos.length);
}

/* ---------- carrinho ---------- */
const CAMPOS_CARRINHO = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 50) {
    nodes {
      id
      quantity
      cost { totalAmount { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          id
          title
          price { amount currencyCode }
          image { url(transform: {maxHeight: 300}) }
          product { handle title }
        }
      }
    }
  }
`;

const CHAVE_CARRINHO = 'cn.shopify.cart';

const guardarId = (id) => { try { localStorage.setItem(CHAVE_CARRINHO, id); } catch {} };
const idGuardado = () => { try { return localStorage.getItem(CHAVE_CARRINHO); } catch { return null; } };
const esquecerId = () => { try { localStorage.removeItem(CHAVE_CARRINHO); } catch {} };

function normalizar(carrinho) {
  if (!carrinho) return null;
  return {
    id: carrinho.id,
    checkoutUrl: carrinho.checkoutUrl,
    quantidade: carrinho.totalQuantity,
    total: Math.round(Number(carrinho.cost.totalAmount.amount) * 100),
    subtotal: Math.round(Number(carrinho.cost.subtotalAmount.amount) * 100),
    moeda: carrinho.cost.totalAmount.currencyCode,
    linhas: carrinho.lines.nodes.map((l) => ({
      lineId: l.id,
      qtd: l.quantity,
      id: l.merchandise.product.handle,
      nome: l.merchandise.product.title,
      variante: l.merchandise.title,
      variantId: l.merchandise.id,
      preco: Math.round(Number(l.merchandise.price.amount) * 100),
      foto: l.merchandise.image?.url || null,
    })),
  };
}

const erros = (bloco) => {
  const lista = bloco?.userErrors || [];
  if (lista.length) throw new Error(lista.map((e) => e.message).join(' · '));
};

export async function carrinhoAtual() {
  const id = idGuardado();
  if (!id) return null;
  const dados = await consulta(`query Carrinho($id: ID!) { cart(id: $id) { ${CAMPOS_CARRINHO} } }`, { id });
  if (!dados.cart) { esquecerId(); return null; }   // carrinho expirado ou já finalizado
  return normalizar(dados.cart);
}

export async function criarCarrinho(linhas = []) {
  const dados = await consulta(
    `mutation Criar($input: CartInput!) {
      cartCreate(input: $input) { cart { ${CAMPOS_CARRINHO} } userErrors { field message } }
    }`,
    { input: { lines: linhas } }
  );
  erros(dados.cartCreate);
  const carrinho = normalizar(dados.cartCreate.cart);
  guardarId(carrinho.id);
  return carrinho;
}

export async function adicionar(variantId, qtd = 1) {
  const id = idGuardado();
  if (!id) return criarCarrinho([{ merchandiseId: variantId, quantity: qtd }]);

  const dados = await consulta(
    `mutation Adicionar($id: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $id, lines: $lines) { cart { ${CAMPOS_CARRINHO} } userErrors { field message } }
    }`,
    { id, lines: [{ merchandiseId: variantId, quantity: qtd }] }
  );
  erros(dados.cartLinesAdd);
  if (!dados.cartLinesAdd.cart) {   // o carrinho sumiu do lado do Shopify
    esquecerId();
    return criarCarrinho([{ merchandiseId: variantId, quantity: qtd }]);
  }
  return normalizar(dados.cartLinesAdd.cart);
}

export async function atualizar(lineId, qtd) {
  const id = idGuardado();
  if (!id) return null;
  const dados = await consulta(
    `mutation Atualizar($id: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $id, lines: $lines) { cart { ${CAMPOS_CARRINHO} } userErrors { field message } }
    }`,
    { id, lines: [{ id: lineId, quantity: qtd }] }
  );
  erros(dados.cartLinesUpdate);
  return normalizar(dados.cartLinesUpdate.cart);
}

export async function remover(lineId) {
  const id = idGuardado();
  if (!id) return null;
  const dados = await consulta(
    `mutation Remover($id: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $id, lineIds: $lineIds) { cart { ${CAMPOS_CARRINHO} } userErrors { field message } }
    }`,
    { id, lineIds: [lineId] }
  );
  erros(dados.cartLinesRemove);
  return normalizar(dados.cartLinesRemove.cart);
}

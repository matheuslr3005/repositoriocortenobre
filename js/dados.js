/* Catálogo e configuração da Corte Nobre.
   Peças, preços e textos vieram do material enviado pela oficina.
   Para mudar telefone, e-mail ou redes, edite apenas o bloco CONTATO. */

/* --------------------------------------------------------------------------
   Shopify
   Preencha os três primeiros campos para o site passar a vender pelo Shopify:
   catálogo, estoque, preço e checkout vêm de lá. Enquanto estiver em branco,
   o site funciona com a lista PECAS abaixo e fecha o pedido pelo WhatsApp.

   dominio  loja.myshopify.com (o domínio interno, não o domínio da loja)
   token    Storefront API access token (PÚBLICO, feito para o navegador).
            Nunca use aqui o token de Admin API.
   colecao  handle da coleção que alimenta o catálogo (deixe '' para usar
            todos os produtos da loja)
   -------------------------------------------------------------------------- */
export const SHOPIFY = {
  dominio: '',          // ex.: 'corte-nobre.myshopify.com'
  token: '',            // Storefront API access token (público)
  colecao: 'facas',     // handle da coleção; '' usa todos os produtos
  versao: '2026-07',
  endpoint: '',         // deixe vazio; só serve para teste local
};

export const CONTATO = {
  linkWhatsapp: 'https://w.app/uninqw', // link direto do WhatsApp Business, a conversa continua por lá
  whatsappVisivel: '(51) 99316-3033',
  email: 'contato@cortenobre.com.br',
  instagram: 'https://www.instagram.com/facascortenobre/',
  instagramVisivel: '@facascortenobre',
  horario: 'Segunda a sexta, 9h às 18h',
  agendamento: 'Sábado sob agendamento',
};

const F = (nome) => `img/${nome}.webp`;

export const PECAS = [
  {
    id: 'ximango-8-osso',
    nome: 'Língua de Ximango 8" · cabo osso',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'osso',
    caboRotulo: 'Osso',
    detalhe: 'Virola de alumínio e topo em acrílico preto.',
    preco: 22990,
    fotos: [F('inox-8-osso-v2')],
  },
  {
    id: 'ximango-8-imbuia-ouro',
    nome: 'Língua de Ximango 8" · imbuia com folha de ouro',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'madeira',
    caboRotulo: 'Imbuia com resina',
    detalhe: 'Anel de resina com folha de ouro entre filetes pretos.',
    preco: 22990,
    fotos: [F('inox-8-imbuia-ouro-v2'), F('inox-8-imbuia-ouro-v2-b')],
  },
  {
    id: 'ximango-8-imbuia-prata',
    nome: 'Língua de Ximango 8" · imbuia com anel claro',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'madeira',
    caboRotulo: 'Imbuia com resina',
    detalhe: 'Anel de resina clara entre filetes pretos.',
    preco: 22990,
    fotos: [F('inox-8-imbuia-prata-v2'), F('inox-8-imbuia-prata-v2-b')],
  },
  {
    id: 'fulltang-9-madeira',
    nome: 'Fulltang 9" · cabo madeira',
    aco: 'inox',
    modelo: 'fulltang',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira estabilizada',
    detalhe: 'Espiga inteira com talas pinadas em latão.',
    preco: 23990,
    fotos: [F('fulltang-9-a'), F('fulltang-9-b'), F('fulltang-9-c'), F('fulltang-9-d')],
  },
  {
    id: 'fulltang-7-figurada',
    nome: 'Fulltang 7" · madeira figurada',
    aco: 'inox',
    modelo: 'fulltang',
    polegadas: 7,
    lamina: '7" (178mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira figurada',
    detalhe: 'Guarda em latão gravado e bainha de couro inclusa.',
    preco: 18990,
    fotos: [F('fulltang-7-a'), F('fulltang-7-b'), F('fulltang-7-c')],
  },
  {
    id: 'forjada-8-chifre',
    nome: 'Língua de Ximango 8" forjada · cabo chifre',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre',
    detalhe: 'Lâmina com acabamento de forja e lombo entalhado. Virola de alumínio sobre base em osso.',
    preco: null,
    fotos: [F('inox-8r-a')],
  },
  {
    id: 'forjada-8-madeira',
    nome: 'Língua de Ximango 8" forjada · cabo madeira',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira estabilizada',
    detalhe: 'Lâmina com acabamento de forja e lombo entalhado. Virola de alumínio.',
    preco: null,
    fotos: [F('inox-8r-b'), F('inox-8r-b-2')],
  },
  {
    id: 'forjada-8-osso',
    nome: 'Língua de Ximango 8" forjada · cabo osso',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'osso',
    caboRotulo: 'Osso',
    detalhe: 'Lâmina com acabamento de forja e lombo entalhado. Virola de alumínio.',
    preco: null,
    fotos: [F('inox-8r-c'), F('inox-8r-c-2')],
  },
  {
    id: 'carbono-9-chifre',
    nome: 'Carbono 9" · cabo chifre',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre escuro',
    detalhe: 'Lâmina forjada com gravação. Cabo em chifre escuro com virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-9-a2')],
  },
  {
    id: 'carbono-12-ximango',
    nome: 'Língua de Ximango 12" · aço carbono',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 12,
    lamina: '12" (305mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre, madeira ou osso',
    detalhe: 'Lâmina longa de desossa em carbono forjado. Cabo escolhido a cada peça.',
    preco: null,
    fotos: [F('ximango-carbono-12'), F('ximango-carbono-12-osso')],
  },
];

export const FILTROS = {
  modelo: [
    { valor: 'fulltang', rotulo: 'Fulltang' },
    { valor: 'ximango', rotulo: 'Língua de ximango' },
  ],
  polegadas: [
    { valor: '7', rotulo: '7"' },
    { valor: '8', rotulo: '8"' },
    { valor: '9', rotulo: '9"' },
    { valor: '12', rotulo: '12"' },
  ],
  cabo: [
    { valor: 'osso', rotulo: 'Osso' },
    { valor: 'madeira', rotulo: 'Madeira' },
    { valor: 'chifre', rotulo: 'Chifre' },
  ],
};

/* Orientação de uso que sai impressa com cada peça. Texto da própria oficina. */
export const CUIDADOS = {
  geral: {
    titulo: 'Vale para qualquer faca da casa',
    itens: [
      { rotulo: 'Destino', texto: 'As facas são destinadas para corte de churrasco.' },
      { rotulo: 'Secagem', texto: 'Mantenha sua faca sempre seca.' },
      { rotulo: 'Bainha', texto: 'A bainha serve para o transporte da faca. Evite deixar a peça guardada nela por longos períodos: o couro pode oxidar a lâmina aceleradamente.' },
    ],
  },
  carbono: {
    titulo: 'Facas em aço carbono',
    itens: [
      { rotulo: 'Oxidação natural', texto: 'O aço carbono tem um processo de oxidação natural. Não é defeito, é o comportamento do material.' },
      { rotulo: 'Lubrificação', texto: 'Armazene a faca seca e embebida em silicone, vaselina líquida, azeite ou óleo. Mesmo peças ainda sem uso pedem esse cuidado, para manter o brilho e resistir à oxidação.' },
      { rotulo: 'Pontos de oxidação', texto: 'Se aparecerem pontos alaranjados, limpe com bombril seco e passe um pano lubrificado com óleo. Os pontos ficam cinza escuro.' },
      { rotulo: 'Afiação', texto: 'Chaira estriada, pedra de afiação ou lixa, sempre que achar necessário. O fio volta com facilidade.' },
    ],
  },
  inox: {
    titulo: 'Facas em aço inox',
    itens: [
      { rotulo: 'Oxidação', texto: 'São conhecidas como facas que não enferrujam. Com mau uso ainda assim podem oxidar, porque toda faca tem percentual de carbono na composição.' },
      { rotulo: 'Afiação de 15° a 20°', texto: 'Afie com chaira passando a mesma quantidade de vezes de cada lado, em ângulo de 15° a 20°.' },
      { rotulo: 'Acabamento', texto: 'O inox tem acabamento brilhante e marca com facilidade. Sem prática na afiação, procure um profissional.' },
    ],
  },
  coloridas: {
    titulo: 'Facas douradas e black fosfatizada',
    itens: [
      { rotulo: 'Composição', texto: 'Produzidas em aço inox 420 com tratamento térmico de nitretação.' },
      { rotulo: 'Uso', texto: 'Não corte objetos com pontas, como carne com osso, para evitar arranhões.' },
      { rotulo: 'Limpeza', texto: 'Não deixe a lâmina molhada por muito tempo e nunca lave com a parte verde da esponja.' },
    ],
  },
};

/* --------------------------------------------------------------------------
   Fonte das peças
   Com o Shopify configurado, o catálogo vem de lá. Se a loja não responder,
   o site cai para a lista local em vez de ficar vazio.
   -------------------------------------------------------------------------- */
let cachePecas = null;
let lojaRespondeu = false;
let emVoo = null;

export function carregarPecas() {
  if (cachePecas) return Promise.resolve(cachePecas);
  emVoo = emVoo || buscar();          // chamadas simultâneas usam a mesma ida à loja
  return emVoo;
}

async function buscar() {
  const loja = await import('./shopify.js');
  if (!loja.ativo()) {
    cachePecas = PECAS;
    return cachePecas;
  }

  try {
    const doShopify = await loja.buscarPecas();
    if (doShopify.length) {
      cachePecas = doShopify;
      lojaRespondeu = true;
    } else {
      cachePecas = PECAS;                 // loja configurada, mas sem produtos publicados
    }
  } catch (erro) {
    console.warn('Shopify não respondeu. O site segue com o catálogo local e o pedido pelo WhatsApp.', erro);
    cachePecas = PECAS;
  }
  return cachePecas;
}

/* true só quando o catálogo veio mesmo da loja: é o que autoriza a sacola a
   usar o carrinho e o checkout do Shopify */
export const lojaEmPe = () => lojaRespondeu;

/* usado por quem precisa da peça depois que o catálogo já carregou */
export const pecasCarregadas = () => cachePecas || PECAS;

export const precoFmt = (centavos) =>
  centavos == null
    ? 'Sob consulta'
    : (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const acharPeca = (id) => pecasCarregadas().find((p) => p.id === id);

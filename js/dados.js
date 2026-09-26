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
  linkWhatsapp: 'https://wa.me/5551993163033', // link oficial do WhatsApp; precisa ser esse formato pro texto (?text=) funcionar
  whatsappVisivel: '(51) 99316-3033',
  email: 'contato@facascortenobre.com.br',
  instagram: 'https://www.instagram.com/facascortenobre/',
  instagramVisivel: '@facascortenobre',
  horario: 'Segunda a sexta, 9h às 18h',
  agendamento: 'Sábado sob agendamento',
};

const F = (nome) => `img/${nome}.webp`;

/* título do cartão: só aço e polegada, sem milimetragem, ex.: "Faca Inox 8"" */
export const tituloCard = (p) => `Faca ${p.aco === 'inox' ? 'Inox' : 'Carbono'} ${p.polegadas}"`;

/* subtítulo, embaixo do título: cabo e estilo de madeira, ex.: "Madeira imbuia com resina" */
export const especFmt = (p) => p.caboRotulo;

/* página do catálogo onde a peça mora, pra montar o link dela no site */
export const paginaDe = (p) =>
  p.modelo === 'fulltang' ? 'faca-fulltang.html' : p.aco === 'inox' ? 'faca-de-inox.html' : 'faca-de-carbono.html';

/* link direto pra peça (página do catálogo + #id), usado no pedido pelo WhatsApp */
export const linkDe = (p) => {
  const diretorio = location.pathname.replace(/[^/]*$/, '');
  return `${location.origin}${diretorio}${paginaDe(p)}#${p.id}`;
};

export const PECAS = [
  {
    id: 'ximango-8-osso',
    nome: 'Faca Inox 8" · cabo osso',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'osso',
    caboRotulo: 'Osso',
    detalhe: 'Virola de alumínio e topo em acrílico preto.',
    preco: 22990,
    fotos: [F('inox-8-osso-v3')],
  },
  {
    id: 'ximango-8-imbuia-ouro',
    nome: 'Faca Inox 8" · madeira imbuia com folha de ouro',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira imbuia com resina',
    detalhe: 'Anel de resina com folha de ouro entre filetes pretos.',
    preco: 22990,
    fotos: [F('inox-8-imbuia-ouro-v3')],
  },
  {
    id: 'ximango-8-imbuia-prata',
    nome: 'Faca Inox 8" · madeira imbuia com anel claro',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira imbuia com resina',
    detalhe: 'Anel de resina clara entre filetes pretos.',
    preco: 22990,
    fotos: [F('inox-8-imbuia-prata-v3')],
  },
  {
    id: 'ximango-8-imbuia-turquesa',
    nome: 'Faca Inox 8" · madeira imbuia com anel turquesa e ouro',
    aco: 'inox',
    modelo: 'ximango',
    polegadas: 8,
    lamina: '8" (203mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira imbuia com resina',
    detalhe: 'Anel de resina com folha de ouro e filete turquesa.',
    preco: 22990,
    fotos: [F('inox-8-imbuia-turquesa')],
  },
  {
    id: 'fulltang-9-madeira-a',
    nome: 'Fulltang 9" · cabo madeira',
    aco: 'carbono',
    modelo: 'fulltang',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira estabilizada',
    detalhe: 'Espiga inteira com talas pinadas em latão.',
    preco: 19990,
    fotos: [F('fulltang-9-f')],
  },
  {
    id: 'fulltang-9-madeira-b',
    nome: 'Fulltang 9" · cabo madeira',
    aco: 'carbono',
    modelo: 'fulltang',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira estabilizada',
    detalhe: 'Espiga inteira com talas pinadas em latão.',
    preco: 19990,
    fotos: [F('fulltang-9-g')],
  },
  {
    id: 'fulltang-9-madeira-clara',
    nome: 'Fulltang 9" · cabo madeira clara',
    aco: 'carbono',
    modelo: 'fulltang',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira clara',
    detalhe: 'Espiga inteira com talas pinadas, virola de latão.',
    preco: 19990,
    fotos: [F('fulltang-9-h')],
  },
  {
    id: 'fulltang-7-madeira-a',
    nome: 'Fulltang 7" · madeira figurada',
    aco: 'inox',
    modelo: 'fulltang',
    polegadas: 7,
    lamina: '7" (178mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira figurada',
    detalhe: 'Guarda em latão gravado e bainha de couro inclusa.',
    preco: 18990,
    fotos: [F('fulltang-7-d')],
  },
  {
    id: 'fulltang-7-madeira-b',
    nome: 'Fulltang 7" · madeira figurada',
    aco: 'inox',
    modelo: 'fulltang',
    polegadas: 7,
    lamina: '7" (178mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira figurada',
    detalhe: 'Guarda em latão gravado e bainha de couro inclusa.',
    preco: null,
    fotos: [F('fulltang-7-e')],
  },
  {
    id: 'fulltang-7-madeira-clara',
    nome: 'Fulltang 7" · madeira clara com virola',
    aco: 'inox',
    modelo: 'fulltang',
    polegadas: 7,
    lamina: '7" (178mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira clara',
    detalhe: 'Virola de latão e bainha de couro inclusa.',
    preco: null,
    fotos: [F('fulltang-7-f')],
  },
  {
    id: 'carbono-9-chifre-a',
    nome: 'Carbono 9" · cabo chifre',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre escuro',
    detalhe: 'Lâmina forjada com gravação. Cabo em chifre escuro com virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-9-b1')],
  },
  {
    id: 'carbono-9-chifre-b',
    nome: 'Carbono 9" · cabo chifre',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre escuro',
    detalhe: 'Lâmina forjada com gravação. Cabo em chifre escuro com virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-9-b2')],
  },
  {
    id: 'carbono-9-chifre-c',
    nome: 'Carbono 9" · cabo chifre',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre escuro',
    detalhe: 'Lâmina forjada com gravação. Cabo em chifre escuro com virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-9-b3')],
  },
  {
    id: 'carbono-bloco-madeira',
    nome: 'Faca carbono · cabo bloco de madeira',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira',
    detalhe: 'Cabo em bloco maciço de madeira com virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-bloco-madeira')],
  },
  {
    id: 'carbono-tatu-chifre-claro-a',
    nome: 'Faca carbono · cabo chifre claro',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre claro',
    detalhe: 'Lâmina forjada com gravação. Cabo em chifre claro com virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-tatu-chifre-claro')],
  },
  {
    id: 'carbono-tatu-chifre-claro-b',
    nome: 'Faca carbono · cabo chifre claro',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre claro',
    detalhe: 'Lâmina forjada com gravação. Cabo em chifre claro com virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-tatu-chifre-claro-b')],
  },
  {
    id: 'carbono-gaucho-osso',
    nome: 'Faca carbono · cabo osso',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'osso',
    caboRotulo: 'Osso',
    detalhe: 'Lâmina forjada com gravação de gaúcho laçando. Cabo em osso com espaçador de madeira e virola de latão.',
    preco: 19990,
    fotos: [F('carbono-gaucho-osso')],
  },
  {
    id: 'carbono-osso-queimado',
    nome: 'Faca carbono · cabo osso queimado',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'osso',
    caboRotulo: 'Osso queimado',
    detalhe: 'Cabo em osso com queima decorativa e virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-osso-queimado')],
  },
  {
    id: 'carbono-chama-chifre',
    nome: 'Faca carbono · cabo chifre',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre',
    detalhe: 'Lâmina com gravação vazada em formato de chama. Cabo em chifre com espaçador de madeira.',
    preco: 19990,
    fotos: [F('carbono-chama-chifre')],
  },
  {
    id: 'carbono-chama-osso-claro',
    nome: 'Faca carbono · cabo osso claro',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'osso',
    caboRotulo: 'Osso claro',
    detalhe: 'Lâmina com gravação vazada em formato de chama. Cabo em osso claro com espaçador de madeira.',
    preco: 19990,
    fotos: [F('carbono-chama-osso-claro')],
  },
  {
    id: 'carbono-madeira-notch-a',
    nome: 'Faca carbono · cabo madeira, lâmina entalhada',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira',
    detalhe: 'Lâmina com acabamento de forja e lombo entalhado. Virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-madeira-notch-a')],
  },
  {
    id: 'carbono-madeira-notch-b',
    nome: 'Faca carbono · cabo madeira, lâmina entalhada',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'madeira',
    caboRotulo: 'Madeira',
    detalhe: 'Lâmina com acabamento de forja e lombo entalhado. Virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-madeira-notch-b')],
  },
  {
    id: 'carbono-osso-claro',
    nome: 'Faca carbono · cabo osso claro',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'osso',
    caboRotulo: 'Osso',
    detalhe: 'Lâmina com acabamento de forja e lombo entalhado. Virola de alumínio.',
    preco: 19990,
    fotos: [F('carbono-osso-claro')],
  },
  {
    id: 'carbono-ram-chifre',
    nome: 'Faca carbono · cabo chifre',
    aco: 'carbono',
    modelo: 'ximango',
    polegadas: 9,
    lamina: '9" (229mm)',
    cabo: 'chifre',
    caboRotulo: 'Chifre',
    detalhe: 'Lâmina com gravação vazada da marca RAM. Cabo em chifre com espaçador de madeira.',
    preco: 19990,
    fotos: [F('carbono-ram-chifre')],
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
    await aplicarEstoqueAoVivo(cachePecas);
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

  await aplicarEstoqueAoVivo(cachePecas);
  return cachePecas;
}

/* Estoque sincronizado da Nuvemshop (netlify/functions/sync-estoque.mjs),
   publicado como estoque.json na raiz do site. Marca peça por peça quando
   o SKU (mesmo id do site) está zerado; se o arquivo não existir ainda ou
   a rede falhar, o catálogo segue normal, sem nenhuma peça esgotada. */
async function aplicarEstoqueAoVivo(pecas) {
  try {
    const resp = await fetch('estoque.json', { cache: 'no-store' });
    if (!resp.ok) return;
    const { indisponiveis } = await resp.json();
    if (!Array.isArray(indisponiveis)) return;
    const semEstoque = new Set(indisponiveis);
    pecas.forEach((p) => { if (semEstoque.has(p.id)) p.disponivel = false; });
  } catch {
    /* sem estoque.json publicado ainda, ou rede fora do ar: segue sem marcar nada */
  }
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

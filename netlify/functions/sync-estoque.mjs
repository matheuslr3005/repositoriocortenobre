/* ==========================================================================
   Corte Nobre · sincroniza estoque da Nuvemshop com o site
   Roda sozinha a cada 10 minutos (agendamento abaixo, sem precisar de
   netlify.toml). Lê o estoque de cada variante na Nuvemshop e, quando algum
   SKU está zerado, grava a lista em estoque.json na raiz do repositório —
   só um commit quando algo realmente muda. O site lê esse arquivo estático
   e marca a peça correspondente (mesmo id do site == SKU na Nuvemshop) como
   esgotada, sem tocar em preço, catálogo ou no fechamento de pedido.

   Sem dependências: só fetch e Buffer, nativos do Node.
   ========================================================================== */

const {
  NUVEMSHOP_STORE_ID,
  NUVEMSHOP_ACCESS_TOKEN,
  GITHUB_TOKEN,
  GITHUB_REPO,       // 'matheuslr3005/repositoriocortenobre'
  GITHUB_BRANCH,     // a branch que o Netlify publica
} = process.env;

const BASE_NUVEMSHOP = `https://api.tiendanube.com/2025-03/${NUVEMSHOP_STORE_ID}`;
const USER_AGENT = 'Corte Nobre site (contato@facascortenobre.com.br)';
const CAMINHO_ARQUIVO = 'estoque.json';

/* SKUs (variant.sku) com estoque zerado, direto da Nuvemshop.
   Não filtra pelos ids do site: quem decide o que fazer com cada SKU é o
   próprio site, ao ler estoque.json — aqui só reporta o que a loja disse. */
async function buscarSemEstoque() {
  const semEstoque = new Set();
  let url = `${BASE_NUVEMSHOP}/products?per_page=200&fields=variants`;

  while (url) {
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${NUVEMSHOP_ACCESS_TOKEN}`,
        'User-Agent': USER_AGENT,
      },
    });
    if (!resp.ok) throw new Error(`Nuvemshop respondeu ${resp.status} em ${url}`);
    const produtos = await resp.json();

    for (const produto of produtos) {
      for (const variante of produto.variants || []) {
        const sku = variante.sku;
        if (!sku) continue;
        const zerado = variante.stock_management && Number(variante.stock ?? 0) <= 0;
        if (zerado) semEstoque.add(sku);
      }
    }

    const link = resp.headers.get('link') || '';
    const prox = link.split(',').find((parte) => parte.includes('rel="next"'));
    url = prox ? prox.split(';')[0].trim().replace(/^<|>$/g, '') : null;
  }

  return [...semEstoque].sort();
}

async function lerArquivoAtual() {
  const resp = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${CAMINHO_ARQUIVO}?ref=${GITHUB_BRANCH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'User-Agent': USER_AGENT } },
  );
  if (resp.status === 404) return { sha: null, indisponiveis: [] };
  if (!resp.ok) throw new Error(`GitHub (leitura) respondeu ${resp.status}`);
  const dados = await resp.json();
  const conteudo = JSON.parse(Buffer.from(dados.content, 'base64').toString('utf8'));
  return { sha: dados.sha, indisponiveis: conteudo.indisponiveis || [] };
}

async function gravarArquivo(indisponiveis, shaAnterior) {
  const corpo = { atualizadoEm: new Date().toISOString(), indisponiveis };
  const conteudoBase64 = Buffer.from(JSON.stringify(corpo, null, 2)).toString('base64');

  const resp = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${CAMINHO_ARQUIVO}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'User-Agent': USER_AGENT,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Sincroniza estoque da Nuvemshop',
      content: conteudoBase64,
      branch: GITHUB_BRANCH,
      sha: shaAnterior || undefined,
    }),
  });
  if (!resp.ok) throw new Error(`GitHub (escrita) respondeu ${resp.status}: ${await resp.text()}`);
}

export default async () => {
  if (!NUVEMSHOP_STORE_ID || !NUVEMSHOP_ACCESS_TOKEN || !GITHUB_TOKEN || !GITHUB_REPO || !GITHUB_BRANCH) {
    console.warn('sync-estoque: faltam variáveis de ambiente, nada a fazer.');
    return new Response('config incompleta', { status: 200 });
  }

  try {
    const indisponiveis = await buscarSemEstoque();
    const atual = await lerArquivoAtual();

    const mudou = JSON.stringify(indisponiveis) !== JSON.stringify([...atual.indisponiveis].sort());
    if (!mudou) return new Response('sem mudança', { status: 200 });

    await gravarArquivo(indisponiveis, atual.sha);
    console.log(`sync-estoque: ${indisponiveis.length} peça(s) sem estoque.`);
    return new Response('ok', { status: 200 });
  } catch (erro) {
    console.error('sync-estoque falhou:', erro);
    return new Response('erro', { status: 500 });
  }
};

export const config = { schedule: '*/10 * * * *' };

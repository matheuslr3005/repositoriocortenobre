/* Monta as páginas finais a partir de src/.
   Uso: node build.mjs
   Cada arquivo em src/*.html vira um arquivo na raiz, com os includes expandidos. */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(fileURLToPath(import.meta.url));
const src = join(raiz, 'src');

const parte = (nome) => readFileSync(join(src, 'partes', nome), 'utf8').trimEnd();

const versao = Date.now().toString(36);

const mapa = {
  'faca-de-inox': 'inox',
  'faca-de-carbono': 'carbono',
  'faca-fulltang': 'fulltang',
  empresarial: 'empresarial',
  cuidados: 'cuidados',
  contato: 'contato',
};

const marcarNav = (html, pagina) => {
  const chave = mapa[pagina];
  if (!chave) return html;
  return html.replace(`data-pagina="${chave}"`, `data-pagina="${chave}" aria-current="page"`);
};

const expandir = (html, pagina) =>
  html.replace(/<!--\s*incluir:([\w.-]+)\s*-->/g, (_, nome) => parte(nome))
      .replace(/\{\{pagina\}\}/g, pagina)
      .replace(/href="(css\/[\w.-]+\.css)"/g, `href="$1?v=${versao}"`);

let n = 0;
for (const arquivo of readdirSync(src)) {
  if (!arquivo.endsWith('.html')) continue;
  const pagina = arquivo.replace('.html', '');
  const saida = marcarNav(expandir(readFileSync(join(src, arquivo), 'utf8'), pagina), pagina);
  writeFileSync(join(raiz, arquivo), saida);
  console.log('·', arquivo, `${(saida.length / 1024).toFixed(1)} KB`);
  n++;
}
console.log(`${n} páginas geradas`);

/* Cartão de peça usado na home e nas páginas de catálogo. */
import { precoFmt, especFmt } from './dados.js';
import { sacola, vendaAberta } from './sacola.js';

/* cada foto local tem uma versão pela metade, gerada no processamento */
const meia = (f) => (f.startsWith('img/') ? f.replace(/\.webp$/, '@half.webp') : f);

export function cartaoPeca(p, { etiqueta = true } = {}) {
  const fotos = p.fotos.map((f, i) =>
    `<img src="${f}" ${f.startsWith('img/') ? `srcset="${meia(f)} 700w, ${f} 1400w" sizes="(max-width: 620px) 46vw, 300px"` : ''}
          alt="${p.nome}" class="${i === 0 ? 'ativa' : ''}" loading="lazy" decoding="async" width="300" height="169">`
  ).join('');

  const pontos = p.fotos.length > 1
    ? `<span class="peca-pontos" aria-hidden="true">${p.fotos.map((_, i) => `<i class="${i === 0 ? 'ativo' : ''}"></i>`).join('')}</span>`
    : '';

  const selo = etiqueta
    ? `<span class="peca-etiqueta ${p.aco}">${p.aco === 'inox' ? 'Inox' : 'Carbono'}</span>`
    : '';

  const esgotada = (sacola.modo === 'shopify' && p.variantId && !p.disponivel) || (sacola.modo === 'local' && p.disponivel === false);
  const aberta = vendaAberta(p);
  const risco = p.precoDe && p.precoDe > p.preco
    ? `<s style="color:var(--aco);font-size:13px;margin-right:6px">${precoFmt(p.precoDe)}</s>`
    : '';

  const rotulo = esgotada
    ? `Avisar quando a ${p.nome} voltar`
    : aberta ? `Colocar ${p.nome} na sacola` : `Pedir orçamento da ${p.nome}`;

  const icone = esgotada
    ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v6M8 12h.01" stroke="currentColor" stroke-linecap="round"/><circle cx="8" cy="8" r="6.4" stroke="currentColor"/></svg>'
    : aberta
      ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1v14M1 8h14" stroke="currentColor"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 3h12v9H6l-4 3V3z" stroke="currentColor"/></svg>';

  return `
    <article class="peca${esgotada ? ' esgotada' : ''}" data-peca="${p.id}" data-aco="${p.aco}" data-modelo="${p.modelo}" data-polegadas="${p.polegadas ?? ''}" data-cabo="${p.cabo ?? ''}">
      <div class="peca-foto" data-galeria>
        ${selo}
        ${esgotada ? '<span class="peca-etiqueta esgotada-selo">Esgotada</span>' : ''}
        ${fotos}
        ${pontos}
        <button class="so-leitor" data-ficha="${p.id}" type="button">Ver detalhes da ${p.nome}</button>
      </div>
      <div class="peca-info">
        <h3>${p.nome}</h3>
        <p class="peca-spec">${especFmt(p)}</p>
        ${p.detalhe ? `<p class="legenda" style="margin-bottom:4px">${p.detalhe}</p>` : ''}
        <div class="peca-pe">
          <span class="peca-preco">${risco}${precoFmt(p.preco)}</span>
          <span class="peca-botoes">
            <button class="peca-ver" type="button" data-ficha="${p.id}">Detalhes</button>
            <button class="peca-add" type="button" data-add="${p.id}" aria-label="${rotulo}">${icone}</button>
          </span>
        </div>
      </div>
    </article>`;
}

/* troca a foto do cartão conforme o mouse atravessa a imagem */
export function ligarGalerias(raiz = document) {
  raiz.querySelectorAll('[data-galeria]').forEach((caixa) => {
    const fotos = [...caixa.querySelectorAll('img')];
    const pontos = [...caixa.querySelectorAll('.peca-pontos i')];
    if (fotos.length < 2) return;
    let atual = 0;
    const mostrar = (i) => {
      if (i === atual) return;
      atual = i;
      fotos.forEach((f, j) => f.classList.toggle('ativa', i === j));
      pontos.forEach((p, j) => p.classList.toggle('ativo', i === j));
    };
    caixa.addEventListener('pointermove', (e) => {
      const r = caixa.getBoundingClientRect();
      const faixa = Math.min(fotos.length - 1, Math.floor(((e.clientX - r.left) / r.width) * fotos.length));
      mostrar(Math.max(0, faixa));
    });
    caixa.addEventListener('pointerleave', () => mostrar(0));
  });
}

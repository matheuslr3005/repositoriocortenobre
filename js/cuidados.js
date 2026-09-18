/* Abas da página de cuidados: reaproveita o mesmo conteúdo da home. */
import { CUIDADOS } from './dados.js';

import { $, $$ } from './util.js';

addEventListener('DOMContentLoaded', () => {
  const barra = $('[data-abas]');
  const conteudo = $('#abas-conteudo');
  if (!barra || !conteudo) return;

  const chaves = [
    ['geral', 'Toda faca'],
    ['carbono', 'Aço carbono'],
    ['inox', 'Aço inox'],
    ['coloridas', 'Douradas e black'],
  ];

  barra.innerHTML = chaves.map(([k, rotulo], i) =>
    `<button class="aba" role="tab" id="aba-${k}" aria-controls="painel-${k}" aria-selected="${i === 0}" type="button" data-aba="${k}">${rotulo}</button>`
  ).join('');

  conteudo.innerHTML = chaves.map(([k], i) => {
    const bloco = CUIDADOS[k];
    return `
      <div class="painel-aba ${i === 0 ? 'ativo' : ''}" id="painel-${k}" role="tabpanel" aria-labelledby="aba-${k}" ${i === 0 ? '' : 'hidden'}>
        <h2 class="titulo-secao" style="font-size:clamp(22px,2.6vw,30px);margin-bottom:22px">${bloco.titulo}</h2>
        <dl class="cuidado-lista">
          ${bloco.itens.map((it) => `<div class="cuidado-item"><dt>${it.rotulo}</dt><dd>${it.texto}</dd></div>`).join('')}
        </dl>
      </div>`;
  }).join('');

  barra.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-aba]');
    if (!botao) return;
    $$('.aba', barra).forEach((b) => b.setAttribute('aria-selected', String(b === botao)));
    $$('.painel-aba', conteudo).forEach((p) => {
      const ativo = p.id === `painel-${botao.dataset.aba}`;
      p.classList.toggle('ativo', ativo);
      p.hidden = !ativo;
    });
  });
});

/* ==========================================================================
   Corte Nobre · catálogo com filtros
   Lê data-aco da própria seção para saber qual linha mostrar.
   ========================================================================== */
import { FILTROS, carregarPecas } from './dados.js';
import { cartaoPeca, ligarGalerias } from './pecas.js';
import { $, $$, calmo, abrirWhatsapp } from './util.js';
import { abrirFicha } from './app.js';

async function montar() {
  const grade = $('#grade');
  if (!grade) return;

  grade.setAttribute('aria-busy', 'true');
  const pecas = await carregarPecas();
  grade.removeAttribute('aria-busy');

  const aco = grade.dataset.aco;
  const modeloFixo = grade.dataset.modelo;
  const lista = pecas.filter((p) => (!aco || p.aco === aco) && (!modeloFixo || p.modelo === modeloFixo));
  grade.innerHTML = lista.map((p) => cartaoPeca(p, { etiqueta: !aco })).join('');
  ligarGalerias(grade);

  /* ---- chips ---- */
  const barra = $('#filtros');
  const estado = { modelo: null, polegadas: null, cabo: null };

  const disponivel = (campo) => new Set(lista.map((p) => String(p[campo])));
  const semFiltro = new Set((grade.dataset.esconderFiltro || '').split(',').filter(Boolean));

  const grupo = (campo, rotulo) => {
    if (semFiltro.has(campo)) return '';
    const opcoes = FILTROS[campo].filter((o) => disponivel(campo).has(o.valor));
    if (opcoes.length < 2) return '';
    return `
      <div class="filtro-grupo" data-campo="${campo}">
        <span>${rotulo}</span>
        <button class="chip" type="button" aria-pressed="true" data-valor="">Todos</button>
        ${opcoes.map((o) => `<button class="chip" type="button" aria-pressed="false" data-valor="${o.valor}">${o.rotulo}</button>`).join('')}
      </div>`;
  };

  barra.innerHTML = `
    <div class="filtros-linha">
      ${grupo('modelo', 'Modelo')}
      ${grupo('polegadas', 'Lâmina')}
      ${grupo('cabo', 'Cabo')}
      <span class="conta" id="conta"></span>
    </div>`;

  const conta = $('#conta');
  const vazio = $('#vazio');

  const aplicar = () => {
    // posições antes (FLIP)
    const cartoes = $$('.peca', grade);
    const antes = new Map(cartoes.map((c) => [c, c.getBoundingClientRect()]));

    let visiveis = 0;
    cartoes.forEach((c) => {
      const passa =
        (!estado.modelo || c.dataset.modelo === estado.modelo) &&
        (!estado.polegadas || c.dataset.polegadas === estado.polegadas) &&
        (!estado.cabo || c.dataset.cabo === estado.cabo);
      c.classList.toggle('oculta', !passa);
      if (passa) visiveis++;
    });

    conta.textContent = `${visiveis} ${visiveis === 1 ? 'peça' : 'peças'}`;
    vazio.hidden = visiveis > 0;

    if (calmo) return;
    // anima a reorganização
    $$('.peca:not(.oculta)', grade).forEach((c) => {
      const antigo = antes.get(c);
      if (!antigo) return;
      const novo = c.getBoundingClientRect();
      const dx = antigo.left - novo.left;
      const dy = antigo.top - novo.top;
      if (!dx && !dy) return;
      c.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
        { duration: 460, easing: 'cubic-bezier(0.16,1,0.3,1)' }
      );
    });
  };

  barra.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const campo = chip.closest('[data-campo]').dataset.campo;
    const valor = chip.dataset.valor || null;
    estado[campo] = valor;
    $$('.chip', chip.parentElement).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    aplicar();
  });

  $('#limpar')?.addEventListener('click', () => {
    Object.keys(estado).forEach((k) => { estado[k] = null; });
    $$('.filtro-grupo', barra).forEach((g) => {
      $$('.chip', g).forEach((c, i) => c.setAttribute('aria-pressed', String(i === 0)));
    });
    aplicar();
  });

  $('#pedir-sob-medida')?.addEventListener('click', () => {
    const partes = [
      estado.modelo && `modelo ${estado.modelo === 'fulltang' ? 'fulltang' : 'língua de ximango'}`,
      estado.polegadas && `lâmina de ${estado.polegadas}"`,
      estado.cabo && `cabo em ${estado.cabo}`,
    ].filter(Boolean);
    const desc = partes.length ? ` com ${partes.join(', ')}` : '';
    abrirWhatsapp(`Olá! Não achei no site a combinação que quero${desc}. Dá para forjar sob encomenda?`);
  });

  aplicar();

  /* link direto pra uma peça (ex.: vindo do pedido no WhatsApp): abre a ficha dela sozinho */
  const idAlvo = location.hash.slice(1);
  if (idAlvo && lista.some((p) => p.id === idAlvo)) abrirFicha(idAlvo);
}

addEventListener('DOMContentLoaded', montar);

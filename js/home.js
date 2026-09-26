/* ==========================================================================
   Corte Nobre · home
   ========================================================================== */
import { CUIDADOS, carregarPecas } from './dados.js';
import { cartaoPeca, ligarGalerias } from './pecas.js';
import { $, $$, calmo } from './util.js';


/* ---------- trilho de peças ---------- */
async function trilho() {
  const trilho = $('#trilho-pecas');
  if (!trilho) return;

  const pecas = await carregarPecas();
  trilho.innerHTML = pecas.map((p) => cartaoPeca(p)).join('');
  ligarGalerias(trilho);

  const barra = $('#barra-trilho');
  const ant = $('[data-trilho-ant]');
  const prox = $('[data-trilho-prox]');

  const passo = () => (trilho.querySelector('.peca')?.offsetWidth || 300) + 20;
  const atualizar = () => {
    const max = trilho.scrollWidth - trilho.clientWidth;
    const p = max > 0 ? trilho.scrollLeft / max : 1;
    barra.style.transform = `scaleX(${Math.max(0.06, (trilho.clientWidth / trilho.scrollWidth) + p * (1 - trilho.clientWidth / trilho.scrollWidth))})`;
    ant.disabled = trilho.scrollLeft < 8;
    prox.disabled = trilho.scrollLeft > max - 8;
  };

  ant.addEventListener('click', () => trilho.scrollBy({ left: -passo(), behavior: calmo ? 'auto' : 'smooth' }));
  prox.addEventListener('click', () => trilho.scrollBy({ left: passo(), behavior: calmo ? 'auto' : 'smooth' }));
  trilho.addEventListener('scroll', atualizar, { passive: true });
  addEventListener('resize', atualizar);
  atualizar();

  /* arrastar com o mouse */
  let baixo = false, x0 = 0, s0 = 0, moveu = 0;
  trilho.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    baixo = true; moveu = 0;
    x0 = e.clientX; s0 = trilho.scrollLeft;
    trilho.classList.add('arrastando');
  });
  addEventListener('pointermove', (e) => {
    if (!baixo) return;
    const d = e.clientX - x0;
    moveu = Math.abs(d);
    trilho.scrollLeft = s0 - d;
  });
  addEventListener('pointerup', () => {
    if (!baixo) return;
    baixo = false;
    trilho.classList.remove('arrastando');
  });
}

/* ---------- comparador de aços ---------- */
function comparador() {
  const caixa = $('#comparador');
  const puxador = $('#puxador');
  if (!caixa || !puxador) return;

  const por = (pct) => {
    const v = Math.min(94, Math.max(6, pct));
    caixa.style.setProperty('--corte', `${v}%`);
    puxador.setAttribute('aria-valuenow', Math.round(v));
    /* só mostra o texto do lado que está dominando a imagem no momento */
    caixa.classList.toggle('mostra-carbono', v >= 50);
    caixa.classList.toggle('mostra-inox', v < 50);
  };
  por(50);

  const dePonteiro = (e) => {
    const r = caixa.getBoundingClientRect();
    por(((e.clientX - r.left) / r.width) * 100);
  };

  let ativo = false;
  puxador.addEventListener('pointerdown', (e) => { ativo = true; puxador.setPointerCapture(e.pointerId); });
  puxador.addEventListener('pointermove', (e) => { if (ativo) dePonteiro(e); });
  puxador.addEventListener('pointerup', () => { ativo = false; });
  caixa.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' && !ativo) dePonteiro(e); });
  caixa.addEventListener('click', dePonteiro);

  puxador.addEventListener('keydown', (e) => {
    const atual = parseFloat(caixa.style.getPropertyValue('--corte')) || 50;
    if (e.key === 'ArrowLeft') { por(atual - 4); e.preventDefault(); }
    if (e.key === 'ArrowRight') { por(atual + 4); e.preventDefault(); }
  });
}

/* ---------- abas de cuidados ---------- */
function abas() {
  const barra = $('[data-abas]');
  const conteudo = $('#abas-conteudo');
  if (!barra || !conteudo) return;

  const chaves = [
    ['geral', 'Toda faca'],
    ['carbono', 'Aço carbono'],
    ['inox', 'Aço inox'],
  ];

  barra.innerHTML = chaves.map(([k, rotulo], i) =>
    `<button class="aba" role="tab" id="aba-${k}" aria-controls="painel-${k}" aria-selected="${i === 0}" type="button" data-aba="${k}">${rotulo}</button>`
  ).join('');

  conteudo.innerHTML = chaves.map(([k], i) => {
    const bloco = CUIDADOS[k];
    return `
      <div class="painel-aba ${i === 0 ? 'ativo' : ''}" id="painel-${k}" role="tabpanel" aria-labelledby="aba-${k}" ${i === 0 ? '' : 'hidden'}>
        <p class="kicker sem-fio" style="margin-bottom:20px">${bloco.titulo}</p>
        <dl class="cuidado-lista">
          ${bloco.itens.map((it) => `
            <div class="cuidado-item">
              <dt>${it.rotulo}</dt>
              <dd>${it.texto}</dd>
            </div>`).join('')}
        </dl>
      </div>`;
  }).join('');

  barra.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-aba]');
    if (!botao) return;
    const k = botao.dataset.aba;
    $$('.aba', barra).forEach((b) => b.setAttribute('aria-selected', String(b === botao)));
    $$('.painel-aba', conteudo).forEach((p) => {
      const ativo = p.id === `painel-${k}`;
      p.classList.toggle('ativo', ativo);
      p.hidden = !ativo;
    });
  });
}

/* ---------- parallax ---------- */
function parallax() {
  if (calmo) return;
  const heroFoto = $('[data-parallax-hero] img');
  const foto = $('[data-parallax-foto] img');
  const titulo = $('[data-hero-titulo]');
  if (!heroFoto && !foto) return;

  let pedido = false;
  const pinta = () => {
    const y = scrollY;
    if (heroFoto && y < innerHeight * 1.3) {
      heroFoto.style.transform = `translateY(${y * -0.09}px) scale(${1 + y * 0.00006})`;
    }
    if (titulo && y < innerHeight) {
      titulo.style.transform = `translateY(${y * 0.1}px)`;
    }
    if (foto) {
      const r = foto.parentElement.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        foto.style.transform = `translateY(${p * -42}px)`;
      }
    }
    pedido = false;
  };
  addEventListener('scroll', () => {
    if (!pedido) { pedido = true; requestAnimationFrame(pinta); }
  }, { passive: true });
  pinta();
}

/* ---------- etapa ativa ---------- */
function etapas() {
  const itens = $$('#etapas .etapa');
  if (!itens.length || calmo) return;
  const olho = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => e.target.classList.toggle('ativa', e.isIntersecting));
  }, { rootMargin: '-45% 0px -45% 0px' });
  itens.forEach((i) => olho.observe(i));
}

addEventListener('DOMContentLoaded', () => {
  comparador(); abas(); parallax(); etapas();
  trilho();
});

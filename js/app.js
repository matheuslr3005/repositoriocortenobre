/* ==========================================================================
   Corte Nobre · comportamento comum a todas as páginas
   ========================================================================== */
import { CONTATO, acharPeca, precoFmt, carregarPecas } from './dados.js';
import { $, $$, calmo, avisar, abrirWhatsapp } from './util.js';
import { sacola, vendaAberta } from './sacola.js';

export { avisar, abrirWhatsapp, sacola, $, $$, calmo };

/* ---------- fio de progresso ---------- */
function progresso() {
  const barra = $('.progresso');
  if (!barra) return;
  let pedido = false;
  const pinta = () => {
    const alcance = document.documentElement.scrollHeight - innerHeight;
    barra.style.transform = `scaleX(${alcance > 0 ? scrollY / alcance : 0})`;
    pedido = false;
  };
  addEventListener('scroll', () => {
    if (!pedido) { pedido = true; requestAnimationFrame(pinta); }
  }, { passive: true });
  pinta();
}

/* ---------- cabeçalho que some ao descer ---------- */
function cabecalho() {
  const el = $('.cabecalho');
  if (!el) return;
  let anterior = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    el.classList.toggle('preso', y > 24);
    el.classList.toggle('solto', y <= 24);
    if (!document.body.classList.contains('menu-aberto')) {
      el.classList.toggle('escondido', y > anterior && y > 320);
    }
    anterior = y;
  }, { passive: true });
}

/* ---------- menu de tela cheia ---------- */
function menu() {
  const botao = $('.btn-menu');
  const painel = $('.menu');
  if (!botao || !painel) return;
  const alterna = (abrir) => {
    document.body.classList.toggle('menu-aberto', abrir);
    document.body.classList.toggle('trava', abrir);
    botao.setAttribute('aria-expanded', String(abrir));
    painel.setAttribute('aria-hidden', String(!abrir));
  };
  botao.addEventListener('click', () => alterna(!document.body.classList.contains('menu-aberto')));
  $$('a', painel).forEach((a) => a.addEventListener('click', () => alterna(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') alterna(false); });
}

/* ---------- reveals ---------- */
export function reveals(raiz = document) {
  const alvos = $$('[data-reveal]', raiz).filter((el) => !el.dataset.revelado);
  if (!alvos.length) return;
  alvos.forEach((el) => { el.dataset.revelado = '1'; });
  if (calmo) { alvos.forEach((el) => el.classList.add('dentro')); return; }

  $$('[data-escala]', raiz).forEach((grupo) => {
    $$('[data-reveal]', grupo).forEach((filho, i) => {
      filho.style.setProperty('--atraso', `${i * (+grupo.dataset.escala || 70)}ms`);
    });
  });

  const olho = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('dentro'); olho.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  alvos.forEach((el) => olho.observe(el));
}

/* ---------- cursor de fio ---------- */
function cursor() {
  if (calmo || matchMedia('(hover: none)').matches) return;
  const ponto = document.createElement('div');
  ponto.className = 'fio-cursor';
  document.body.appendChild(ponto);
  let x = innerWidth / 2, y = innerHeight / 2, px = x, py = y;
  addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    ponto.classList.add('visivel');
    ponto.classList.toggle('ativo', !!e.target.closest('a, button, [data-imanta], input, select, textarea'));
  }, { passive: true });
  addEventListener('mouseleave', () => ponto.classList.remove('visivel'));
  const anda = () => {
    px += (x - px) * 0.18;
    py += (y - py) * 0.18;
    ponto.style.transform = `translate(${px}px, ${py}px)`;
    requestAnimationFrame(anda);
  };
  anda();
}

/* ---------- botões imantados ---------- */
export function imanta(raiz = document) {
  if (calmo || matchMedia('(hover: none)').matches) return;
  $$('[data-imanta]', raiz).forEach((el) => {
    if (el.dataset.imantado) return;
    el.dataset.imantado = '1';
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${dx * 9}px, ${dy * 9}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ---------- painéis ---------- */
let painelAberto = null;
export function abrirPainel(el) {
  fecharPainel();
  painelAberto = el;
  $('.veu')?.classList.add('aberto');
  el.classList.add('aberto');
  el.setAttribute('aria-hidden', 'false');
  document.body.classList.add('trava');
  $('.fechar', el)?.focus();
}
export function fecharPainel() {
  $('.veu')?.classList.remove('aberto');
  $$('.painel').forEach((p) => { p.classList.remove('aberto'); p.setAttribute('aria-hidden', 'true'); });
  document.body.classList.remove('trava');
  painelAberto = null;
}

/* ---------- desenho da sacola ---------- */
function pintarSacola() {
  const corpo = $('#sacola-corpo');
  const pe = $('#sacola-pe');
  if (!corpo) return;

  if (!sacola.pronta) {
    corpo.innerHTML = '<p class="legenda" style="text-align:center;padding-block:48px">Conferindo a sacola...</p>';
    if (pe) pe.hidden = true;
    return;
  }

  if (!sacola.itens.length) {
    corpo.innerHTML = `
      <div class="sacola-vazia">
        <p class="corpo" style="margin-inline:auto">Nenhuma peça na sacola ainda.</p>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:24px;flex-wrap:wrap">
          <a class="btn btn-secundario btn-sm" href="faca-de-inox.html">Ver aço inox</a>
          <a class="btn btn-secundario btn-sm" href="faca-de-carbono.html">Ver aço carbono</a>
        </div>
      </div>`;
    if (pe) pe.hidden = true;
    return;
  }

  if (pe) pe.hidden = false;
  corpo.innerHTML = sacola.itens.map((i) => `
    <article class="sacola-item" data-id="${i.id}">
      <div class="foto">${i.foto ? `<img src="${i.foto}" alt="" loading="lazy" width="74" height="99">` : ''}</div>
      <div>
        <h3 class="nome">${i.nome}</h3>
        <p class="legenda" style="margin-bottom:12px">${i.detalhe || ''}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div class="qtd">
            <button type="button" data-menos aria-label="Tirar uma unidade">–</button>
            <span>${i.qtd}</span>
            <button type="button" data-mais aria-label="Somar uma unidade">+</button>
          </div>
          <span style="font-size:15px;font-variant-numeric:tabular-nums">${precoFmt(i.preco)}</span>
        </div>
        <button type="button" class="btn-ghost" data-tira style="font-size:13px;margin-top:8px">Retirar</button>
      </div>
    </article>`).join('');

  const total = $('#sacola-total');
  if (total) total.textContent = precoFmt(sacola.total);

  const nota = $('#sacola-nota');
  if (nota) {
    nota.textContent = sacola.modo === 'shopify'
      ? 'Frete e formas de pagamento aparecem no checkout seguro do Shopify.'
      : sacola.temSobConsulta
        ? 'Peças sob consulta entram no orçamento pelo WhatsApp. Frete combinado na conversa.'
        : 'Frete combinado na conversa. O pagamento é acertado direto com a oficina.';
  }

  const botao = $('#fechar-pedido');
  if (botao) botao.textContent = sacola.rotuloFinalizar;

  const rodape = $('#sacola-rodape');
  if (rodape) {
    rodape.textContent = sacola.modo === 'shopify'
      ? 'Você termina a compra no ambiente seguro do Shopify, com os meios de pagamento da loja.'
      : 'A conversa abre com a lista pronta. O pagamento e o frete são combinados direto com a oficina.';
  }
}

function ligarSacola() {
  const painel = $('#painel-sacola');
  const corpo = $('#sacola-corpo');

  if (painel) {
    $$('.btn-sacola').forEach((b) => b.addEventListener('click', (e) => {
      e.preventDefault();
      pintarSacola();
      abrirPainel(painel);
    }));
  }
  if (!corpo) return;

  corpo.addEventListener('click', (e) => {
    const artigo = e.target.closest('.sacola-item');
    if (!artigo) return;
    const id = artigo.dataset.id;
    if (e.target.closest('[data-mais]')) sacola.mudarQtd(id, 1);
    if (e.target.closest('[data-menos]')) sacola.mudarQtd(id, -1);
    if (e.target.closest('[data-tira]')) sacola.remover(id);
  });

  $('#fechar-pedido')?.addEventListener('click', () => sacola.finalizar());
  document.addEventListener('sacola:muda', pintarSacola);
  pintarSacola();
}

/* ---------- ficha da peça ---------- */
export function abrirFicha(id) {
  const p = acharPeca(id);
  const painel = $('#painel-ficha');
  if (!p || !painel) return;

  const aberta = vendaAberta(p);
  const esgotada = sacola.modo === 'shopify' && p.variantId && !p.disponivel;

  $('#ficha-conteudo').innerHTML = `
    <p class="kicker" style="margin-bottom:14px">${p.aco === 'inox' ? 'Aço inox' : 'Aço carbono'}</p>
    <h2 class="titulo-secao" style="font-size:clamp(26px,3.4vw,38px);margin-bottom:10px">${p.nome}</h2>
    ${p.detalhe ? `<p class="corpo" style="margin-bottom:24px">${p.detalhe}</p>` : ''}
    <div class="ficha-galeria">
      ${p.fotos.map((f, i) => `<img src="${f}" alt="${p.nome}" class="${i === 0 ? 'ativa' : ''}" loading="lazy">`).join('')}
    </div>
    ${p.fotos.length > 1 ? `<div class="ficha-miniaturas">${p.fotos.map((f, i) => `
      <button type="button" aria-pressed="${i === 0}" aria-label="Foto ${i + 1}"><img src="${f}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
    <dl class="specs">
      <div><dt>Aço</dt><dd>${p.aco === 'inox' ? 'Inox de alta liga · 58 a 60 HRC' : 'Carbono forjado · 61 HRC'}</dd></div>
      ${p.lamina ? `<div><dt>Lâmina</dt><dd>${p.lamina}</dd></div>` : ''}
      <div><dt>Modelo</dt><dd>${p.modelo === 'fulltang' ? 'Fulltang' : 'Língua de ximango'}</dd></div>
      <div><dt>Cabo</dt><dd>${p.caboRotulo}</dd></div>
      <div><dt>Afiação</dt><dd>${p.aco === 'inox' ? '15° a 20° por lado' : '12° por lado'}</dd></div>
      ${esgotada ? '<div><dt>Estoque</dt><dd>Esgotada no momento</dd></div>' : ''}
    </dl>`;

  $('#ficha-preco').textContent = precoFmt(p.preco);
  const botao = $('#ficha-add');
  botao.dataset.id = p.id;
  botao.textContent = esgotada ? 'Avisar quando voltar' : aberta ? 'Colocar na sacola' : 'Pedir orçamento';

  const galeria = $('.ficha-galeria', painel);
  const minis = $$('.ficha-miniaturas button', painel);
  minis.forEach((b, i) => b.addEventListener('click', () => {
    $$('img', galeria).forEach((img, j) => img.classList.toggle('ativa', i === j));
    minis.forEach((m, j) => m.setAttribute('aria-pressed', String(i === j)));
  }));

  abrirPainel(painel);
}

function ligarFicha() {
  $('#ficha-add')?.addEventListener('click', (e) => {
    const p = acharPeca(e.currentTarget.dataset.id);
    if (!p) return;
    if (vendaAberta(p)) { sacola.add(p.id); fecharPainel(); }
    else pedirOrcamento(p);
  });
}

function pedirOrcamento(p) {
  const esgotada = sacola.modo === 'shopify' && p.variantId && !p.disponivel;
  const texto = esgotada
    ? `Olá! A ${p.nome} está esgotada no site. Me avisa quando sair uma nova da bancada?`
    : `Olá! Quero um orçamento da ${p.nome}${p.lamina ? ` (${p.lamina}` : ''}${p.caboRotulo ? `, cabo em ${p.caboRotulo.toLowerCase()})` : p.lamina ? ')' : ''}.`;
  abrirWhatsapp(texto);
}

/* ---------- ligações gerais ---------- */
function ligarGlobais() {
  $('.veu')?.addEventListener('click', fecharPainel);
  $$('.painel .fechar').forEach((b) => b.addEventListener('click', fecharPainel));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && painelAberto) fecharPainel(); });

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      e.preventDefault();
      const p = acharPeca(add.dataset.add);
      if (!p) return;
      if (vendaAberta(p)) sacola.add(p.id);
      else pedirOrcamento(p);
    }
    const ficha = e.target.closest('[data-ficha]');
    if (ficha) { e.preventDefault(); abrirFicha(ficha.dataset.ficha); }
    const zap = e.target.closest('[data-whatsapp]');
    if (zap) { e.preventDefault(); abrirWhatsapp(zap.dataset.whatsapp || 'Olá! Vim pelo site da Corte Nobre.'); }
  });

  $$('[data-contato]').forEach((el) => {
    const campo = el.dataset.contato;
    if (campo === 'whatsapp-link') el.href = CONTATO.linkWhatsapp;
    else if (campo === 'whatsapp') el.textContent = CONTATO.whatsappVisivel;
    else if (campo === 'email') { el.textContent = CONTATO.email; if (el.tagName === 'A') el.href = `mailto:${CONTATO.email}`; }
    else if (campo === 'instagram') { el.textContent = CONTATO.instagramVisivel; el.href = CONTATO.instagram; }
    else if (campo === 'horario') el.textContent = CONTATO.horario;
  });

  $$('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });
}

/* ---------- atalho de WhatsApp ---------- */
function zap() {
  const botao = $('.zap');
  if (!botao) return;
  const mostra = () => botao.classList.toggle('visivel', scrollY > innerHeight * 0.75);
  addEventListener('scroll', mostra, { passive: true });
  mostra();
}

/* ---------- transição entre páginas ---------- */
function transicao() {
  if (calmo || !$('.cortina')) return;
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    const interno = url.origin === location.origin && !link.target && !link.hasAttribute('download');
    const mesmaPagina = url.pathname === location.pathname && url.hash;
    if (!interno || mesmaPagina || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    document.body.classList.add('saindo');
    setTimeout(() => { location.href = url.href; }, 330);
  });
  addEventListener('pageshow', (e) => { if (e.persisted) document.body.classList.remove('saindo'); });
}

/* ---------- início ---------- */
addEventListener('DOMContentLoaded', async () => {
  progresso(); cabecalho(); menu(); reveals(); cursor(); imanta();
  ligarGlobais(); ligarSacola(); ligarFicha(); transicao(); zap();
  document.body.classList.add('pronto');

  await carregarPecas();      // deixa o catálogo em memória antes de ler a sacola
  await sacola.iniciar();
});

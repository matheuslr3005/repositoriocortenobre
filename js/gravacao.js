/* ==========================================================================
   Corte Nobre · simulador de gravação na lâmina
   ========================================================================== */
import { $, $$, abrirWhatsapp } from './util.js';

function simulador() {
  const marca = $('#gravacao');
  const logo = $('#gravacao-logo');
  const campo = $('#grav-texto');
  const arquivoLogo = $('#grav-logo');
  const removerLogo = $('#grav-logo-remover');
  const palco = $('#palco');
  if (!marca || !campo || !palco) return;

  const estado = { tam: 32, pos: 42, altura: 38, modoLogo: false };

  const ajusta = () => {
    marca.style.left = `${estado.pos}%`;
    marca.style.top = `${estado.altura}%`;
    if (logo) { logo.style.left = `${estado.pos}%`; logo.style.top = `${estado.altura}%`; }

    if (estado.modoLogo) return;

    marca.textContent = campo.value.trim() || 'Sua marca';
    // a gravação nunca passa da área útil da lâmina
    const limite = palco.clientWidth * 0.46;
    const base = (estado.tam / 100) * palco.clientWidth * 0.14;
    marca.style.fontSize = `${base}px`;
    const largura = marca.scrollWidth;
    if (largura > limite) marca.style.fontSize = `${base * (limite / largura)}px`;
  };

  const usarLogo = (usar) => {
    estado.modoLogo = usar;
    marca.hidden = usar;
    if (logo) logo.hidden = !usar;
    if (removerLogo) removerLogo.hidden = !usar;
    campo.disabled = usar;
    ajusta();
  };

  campo.addEventListener('input', ajusta);
  campo.addEventListener('focus', () => campo.select());
  addEventListener('resize', ajusta);

  $('#grav-tam').addEventListener('input', (e) => {
    estado.tam = +e.target.value;
    if (logo) logo.style.height = `${(estado.tam / 100) * palco.clientWidth * 0.16}px`;
    ajusta();
  });
  $('#grav-pos').addEventListener('input', (e) => { estado.pos = +e.target.value; ajusta(); });
  $('#grav-altura')?.addEventListener('input', (e) => { estado.altura = +e.target.value; ajusta(); });

  $$('[data-acabamento]').forEach((b) => b.addEventListener('click', () => {
    $$('[data-acabamento]').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    const escura = b.dataset.acabamento === 'marcada';
    marca.classList.toggle('marcada', escura);
    logo?.classList.toggle('marcada', escura);
  }));

  arquivoLogo?.addEventListener('change', () => {
    const arquivo = arquivoLogo.files?.[0];
    if (!arquivo || !logo) return;
    const leitor = new FileReader();
    leitor.onload = () => {
      logo.src = leitor.result;
      logo.style.height = `${(estado.tam / 100) * palco.clientWidth * 0.16}px`;
      usarLogo(true);
    };
    leitor.readAsDataURL(arquivo);
  });

  removerLogo?.addEventListener('click', () => {
    usarLogo(false);
    if (arquivoLogo) arquivoLogo.value = '';
  });

  $('#grav-enviar').addEventListener('click', () => {
    const nome = campo.value.trim() || 'a minha marca';
    const comLogo = estado.modoLogo ? ' Já subi a logo da empresa pra simulação.' : '';
    abrirWhatsapp(`Olá! Quero um orçamento de facas gravadas para ${nome}. Simulei a gravação no site da Corte Nobre.${comLogo}`);
  });

  // desenha a primeira vez, já com a imagem carregada
  ajusta();
  palco.querySelector('img')?.addEventListener('load', ajusta);
}

/* ---------- formulário de orçamento ---------- */
function formulario() {
  const form = $('#form-orcamento');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valido = true;
    $$('[required]', form).forEach((campo) => {
      const erro = !campo.value.trim();
      campo.closest('.campo').classList.toggle('erro', erro);
      if (erro) valido = false;
    });
    if (!valido) {
      $('.campo.erro input', form)?.focus();
      return;
    }
    const d = new FormData(form);
    const texto = [
      'Olá! Quero um orçamento de facas gravadas na Corte Nobre.',
      '',
      `Empresa: ${d.get('empresa')}`,
      `Contato: ${d.get('nome')}`,
      `Quantidade: ${d.get('quantidade')}`,
      d.get('detalhes') ? `Detalhes: ${d.get('detalhes')}` : '',
    ].filter(Boolean).join('\n');
    abrirWhatsapp(texto);
  });

  form.addEventListener('input', (e) => {
    if (e.target.value.trim()) e.target.closest('.campo')?.classList.remove('erro');
  });
}

addEventListener('DOMContentLoaded', () => { simulador(); formulario(); });

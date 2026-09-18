/* Utilidades usadas por todos os módulos. */
import { CONTATO } from './dados.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* aviso flutuante no rodapé da tela */
export function avisar(texto, tom = 'normal') {
  let caixa = $('.avisos');
  if (!caixa) {
    caixa = document.createElement('div');
    caixa.className = 'avisos';
    caixa.setAttribute('role', 'status');
    caixa.setAttribute('aria-live', 'polite');
    document.body.appendChild(caixa);
  }
  const aviso = document.createElement('div');
  aviso.className = tom === 'erro' ? 'aviso aviso-erro' : 'aviso';
  aviso.textContent = texto;
  caixa.appendChild(aviso);
  setTimeout(() => {
    aviso.classList.add('saindo');
    aviso.addEventListener('animationend', () => aviso.remove(), { once: true });
  }, tom === 'erro' ? 5200 : 3200);
}

export function abrirWhatsapp(texto) {
  const url = `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener');
}

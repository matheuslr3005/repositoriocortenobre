/* Formulário de contato: monta a mensagem e abre o WhatsApp da oficina. */
import { $, $$, abrirWhatsapp } from './util.js';

addEventListener('DOMContentLoaded', () => {
  const form = $('#form-contato');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valido = true;
    $$('[required]', form).forEach((campo) => {
      const erro = !campo.value.trim();
      campo.closest('.campo').classList.toggle('erro', erro);
      if (erro) valido = false;
    });
    if (!valido) { $('.campo.erro input, .campo.erro textarea', form)?.focus(); return; }

    const d = new FormData(form);
    const texto = [
      `Olá! Sou ${d.get('nome')} e vim pelo site da Corte Nobre.`,
      '',
      `Assunto: ${d.get('assunto')}`,
      d.get('telefone') ? `Telefone: ${d.get('telefone')}` : '',
      '',
      d.get('mensagem'),
    ].filter((l) => l !== '' || true).join('\n');
    abrirWhatsapp(texto);
  });

  form.addEventListener('input', (e) => {
    if (e.target.value.trim()) e.target.closest('.campo')?.classList.remove('erro');
  });
});

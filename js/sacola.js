/* ==========================================================================
   Corte Nobre · sacola
   Dois modos, mesma interface para o resto do site:
   · shopify  carrinho de verdade, estoque e checkout do Shopify
   · local    lista guardada no navegador que fecha o pedido no WhatsApp
   O modo é escolhido no arranque, conforme js/dados.js tenha ou não a loja.
   ========================================================================== */
import { acharPeca, precoFmt, pecasCarregadas, lojaEmPe, especFmt } from './dados.js';
import { avisar, abrirWhatsapp, $, $$ } from './util.js';
import * as loja from './shopify.js';

const CHAVE = 'cn.sacola.v1';
const avisa = () => document.dispatchEvent(new CustomEvent('sacola:muda'));

export const sacola = {
  modo: 'local',
  itens: [],          // { id, nome, preco, foto, qtd, lineId? }
  checkoutUrl: null,
  ocupada: false,
  pronta: false,

  /* ---------- arranque ---------- */
  async iniciar() {
    this.modo = loja.ativo() && lojaEmPe() ? 'shopify' : 'local';
    if (this.modo === 'local') {
      this.lerDoNavegador();
      this.pronta = true;
      this.pintarContador();
      return;
    }
    try {
      const carrinho = await loja.carrinhoAtual();
      this.absorver(carrinho);
    } catch (erro) {
      console.warn('Não deu para ler o carrinho do Shopify.', erro);
      this.itens = [];
    }
    this.pronta = true;
    this.pintarContador();
    avisa();
  },

  absorver(carrinho) {
    this.checkoutUrl = carrinho?.checkoutUrl || null;
    this.itens = (carrinho?.linhas || []).map((l) => {
      const peca = acharPeca(l.id);
      return {
        id: l.id,
        lineId: l.lineId,
        nome: l.nome,
        preco: l.preco,
        qtd: l.qtd,
        foto: peca?.fotos?.[0] || l.foto,
        detalhe: peca ? especFmt(peca) : l.variante,
      };
    });
    this.pintarContador();
  },

  /* ---------- modo local ---------- */
  lerDoNavegador() {
    let cru = [];
    try { cru = JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { cru = []; }
    this.itens = cru
      .filter((i) => acharPeca(i.id))
      .map((i) => {
        const p = acharPeca(i.id);
        return { id: p.id, nome: p.nome, preco: p.preco, qtd: i.qtd, foto: p.fotos[0], detalhe: especFmt(p) };
      });
  },

  gravarNoNavegador() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(this.itens.map((i) => ({ id: i.id, qtd: i.qtd }))));
    } catch { /* navegação privada */ }
  },

  /* ---------- operações ---------- */
  async add(id) {
    const peca = acharPeca(id);
    if (!peca) return;

    if (this.modo === 'local') {
      const existente = this.itens.find((i) => i.id === id);
      if (existente) existente.qtd += 1;
      else this.itens.push({ id, nome: peca.nome, preco: peca.preco, qtd: 1, foto: peca.fotos[0], detalhe: especFmt(peca) });
      this.gravarNoNavegador();
      this.depois(`${peca.nome} foi para a sacola.`);
      return;
    }

    if (!peca.variantId) {
      avisar('Essa peça não está com venda aberta. Fale com a oficina.', 'erro');
      return;
    }
    await this.comLoja(() => loja.adicionar(peca.variantId, 1), `${peca.nome} foi para a sacola.`);
  },

  async mudarQtd(id, delta) {
    const item = this.itens.find((i) => i.id === id);
    if (!item) return;
    const nova = item.qtd + delta;

    if (this.modo === 'local') {
      if (nova < 1) return this.remover(id);
      item.qtd = nova;
      this.gravarNoNavegador();
      this.depois();
      return;
    }
    if (nova < 1) return this.remover(id);
    await this.comLoja(() => loja.atualizar(item.lineId, nova));
  },

  async remover(id) {
    const item = this.itens.find((i) => i.id === id);
    if (!item) return;

    if (this.modo === 'local') {
      this.itens = this.itens.filter((i) => i.id !== id);
      this.gravarNoNavegador();
      this.depois();
      return;
    }
    await this.comLoja(() => loja.remover(item.lineId));
  },

  /* chama o Shopify e cuida de estado, erro e aviso */
  async comLoja(acao, mensagem) {
    if (this.ocupada) return;
    this.ocupada = true;
    document.body.classList.add('sacola-ocupada');
    try {
      const carrinho = await acao();
      this.absorver(carrinho);
      if (mensagem) avisar(mensagem);
      this.pulsar();
      avisa();
    } catch (erro) {
      console.error(erro);
      avisar('O carrinho não respondeu agora. Tente de novo em instantes.', 'erro');
    } finally {
      this.ocupada = false;
      document.body.classList.remove('sacola-ocupada');
    }
  },

  depois(mensagem) {
    this.pintarContador();
    if (mensagem) { avisar(mensagem); this.pulsar(); }
    avisa();
  },

  /* ---------- fechamento ---------- */
  async finalizar() {
    if (!this.itens.length) return;
    if (this.modo === 'shopify' && this.checkoutUrl) {
      location.href = this.checkoutUrl;
      return;
    }
    abrirWhatsapp(this.mensagemWhatsapp());
  },

  get rotuloFinalizar() {
    return this.modo === 'shopify' ? 'Finalizar compra' : 'Fechar pedido no WhatsApp';
  },

  get contagem() { return this.itens.reduce((s, i) => s + i.qtd, 0); },
  get total() { return this.itens.reduce((s, i) => s + (i.preco ? i.preco * i.qtd : 0), 0); },
  get temSobConsulta() { return this.itens.some((i) => i.preco == null); },

  mensagemWhatsapp() {
    const linhas = this.itens.map((i) => `• ${i.qtd}x ${i.nome} (${precoFmt(i.preco)})`);
    const total = this.total ? `\nTotal das peças com preço: ${precoFmt(this.total)}` : '';
    const obs = this.temSobConsulta ? '\nTem peça sob consulta na lista.' : '';
    return `Olá! Quero fechar este pedido na Corte Nobre:\n\n${linhas.join('\n')}${total}${obs}`;
  },

  /* ---------- cabeçalho ---------- */
  pintarContador() {
    $$('.btn-sacola').forEach((b) => {
      const n = this.contagem;
      b.dataset.cheia = n > 0 ? '1' : '0';
      const c = $('.contador', b);
      if (c) c.textContent = n;
      b.setAttribute('aria-label', n ? `Sacola com ${n} ${n === 1 ? 'peça' : 'peças'}` : 'Sacola vazia');
    });
  },

  pulsar() {
    const botao = $('.btn-sacola');
    if (!botao) return;
    botao.classList.remove('pulsa');
    void botao.offsetWidth;
    botao.classList.add('pulsa');
  },
};

/* deixa o resto do catálogo saber se a venda está aberta de verdade */
export const vendaAberta = (peca) =>
  sacola.modo === 'shopify' ? Boolean(peca.variantId && peca.disponivel) : Boolean(peca.preco);

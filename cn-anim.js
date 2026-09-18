(function () {
  if (window.__cnAnim) return;
  window.__cnAnim = true;

  var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = null;
  var vistos = [];
  var pronto = false;
  var inicio = Date.now();

  function revelar(el, atraso) {
    if (atraso) {
      el.style.transitionDelay = atraso + "ms";
      setTimeout(function () { el.style.transitionDelay = ""; }, atraso + 900);
    }
    el.setAttribute("data-in", "1");
  }

  function revelarTudo() {
    pronto = true;
    var root = document.querySelector("[data-cn-root]");
    if (root) root.removeAttribute("data-scroll-anim");
    Array.prototype.forEach.call(document.querySelectorAll("[data-r]"), function (el) {
      el.setAttribute("data-in", "1");
    });
    if (io) { io.disconnect(); io = null; }
  }

  function ligar() {
    var root = document.querySelector("[data-cn-root]");
    if (!root || pronto) return;
    if (reduz) { revelarTudo(); return; }
    if (document.visibilityState === "hidden" || !("IntersectionObserver" in window)) {
      revelarTudo();
      return;
    }
    root.setAttribute("data-scroll-anim", "1");
    if (!io) {
      io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) { revelar(e.target, 0); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });
    }
    var primeiraPassada = Date.now() - inicio < 1200;
    var acima = 0;
    Array.prototype.forEach.call(document.querySelectorAll("[data-r]"), function (el) {
      if (vistos.indexOf(el) !== -1) return;
      vistos.push(el);
      if (el.getBoundingClientRect().top < window.innerHeight) {
        revelar(el, primeiraPassada ? 120 + acima * 110 : 0);
        acima++;
      } else {
        io.observe(el);
      }
    });
  }

  var t = setInterval(ligar, 220);
  setTimeout(function () { clearInterval(t); revelarTudo(); }, 4000);
  if (document.readyState !== "loading") ligar();
  document.addEventListener("DOMContentLoaded", ligar);
  window.addEventListener("load", ligar);
  window.addEventListener("beforeprint", revelarTudo);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") revelarTudo();
  });
})();

import "./nyancat.css";
import $ from "jquery";

const NyanCat = {
  name: "NyanCat",

  startTrigger: "nyan",

  stopTrigger: "esc",

  start() {
    // Config
    window.nyancat = window.nyancat || {};
    window.nyancat.active = true;
    $("body").append(`
      <div id="nyancat-wrapper">
        <div class="nyan"></div>
      </div>
    `);
    window.nyancat.markup = document.getElementById("nyancat-wrapper");

    let px = 0;
    let py = 0;
    let an = false;
    let posX = 100;
    let posY = 100;
    let rainbow = null;
    const nyan = $(".nyan");
    const pilha = [];
    const altura = 800;
    const largura = parseInt($("body").width(), 10);
    const tamanhoTela = parseInt(largura / 9, 10);

    const getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    window.nyancat.mouseMove = function(e) {
      posX = e.pageX;
      posY = e.pageY;
    };

    $(document).on("mousemove", window.nyancat.mouseMove);

    for (let i = 0; i < tamanhoTela; i++) {
      const rain = $('<div class="rainbow"></div>').css("left", `${i * 9}px`);
      $("#nyancat-wrapper").append(rain);
    }
    rainbow = $(".rainbow");

    const criarEstrela = function() {
      const rand = getRandomInt(3, 14);
      const tempoDeVida = getRandomInt(5, 10);
      const star = $('<div class="star"></div>').css({
        width: `${rand}px`,
        height: `${rand}px`,
        left: `${largura - 10}px`,
        top: Math.floor(Math.random() * altura + 1),
        transition: `all ${tempoDeVida}s linear`,
        transform: "translate(0px, 0px)"
      });
      $("#nyancat-wrapper").append(star);

      window.setTimeout(() => {
        star.css("transform", `translate(-${largura}px, 0px)`);
      }, getRandomInt(5, 10) * 10);

      window.setTimeout(() => {
        star.remove();
      }, tempoDeVida * 1000);
    };

    const moveNyan = function() {
      const tamX = nyan.width() / 2;
      const tamY = nyan.height() / 2;
      px += (posX - px - tamX) / 50;
      py += (posY - py - tamY) / 50;
      nyan.css({
        left: `${px}px`,
        top: `${py}px`
      });
    };

    const peidaArcoIris = function() {
      const qnt = Math.floor(nyan.position().left / 9) + 2;
      if (pilha.length >= qnt) {
        pilha.pop();
      }
      pilha.unshift(py);
      rainbow.hide();
      for (let i = 0; i < qnt; i++) {
        let am = i % 2;
        if (an) {
          am = i % 2 ? 0 : 1;
        }
        rainbow
          .eq(qnt - i)
          .css("top", pilha[i] + am)
          .show();
      }
    };

    window.nyancat.interval1 = window.setInterval(() => {
      moveNyan();
      peidaArcoIris();
    }, 10);

    window.nyancat.interval2 = window.setInterval(() => {
      criarEstrela();
    }, 300);

    window.nyancat.interval3 = window.setInterval(() => {
      an = !an;
    }, 500);

    let frame = 0;
    window.nyancat.interval4 = window.setInterval(() => {
      nyan.css("background-position", `${34 * frame}px`);
      frame++;
    }, 100);
  },

  stop() {
    window.nyancat = window.nyancat || {};
    window.nyancat.active = false;
    $(document).off("mousemove", window.nyancat.mouseMove);
    window.clearInterval(window.nyancat.interval1);
    window.clearInterval(window.nyancat.interval2);
    window.clearInterval(window.nyancat.interval3);
    window.clearInterval(window.nyancat.interval4);
    if (window.nyancat.markup && window.nyancat.markup.parentNode) {
      window.nyancat.markup.parentNode.removeChild(window.nyancat.markup);
    }
  }
};

export default NyanCat;

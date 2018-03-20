import './style.css';

const NyanCat = {
  name: 'NyanCat',

  startTrigger: 'nyan',

  stopTrigger: 'esc',

  start() {
    // Config
    window.nyancat = window.nyancat || {};
    window.nyancat.active = true;
    const wrapperId = `nyancat-wrapper-${new Date().getTime()}`;
    window.nyancat.nyanClass = 'nyan';
    window.nyancat.rainbowClass = 'rainbow';

    const markup = document.createElement('div');
    markup.id = wrapperId;
    markup.innerHTML = `<div class="${window.nyancat.nyanClass}"></div>`;
    document.body.appendChild(markup);
    window.nyancat.markup = document.getElementById(wrapperId);

    let px = 0;
    let py = 0;
    let an = false;
    let posX = 100;
    let posY = 100;
    let rainbow = null;
    const nyan = document.querySelectorAll(`.${window.nyancat.nyanClass}`);
    const pilha = [];
    const altura = 800;
    const largura = parseInt(document.body.getBoundingClientRect().width, 10);
    const tamanhoTela = parseInt(largura / 9, 10);

    const getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    window.nyancat.mouseMove = function(e) {
      posX = e.pageX;
      posY = e.pageY;
    };

    document.addEventListener('mousemove', window.nyancat.mouseMove);

    for (let i = 0; i < tamanhoTela; i++) {
      const rain = document.createElement('div');
      rain.classList.add(window.nyancat.rainbowClass);
      rain.style.left = `${i * 9}px`;
      document.getElementById(wrapperId).appendChild(rain);
    }
    rainbow = document.querySelectorAll(`.${window.nyancat.rainbowClass}`);

    const criarEstrela = function() {
      const rand = getRandomInt(3, 14);
      const tempoDeVida = getRandomInt(5, 10);
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.width = `${rand}px`;
      star.style.height = `${rand}px`;
      star.style.left = `${largura - 10}px`;
      star.style.top = `${Math.floor(Math.random() * altura + 1)}px`;
      star.style.transition = `all ${tempoDeVida}s linear`;
      star.style.transform = 'translate(0px, 0px)';
      document.getElementById(wrapperId).appendChild(star);
      window.setTimeout(() => (star.style.transform = `translate(-${largura}px, 0px)`), getRandomInt(5, 10) * 10);
      window.setTimeout(
        () => document.getElementById(wrapperId) && document.getElementById(wrapperId).removeChild(star),
        tempoDeVida * 1000
      );
    };

    const moveNyan = function() {
      const tamX = nyan[0].getBoundingClientRect().width / 2;
      const tamY = nyan[0].getBoundingClientRect().height / 2;
      px += (posX - px - tamX) / 50;
      py += (posY - py - tamY) / 50;
      nyan[0].style.left = `${px}px`;
      nyan[0].style.top = `${py}px`;
    };

    const peidaArcoIris = function() {
      const qnt = Math.floor(nyan[0].offsetLeft / 9) + 2;
      if (pilha.length >= qnt) {
        pilha.pop();
      }
      pilha.unshift(py);
      rainbow.forEach(rainbow => (rainbow.style.display = 'none'));
      for (let i = 0; i < qnt; i++) {
        let am = i % 2;
        if (an) {
          am = i % 2 ? 0 : 1;
        }
        const currentRainbow = document.querySelectorAll(`.${window.nyancat.rainbowClass}`)[qnt - i];
        if (currentRainbow) {
          currentRainbow.style.top = `${pilha[i] + am}px`;
          currentRainbow.style.display = 'block';
        }
      }
    };

    window.nyancat.interval1 = window.setInterval(() => {
      moveNyan();
      peidaArcoIris();
    }, 10);
    window.nyancat.interval2 = window.setInterval(() => criarEstrela(), 300);
    window.nyancat.interval3 = window.setInterval(() => (an = !an), 500);

    let frame = 0;
    window.nyancat.interval4 = window.setInterval(() => {
      nyan[0].style.backgroundPosition = `${34 * frame}px`;
      frame++;
    }, 100);
  },

  stop() {
    window.nyancat = window.nyancat || {};
    window.nyancat.active = false;
    document.removeEventListener('mousemove', window.nyancat.mouseMove);
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

const pizarra = document.getElementById("canvas");
const pincel = pizarra.getContext("2d");
let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CSS"];
const SecretWord = palabras[Math.floor(Math.random() * (palabras.length - 1 + 1))];
const palabraLista = SecretWord.split("");
const setLetras = new Set(palabraLista);
let setLetrasCount = new Set();
const letrasPantalla = document.querySelector(".letras");
let letrasPresionadas = [];
let id = 0;
let canvaSize;
let letrasErroneas = 4;
let finDelJuego = false;
const comparar = (xs, ys) => xs.size === ys.size && [...xs].every((x) => ys.has(x));

document.addEventListener("load", start());
window.addEventListener("resize", () => {
  ajustar();
  if (comparar(setLetras, setLetrasCount)) {
    ganaste();
  }
});
document.addEventListener("keydown", presionTecla);

function presionTecla(e) {
  if (palabraLista.includes(e.key.toUpperCase())) {
    setLetrasCount.add(e.key.toUpperCase());
    for (let i = 0; i < palabraLista.length; i++) {
      if (document.getElementById(i).innerHTML == e.key.toUpperCase()) {
        let palabra = document.getElementById(i);
        palabra.style.visibility = "visible";
      }
    }
  } else {
    if (letrasPresionadas.includes(e.key.toUpperCase())) {
      // No pasa nada
    } else {
      letrasPresionadas.push(e.key.toUpperCase());
      letrasErroneas--;
      render();
    }
  }
  if (comparar(setLetras, setLetrasCount)) {
    ganaste();
    finDelJuego = true;
  }
  if (finDelJuego) {
    document.removeEventListener("keydown", presionTecla, false);
  }
}
function start() {
  ajustar();
  render();
  letrasOcultas();
}
function ajustar() {
  if (window.innerWidth < window.innerHeight) {
    canvaSize = window.innerWidth * 0.75;
  } else {
    canvaSize = window.innerHeight * 0.5;
  }
  pizarra.width = canvaSize;
  pizarra.height = canvaSize;
  render();
}
function render() {
  pincel.fillStyle = "#0A4786";
  pincel.fillRect(0, canvaSize, canvaSize, -10);
  pincel.fillRect(canvaSize / 4, canvaSize, 10, -(canvaSize * 0.9));
  pincel.fillRect(canvaSize / 4, canvaSize * 0.1, canvaSize * 0.4, 10);
  pincel.fillRect(canvaSize * 0.64, canvaSize * 0.1, 10, canvaSize * 0.1);

  if (letrasErroneas < 4) {
    pincel.strokeStyle = "#0A4786";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.arc(canvaSize * 0.64, canvaSize * 0.28, canvaSize * 0.08, 0, Math.PI * 2);
    pincel.stroke();
  }
  if (letrasErroneas < 3) {
    pincel.strokeStyle = "#0A4786";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(canvaSize * 0.64, canvaSize * 0.36);
    pincel.lineTo(canvaSize * 0.64, canvaSize * 0.55);
    pincel.stroke();
  }
  if (letrasErroneas < 2) {
    pincel.strokeStyle = "#0A4786";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(canvaSize * 0.64, canvaSize * 0.55);
    pincel.lineTo(canvaSize * 0.55, canvaSize * 0.7);
    pincel.stroke();

    pincel.strokeStyle = "#0A4786";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(canvaSize * 0.64, canvaSize * 0.55);
    pincel.lineTo(canvaSize * 0.72, canvaSize * 0.7);
    pincel.stroke();
  }
  if (letrasErroneas < 1) {
    pincel.strokeStyle = "#0A4786";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(canvaSize * 0.64, canvaSize * 0.4);
    pincel.lineTo(canvaSize * 0.55, canvaSize * 0.5);
    pincel.stroke();

    pincel.strokeStyle = "#0A4786";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(canvaSize * 0.64, canvaSize * 0.4);
    pincel.lineTo(canvaSize * 0.72, canvaSize * 0.5);
    pincel.stroke();
  }
  if (letrasErroneas < 0) {
    pincel.textAlign = "center";
    pincel.font = canvaSize * 0.09 + "pt Arial";
    pincel.fillStyle = "red";
    pincel.fillText("Fin del juego", canvaSize / 2, canvaSize / 2);
    finDelJuego = true;
  }
}
function letrasOcultas() {
  for (let i of palabraLista) {
    letrasPantalla.innerHTML += `<div class="borde"><p id ="${id}">${i}</p></div>`;
    id++;
  }
}
function ganaste() {
  pincel.textAlign = "center";
  pincel.font = canvaSize * 0.09 + "pt Arial";
  pincel.fillStyle = "red";
  pincel.fillText("GANASTE", canvaSize / 2, canvaSize / 2);
}
function reiniciar() {
  window.location.reload();
}

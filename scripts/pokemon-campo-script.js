let immagini = [];

let turno = 1;
let punteggio2 = 0;
let player1 = "Giocatore 1";
let player2 = "Giocatore 2";

async function creaArrayImmaginiPokemonRandom() {
  immagini = [];

  while (immagini.length < 10) {
    const idRandom = Math.floor(Math.random() * 898) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idRandom}`);
      const data = await response.json();
      const imgUrl = data.sprites.front_default || 'https://via.placeholder.com/120';
      immagini.push(imgUrl);
    } catch (error) {
      console.error(`Errore con Pokémon ID ${idRandom}:`, error);
    }
  }

  return immagini;
}

const retro = '../images/pokemonFirstPage.jpg';

function creaCarte() {
  const game = document.querySelector('.campo-carte');
  const tutteLeCarte = [...immagini, ...immagini];

  tutteLeCarte.sort(() => Math.random() - 0.5);

  tutteLeCarte.forEach((img, i) => {
    const carta = document.createElement('div');
    carta.className = 'memory-card';
    carta.dataset.img = img;

    carta.innerHTML = `
        <img src="${img}" class="front-face">
        <img src="${retro}" class="back-face">
      `;

    carta.addEventListener('click', giraCarta);
    game.appendChild(carta);
  });
}

let primaCarta, secondaCarta;
let bloccato = false;


function giraCarta() {
  if (bloccato) return;
  if (this === primaCarta) return;

  this.classList.add('flip');

  if (!primaCarta) {
    primaCarta = this;
    return;
  }

  secondaCarta = this;
  bloccato = true;

  controllaCoppia();
}

function tutteLeCarteTrovate() {
  return document.querySelectorAll('.memory-card:not(.flip)').length === 0;
}


function controllaCoppia() {
  const match = primaCarta.dataset.img === secondaCarta.dataset.img;

  if (match) {
    primaCarta.removeEventListener('click', giraCarta);
    secondaCarta.removeEventListener('click', giraCarta);

    if (turno === 1) {
      punteggio1++;
      //localStorage.setItem('punteggio1', punteggio1);
    } else {
      punteggio2++;
      //localStorage.setItem('punteggio2', punteggio2);
    }

    aggiornaPunteggio();
    resetta();

    // Controlla se tutte le carte sono girate
    if (tutteLeCarteTrovate()) {
      const vincitore = punteggio1 > punteggio2 ? player1 :
                        punteggio2 > punteggio1 ? player2 : "Pareggio!";
      mostraMessaggio(`${vincitore} ha vinto!`, 3000);
    }

  } else {
    setTimeout(() => {
      primaCarta.classList.remove('flip');
      secondaCarta.classList.remove('flip');

      // Cambia turno
      turno = turno === 1 ? 2 : 1;
      mostraMessaggio(`PLAYER ${turno}`, 1500);

      resetta();
    }, 1000);
  }
}
function aggiornaPunteggio() {
  document.getElementById('score-player1').textContent = `${player1}: ${punteggio1}`;
  document.getElementById('score-player2').textContent = `${player2}: ${punteggio2}`;
}

function resetta() {
  [primaCarta, secondaCarta] = [null, null];
  bloccato = false;
}

function mostraMessaggio(testo, durata = 1500) {
  const messaggio = document.getElementById("messaggio-turno");
  messaggio.textContent = testo;
  messaggio.classList.remove("hidden");
  messaggio.classList.add("visible");

  setTimeout(() => {
    messaggio.classList.remove("visible");
    messaggio.classList.add("hidden");
  }, durata);
}

function getTema() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('tema') || 
         sessionStorage.getItem('tema') || 
         localStorage.getItem('tema');
}



document.addEventListener('DOMContentLoaded', async () => {
   // Verifica il tema anche qui
    const tema = localStorage.getItem('tema') || sessionStorage.getItem('tema');
    if (!tema || tema !== 'pokemon') {
        alert("Accesso non valido alla pagina Pokémon!");
        window.location.href = '../index.html';
        return;
    }
  
    // Il resto del tuo codice...
  
  // Recupera i dati salvati
  punteggio1 = parseInt(localStorage.getItem('punteggio1')) || 0;
  punteggio2 = parseInt(localStorage.getItem('punteggio2')) || 0;
  player1 = localStorage.getItem('player1') || "Giocatore 1";
  player2 = localStorage.getItem('player2') || "Giocatore 2";
  
  // Aggiorna l'UI
  aggiornaPunteggio();
  
  // Carica e crea le carte
  immagini = await creaArrayImmaginiPokemonRandom();
  creaCarte();
  mostraMessaggio(`PLAYER ${turno}`);
});

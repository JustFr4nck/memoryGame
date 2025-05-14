


//Script index


document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video-bg');


  function attemptPlay() {
    video.play().then(() => {
      console.log('Video autoplay started');
    }).catch(error => {
      console.log('Autoplay prevented:', error);
      const playButton = document.createElement('button');
      playButton.innerHTML = '▶️ Play Background';
      playButton.style.position = 'fixed';
      playButton.style.bottom = '20px';
      playButton.style.left = '50%';
      playButton.style.transform = 'translateX(-50%)';
      playButton.style.zIndex = '1000';
      playButton.style.padding = '10px 20px';
      playButton.style.background = '#FF6D00';
      playButton.style.color = 'black';
      playButton.style.border = 'none';
      playButton.style.borderRadius = '5px';
      playButton.style.cursor = 'pointer';

      playButton.addEventListener('click', () => {
        video.play();
        music.play();
        playButton.remove();
      });

      document.body.appendChild(playButton);
    });
  }


  if (video.readyState >= 3) {
    attemptPlay();
  } else {
    video.addEventListener('loadedmetadata', attemptPlay);
  }


  if (/Mobi|Android/i.test(navigator.userAgent)) {
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
  }

});

const music = document.getElementById('backgroundMusic');
const toggleBtn = document.getElementById('musicToggle');


let isPlaying = false;

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    toggleBtn.textContent = "▶️ Attiva musica";
  } else {
    music.play();
    toggleBtn.textContent = "⏸️ Disattiva musica";
  }
  isPlaying = !isPlaying;
});


const buttonPokemon = document.getElementById("buttonPokemon");
const emojiButton = document.getElementById("emojiButton");

let pokeBul = false;
let emojiBull = false;

function iniziaGiocoPoke() {

  pokeBul = true;
}

function iniziaGiocoEmoji() {

  emojiBull = true;
}

buttonPokemon.addEventListener("click", () => {
  console.log("Tema selezionato: pokemon");
  scegliTema("pokemon");
});

emojiButton.addEventListener("click", () => {
  console.log("Tema selezionato: emoji");
  scegliTema("emoji");
});
/*
function scegliTema(tema) {
  console.log("Salvo tema:", tema);
  // Salva in ENTRAMBI gli storage per sicurezza
  localStorage.setItem('tema', tema);
  sessionStorage.setItem('tema', tema);
  // Verifica immediatamente
  console.log("LocalStorage tema:", localStorage.getItem('tema'));
  console.log("SessionStorage tema:", sessionStorage.getItem('tema'));
  window.location.href = './pages/players.html';
}*/
function scegliTema(tema) {
  // Salva in tutti i sistemi possibili
  localStorage.setItem('tema', tema);
  sessionStorage.setItem('tema', tema);
  
  // Passa anche come parametro URL
  window.location.href = `./pages/players.html?tema=${encodeURIComponent(tema)}`;
  
  console.log("Tema salvato in:", {
    localStorage: localStorage.getItem('tema'),
    sessionStorage: sessionStorage.getItem('tema'),
    url: `players.html?tema=${tema}`
  });
}



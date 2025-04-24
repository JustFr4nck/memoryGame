  
  
  
 //Script index
  
  
  document.addEventListener('DOMContentLoaded', function() {
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
    

    if (/Mobi|Android/i.test(navigatorUserAgent)) {
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

function iniziaGiocoPoke(){

  pokebul = true;
}
buttonPokemon.addEventListener("click", () => {

  iniziaGiocoPoke();

});

function iniziaGiocoEmoji(){

  emojiBull = true;
}
emojiButton.addEventListener("click", () => {

  iniziaGiocoEmoji();

});


//Script players

const btn_first_player = document.getElementById("btn-first-player");
const btn_second_player = document.getElementById("btn-second-player");
const btn_start_game = document.getElementById("start-game");
const input_first_player = document.getElementById("input-first-player");
const input_second_player = document.getElementById("input-second-player");

const players = {
    player1: { name: "", ready: false },
    player2: { name: "", ready: false }
};

function controllaInput() {
    const name1 = input_first_player.value.trim();
    const name2 = input_second_player.value.trim();

    if (name1 === "" || name2 === "") return false;

    if (name1.toLowerCase() === name2.toLowerCase()) {
        alert("I nomi dei giocatori devono essere diversi");
        return false;
    }

    return true;
}

function controllaReady() {
    const canStart = players.player1.ready && players.player2.ready;
    btn_start_game.disabled = !canStart;

    if (canStart) {
        btn_start_game.classList.add("btn-pulse");
    } else {
        btn_start_game.classList.remove("btn-pulse");
    }
}

function toggleReady(player) {
    const name = player === 1 ? input_first_player.value.trim() : input_second_player.value.trim();
    const otherInput = player === 1 ? input_second_player : input_first_player;

    if (name === "" || otherInput.value.trim() === "") {
        alert("Inserisci nomi validi per entrambi i giocatori");
        return;
    }

    if (name.toLowerCase() === otherInput.value.trim().toLowerCase()) {
        alert("I nomi dei giocatori devono essere diversi");
        return;
    }

    let playerObj = player === 1 ? players.player1 : players.player2;
    let button = player === 1 ? btn_first_player : btn_second_player;

    playerObj.ready = !playerObj.ready;
    playerObj.name = name;

    button.textContent = playerObj.ready ? "✓ Pronto" : "Pronto";
    button.classList.toggle("btn-success", playerObj.ready);
    button.classList.toggle("btn-primary", !playerObj.ready);

    controllaReady();
}

function startGame() {
    if (!players.player1.ready || !players.player2.ready) {
        alert("Entrambi i giocatori devono essere pronti!");
        return;
    }

    localStorage.setItem("memoryGamePlayers", JSON.stringify({
        player1: players.player1.name,
        player2: players.player2.name,
        timestamp: new Date().getTime()
    }));

    input_first_player.value = "";
    input_second_player.value = "";

    document.body.classList.add("fade-out");
    setTimeout(() => {
        if(pokeBul == true){

          window.location.href = "pokemon.html";

        }
        else{

          window.location.href = "emoji.html";
        }
       
    }, 500);
}

function savePlayerScore(playerName, score) {
    try {
        const topPlayers = JSON.parse(localStorage.getItem('memoryGameTopPlayers')) || [];

        const existingPlayerIndex = topPlayers.findIndex(p =>
            p.name.toLowerCase() === playerName.toLowerCase()
        );

        if (existingPlayerIndex !== -1) {
            if (score > topPlayers[existingPlayerIndex].score) {
                topPlayers[existingPlayerIndex].score = score;
                topPlayers[existingPlayerIndex].date = new Date().toISOString();
            }
        } else {
            topPlayers.push({
                name: playerName,
                score: score,
                date: new Date().toISOString()
            });
        }

        topPlayers.sort((a, b) => b.score - a.score);
        const top5 = topPlayers.slice(0, 5);

        localStorage.setItem('memoryGameTopPlayers', JSON.stringify(top5));
    } catch (error) {
        console.error("Errore nel salvataggio del punteggio:", error);
    }
}

btn_first_player.addEventListener("click", () => toggleReady(1));
btn_second_player.addEventListener("click", () => toggleReady(2));
btn_start_game.addEventListener("click", startGame);

input_first_player.addEventListener("input", controllaReady);
input_second_player.addEventListener("input", controllaReady);

window.addEventListener("DOMContentLoaded", () => {
    try {
        const savedPlayers = localStorage.getItem("memoryGamePlayers");
        if (savedPlayers) {
            const { player1, player2 } = JSON.parse(savedPlayers);
            players.player1.name = player1 || "";
            players.player2.name = player2 || "";
        }
    } catch (error) {
        console.error("Errore nel caricamento dello stato iniziale:", error);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('bgVideo');

    video.play().catch(error => {
        console.log("Auto-play non permesso:", error);
        const playButton = document.createElement('button');
        playButton.textContent = 'Play Background';
        playButton.className = 'btn btn-secondary position-fixed bottom-0 end-0 m-3';
        playButton.onclick = () => {
            video.play();
            playButton.remove();
        };
        document.body.appendChild(playButton);
    });
});


// Prendo gli elementi HTML
const btn1 = document.getElementById("btn-first-player");
const btn2 = document.getElementById("btn-second-player");
const startBtn = document.getElementById("start-game");
const input1 = document.getElementById("input-first-player");
const input2 = document.getElementById("input-second-player");

let player1Ready = false;
let player2Ready = false;
let player1Name = "";
let player2Name = "";

function getTema() {
    const urlParams = new URLSearchParams(window.location.search);
    const temaURL = urlParams.get('tema');
    
    return temaURL || 
           sessionStorage.getItem('tema') || 
           localStorage.getItem('tema');
  }

  document.addEventListener("DOMContentLoaded", function() {
    const tema = getTema();
    console.log("Tema recuperato da:", {
      url: new URLSearchParams(window.location.search).get('tema'),
      sessionStorage: sessionStorage.getItem('tema'),
      localStorage: localStorage.getItem('tema'),
      final: tema
    });
  
    if (!tema) {
      console.error("Nessun tema trovato in nessun storage!");
      alert("Per favore seleziona prima un tema");
      window.location.href = '../index.html';
      return;
    }
  
    // Salva il tema per le pagine successive
    localStorage.setItem('tema', tema);
    sessionStorage.setItem('tema', tema);
    
    // Aggiorna il titolo
    document.title = `Memory Game - ${tema.toUpperCase()}`;
  });


// Controlla se si può iniziare il gioco
function checkIfCanStart() {
    if (player1Ready && player2Ready && player1Name !== "" && player2Name !== "" && player1Name.toLowerCase() !== player2Name.toLowerCase()) {
        startBtn.disabled = false;
        startBtn.classList.add("btn-pulse");
    } else {
        startBtn.disabled = true;
        startBtn.classList.remove("btn-pulse");
    }
}

// Quando clicca "Pronto" il giocatore 1
btn1.addEventListener("click", () => {
    player1Name = input1.value.trim();

    if (player1Name === "") {
        alert("Scrivi il tuo nome");
        return;
    }

    if (player1Name.toLowerCase() === input2.value.trim().toLowerCase()) {
        alert("I nomi devono essere diversi");
        return;
    }

    player1Ready = !player1Ready;
    btn1.textContent = player1Ready ? "✓ Pronto" : "Pronto";
    checkIfCanStart();
});

// Quando clicca "Pronto" il giocatore 2
btn2.addEventListener("click", () => {
    player2Name = input2.value.trim();

    if (player2Name === "") {
        alert("Scrivi il tuo nome");
        return;
    }

    if (player2Name.toLowerCase() === input1.value.trim().toLowerCase()) {
        alert("I nomi devono essere diversi");
        return;
    }

    player2Ready = !player2Ready;
    btn2.textContent = player2Ready ? "✓ Pronto" : "Pronto";
    checkIfCanStart();
});

function salvaGiocatori(event) {
    event.preventDefault();

    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    localStorage.setItem('player1', player1);
    localStorage.setItem('player2', player2);

    const tema = localStorage.getItem('tema');

    if (tema === 'pokemon') {
        window.location.href = 'pokemon.html';
    } else if (tema === 'emoji') {
        window.location.href = 'emoji.html';
    } else {
        alert('Tema non selezionato!');
    }
}


// Video di sfondo
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("bgVideo");

    video.play().catch(() => {
        const btn = document.createElement("button");
        btn.textContent = "Play Background";
        btn.className = "btn btn-secondary";
        btn.onclick = () => {
            video.play();
            btn.remove();
        };
        document.body.appendChild(btn);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Controlla entrambi gli storage con priorità a sessionStorage
    const tema = sessionStorage.getItem('tema') || localStorage.getItem('tema');
    console.log("Tema recuperato:", tema, 
                "\nSessionStorage:", sessionStorage.getItem('tema'),
                "\nLocalStorage:", localStorage.getItem('tema'));

    if (!tema) {
        console.error("Storage vuoto! Reindirizzamento...");
        alert("Per favore seleziona prima un tema");
        window.location.href = '../index.html';
        return;
    }
    
    // Aggiorna il titolo per debug
    document.title = `Memory Game - ${tema.toUpperCase()}`;
});

// Modifica anche il click handler del pulsante start
startBtn.addEventListener("click", () => {
    const tema = getTema(); // Usa la stessa funzione di prima
    
    if (tema === 'pokemon') {
      window.location.href = `pokemon.html?tema=${encodeURIComponent(tema)}`;
    } else if (tema === 'emoji') {
      window.location.href = `emoji.html?tema=${encodeURIComponent(tema)}`;
    } else {
      alert("Errore: Tema non riconosciuto!");
      window.location.href = '../index.html';
    }
  });
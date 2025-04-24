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

// Avvia il gioco solo se tutto è ok
startBtn.addEventListener("click", () => {
    localStorage.setItem("memoryGamePlayers", JSON.stringify({
        player1: player1Name,
        player2: player2Name
    }));

    window.location.href = "pokemon.html";
});

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

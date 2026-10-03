// ======================================
// SPIDERMINE VIRTUAL GIFT
// script.js
// ======================================


// ---------- PAGE NAVIGATION ----------

function showPage(pageId) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ---------- ANNIVERSARY DATE ----------

const dateInputs = document.querySelectorAll(".date-inputs input");

dateInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        // hanya angka
        input.value = input.value.replace(/[^0-9]/g, "");

        // otomatis pindah ke kotak berikutnya
        if (input.value && index < dateInputs.length - 1) {
            dateInputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (event) => {

        // kalau tekan backspace di kotak kosong,
        // balik ke kotak sebelumnya
        if (
            event.key === "Backspace" &&
            !input.value &&
            index > 0
        ) {
            dateInputs[index - 1].focus();
        }
    });

});


// kode anniversary kalian
const correctDate = "220224";


function checkDate() {

    let enteredDate = "";

    dateInputs.forEach(input => {
        enteredDate += input.value;
    });

    const errorMessage = document.getElementById("date-error");

    if (enteredDate === correctDate) {

        errorMessage.textContent = "";

        showPage("page-love");

    } else {

        errorMessage.textContent =
            "hmm... kayaknya bukan tanggal kita 👀 coba lagi, mas!";

        // kosongkan input
        dateInputs.forEach(input => {
            input.value = "";
        });

        dateInputs[0].focus();
    }
}


// ---------- LOVE QUESTION ----------

function sayYes() {

    showPage("page-letter");

}


function sayNo() {

    showPage("page-404");

}


// ---------- MINI GAME ----------

let score = 0;
let timeLeft = 20;
let gameTimer = null;
let heartSpawner = null;
let gameRunning = false;


function startGame() {

    if (gameRunning) return;

    gameRunning = true;

    score = 0;
    timeLeft = 20;

    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timeLeft;

    document.getElementById("game-message").textContent = "";

    const gameArea = document.getElementById("game-area");

    // hapus tombol start
    const startButton = document.getElementById("game-start");

    if (startButton) {
        startButton.remove();
    }

    // timer
    gameTimer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);


    // spawn hearts
    heartSpawner = setInterval(() => {

        createHeart();

    }, 600);

}


function createHeart() {

    if (!gameRunning) return;

    const gameArea = document.getElementById("game-area");

    const heart = document.createElement("button");

    heart.classList.add("game-heart");

    heart.innerHTML = "❤️";

    // posisi random
    const maxX = gameArea.clientWidth - 55;
    const maxY = gameArea.clientHeight - 55;

    const randomX = Math.random() * Math.max(maxX, 10);
    const randomY = Math.random() * Math.max(maxY, 10);

    heart.style.left = randomX + "px";
    heart.style.top = randomY + "px";

    heart.addEventListener("click", () => {

        if (!gameRunning) return;

        score++;

        document.getElementById("score").textContent = score;

        heart.remove();

        // menang kalau dapat 10
        if (score >= 10) {

            winGame();

        }

    });

    gameArea.appendChild(heart);

    // heart hilang sendiri setelah beberapa detik
    setTimeout(() => {

        if (heart.parentElement) {
            heart.remove();
        }

    }, 1800);

}


// ---------- GAME OVER ----------

function endGame() {

    if (!gameRunning) return;

    gameRunning = false;

    clearInterval(gameTimer);
    clearInterval(heartSpawner);

    // hapus semua hati
    document.querySelectorAll(".game-heart").forEach(heart => {
        heart.remove();
    });

    const message = document.getElementById("game-message");

    message.innerHTML =
        "TIME'S UP! 😭<br>" +
        "mas baru dapat " +
        score +
        " hati.";

    // tombol coba lagi
    const retryButton = document.createElement("button");

    retryButton.textContent = "TRY AGAIN ❤️";

    retryButton.onclick = startGame;

    message.appendChild(document.createElement("br"));
    message.appendChild(retryButton);

}


function winGame() {

    if (!gameRunning) return;

    gameRunning = false;

    clearInterval(gameTimer);
    clearInterval(heartSpawner);

    // hapus semua hati
    document.querySelectorAll(".game-heart").forEach(heart => {
        heart.remove();
    });

    document.getElementById("score").textContent = "10";

    // kasih sedikit delay biar efek menang terasa
    setTimeout(() => {

        showPage("page-winner");

    }, 500);

}


// ---------- ENTER KEY ----------

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const activePage = document.querySelector(".page.active");

        if (activePage && activePage.id === "page-date") {
            checkDate();
        }

    }

});

const passwordScreen = document.getElementById('password-screen');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');
const splashScreen = document.getElementById('splash-screen');
const playerCountInput = document.getElementById('player-count');
const playerNamesContainer = document.getElementById('player-names-container');
const startGameButton = document.getElementById('start-game');
const gameScreen = document.getElementById('game-screen');
const playersScoreContainer = document.getElementById('players-score-container');
const blackCardDisplay = document.getElementById('black-card');
const greenCardDisplay = document.getElementById('green-card');
const drawCardsButton = document.getElementById('draw-cards');
const nextRoundButton = document.getElementById('next-round');
const winnerMessage = document.getElementById('winner-message');
const currentPlayerDisplay = document.getElementById('current-player-display');

let players = [];
let blackDeck = [];
let greenDeck = [];
let currentPlayerIndex = 0;
const WINNING_SCORE = 4;
const CORRECT_PASSWORD = "YappingYouths";

// Password Screen Logic
passwordSubmit.addEventListener('click', () => {
    if (passwordInput.value === CORRECT_PASSWORD) {
        passwordScreen.classList.add('hidden');
        splashScreen.classList.remove('hidden');
        passwordError.textContent = '';
    } else {
        passwordError.textContent = 'Incorrect password. Please try again.';
    }
});

// Splash Screen Logic
playerCountInput.addEventListener('change', (event) => {
    const count = parseInt(event.target.value);
    playerNamesContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Player ${i + 1} Name`;
        input.classList.add('player-input');
        playerNamesContainer.appendChild(input);
    }
});

startGameButton.addEventListener('click', () => {
    const nameInputs = playerNamesContainer.querySelectorAll('.player-input');
    players = Array.from(nameInputs).map(input => ({
        name: input.value || `Player ${players.length + 1}`,
        score: 0
    }));

    if (players.length === 0) {
        alert('Please enter at least one player.');
        return;
    }

    splashScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initializeGame();
});

function initializeGame() {
    loadDecks();
    renderPlayerScores();
    updateCurrentPlayerDisplay();
}

function loadDecks() {
    // Load image filenames from 100 black (a1-a100) and 50 green (b1-b50) cards
    blackDeck = Array.from({ length: 100 }, (_, i) => `deck_a/a${i + 1}.png`);
    greenDeck = Array.from({ length: 50 }, (_, i) => `deck_b/b${i + 1}.png`);
    shuffleDeck(blackDeck);
    shuffleDeck(greenDeck);
}

    shuffleDeck(blackDeck);
    shuffleDeck(greenDeck);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function renderPlayerScores() {
    playersScoreContainer.innerHTML = '';
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-score');
        playerDiv.innerHTML = `
            <span>${player.name}: <span id="score-${index}">${player.score}</span></span>
            <div>
                <button onclick="adjustScore(${index}, 1)">+</button>
                <button onclick="adjustScore(${index}, -1)">-</button>
            </div>
        `;
        playersScoreContainer.appendChild(playerDiv);
    });
}

function adjustScore(playerIndex, amount) {
    players[playerIndex].score += amount;
    if (players[playerIndex].score < 0) {
        players[playerIndex].score = 0; // Prevent negative scores
    }
    document.getElementById(`score-${playerIndex}`).textContent = players[playerIndex].score;
    checkWinner(playerIndex);
}

function checkWinner(playerIndex) {
    if (players[playerIndex].score >= WINNING_SCORE) {
        winnerMessage.textContent = `${players[playerIndex].name} IS THE WINNER!`;
        winnerMessage.classList.remove('hidden');
        drawCardsButton.disabled = true;
        nextRoundButton.disabled = true;
    } else {
        winnerMessage.classList.add('hidden');
        drawCardsButton.disabled = false;
        nextRoundButton.disabled = false;
    }
}

drawCardsButton.addEventListener('click', () => {
    if (blackDeck.length === 0 || greenDeck.length === 0) {
        alert('No more cards in decks! Resetting decks.');
        loadDecks(); // Reload and shuffle if decks are empty
    }
const blackCard = blackDeck.pop();
const greenCard = greenDeck.pop();
blackCardDisplay.innerHTML = `<img src="${blackCard}" alt="Black Card" style="max-width:100%; max-height:100%;" />`;
greenCardDisplay.innerHTML = `<img src="${greenCard}" alt="Green Card" style="max-width:100%; max-height:100%;" />`;

});

nextRoundButton.addEventListener('click', () => {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayerDisplay();
    blackCardDisplay.textContent = 'Black Card';
    greenCardDisplay.textContent = 'Green Card';
    winnerMessage.classList.add('hidden'); // Hide winner message for new round
});

function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = `Current Judge: ${players[currentPlayerIndex].name}`;
}

// Initial setup for player count input
playerCountInput.dispatchEvent(new Event('change'));

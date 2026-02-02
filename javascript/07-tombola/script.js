// Game State
let gameState = {
    remainingNumbers: [],
    calledList: [],
    lastCalled: -1
};

// Initialize game on page load
function initGame() {
    loadGameState();
    generateBoard();
    updateBoard();
    displayLastFour();

    // Listen for localStorage changes from other tabs
    window.addEventListener('storage', function (e) {
        if (e.key === 'tombolaState') {
            loadGameState();
            updateBoard();
            displayLastFour();
        }
    });
}

// Generate the 90-number board (9 rows x 10 columns)
function generateBoard() {
    const board = document.getElementById('tombolaBoard');
    let html = '<tbody>';

    for (let row = 0; row < 9; row++) {
        html += '<tr>';
        for (let col = 0; col < 10; col++) {
            const num = row * 10 + col + 1;
            html += `<td class="text-center align-middle fw-bold" id="cell-${num}">${num}</td>`;
        }
        html += '</tr>';
    }

    html += '</tbody>';
    board.innerHTML = html;
}

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('tombolaState');
    if (saved) {
        gameState = JSON.parse(saved);
    } else {
        // Initialize with all numbers 1-90
        gameState.remainingNumbers = [];
        for (let i = 1; i <= 90; i++) {
            gameState.remainingNumbers.push(i);
        }
        gameState.calledList = [];
        gameState.lastCalled = -1;
        saveGameState();
    }
}

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem('tombolaState', JSON.stringify(gameState));
}

// Extract a random number
function extractNumber() {
    if (gameState.remainingNumbers.length === 0) {
        alert('Tutti i numeri sono stati estratti!');
        return;
    }

    // Shuffle and pick a random number
    const randomIndex = Math.floor(Math.random() * gameState.remainingNumbers.length);
    const number = gameState.remainingNumbers[randomIndex];

    // Remove from remaining, add to called
    gameState.remainingNumbers.splice(randomIndex, 1);
    gameState.calledList.push(number);
    gameState.lastCalled = number;

    saveGameState();
    updateBoard();
    displayLastFour();
}

// Update the visual board based on called numbers
function updateBoard() {
    // Reset all cells
    for (let i = 1; i <= 90; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell) {
            cell.classList.remove('bg-danger', 'text-white');
        }
    }

    // Mark called numbers
    gameState.calledList.forEach(num => {
        const cell = document.getElementById(`cell-${num}`);
        if (cell) {
            cell.classList.add('bg-danger', 'text-white');
        }
    });
}

// Display the last 4 called numbers
function displayLastFour() {
    const container = document.getElementById('lastCalledContainer');
    const lastFour = gameState.calledList.slice(-4).reverse();

    if (lastFour.length === 0) {
        container.innerHTML = '<p class="text-muted">Nessun numero estratto</p>';
        return;
    }

    let html = '';
    lastFour.forEach((num, index) => {
        const bgColor = index === 0 ? 'bg-primary' : 'bg-danger'; // diff colors for readability
        html += `<span class="badge ${bgColor} rounded-pill fs-1 m-2 px-4 py-3">${num}</span>`;
    });
    container.innerHTML = html;
}

// Reset the game
function resetGame() {
    if (confirm('Vuoi resettare il gioco?')) {
        gameState.remainingNumbers = [];
        for (let i = 1; i <= 90; i++) {
            gameState.remainingNumbers.push(i);
        }
        gameState.calledList = [];
        gameState.lastCalled = -1;

        saveGameState();
        updateBoard();
        displayLastFour();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initGame);
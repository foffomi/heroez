// Seleziona il canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 40;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

// Posizione iniziale dell'eroe
let player = { x: 0, y: 0 };

// Mostri casuali
const monsters = [];
const maxMonsters = 3;

// Risorse casuali
const resources = [];
const maxResources = 2;

// Funzione per disegnare una griglia
function drawGrid() {
    for (let x = 0; x <= canvas.width; x += tileSize) {
        for (let y = 0; y <= canvas.height; y += tileSize) {
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(x, y, tileSize, tileSize);
        }
    }
}

// Funzione per disegnare l'eroe
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Funzione per disegnare mostri
function drawMonsters() {
    monsters.forEach(monster => {
        ctx.fillStyle = "red";
        ctx.fillRect(monster.x * tileSize, monster.y * tileSize, tileSize, tileSize);
    });
}

// Funzione per disegnare risorse
function drawResources() {
    resources.forEach(resource => {
        ctx.fillStyle = "gold";
        ctx.fillRect(resource.x * tileSize, resource.y * tileSize, tileSize, tileSize);
    });
}

// Funzione per generare mostri e risorse casuali
function generateMonstersAndResources() {
    for (let i = 0; i < maxMonsters; i++) {
        monsters.push({
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        });
    }

    for (let i = 0; i < maxResources; i++) {
        resources.push({
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        });
    }
}

// Funzione per controllare il movimento del giocatore
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        player.x = newX;
        player.y = newY;
        checkCollisions();
        update();
    }
}

// Controlla collisioni con mostri e risorse
function checkCollisions() {
    monsters.forEach((monster, index) => {
        if (monster.x === player.x && monster.y === player.y) {
            alert('Sei stato sconfitto da un mostro!');
            resetGame();
        }
    });

    resources.forEach((resource, index) => {
        if (resource.x === player.x && resource.y === player.y) {
            resources.splice(index, 1);
            alert('Hai raccolto una risorsa!');
        }
    });
}

// Funzione per resettare il gioco
function resetGame() {
    player = { x: 0, y: 0 };
    monsters.length = 0;
    resources.length = 0;
    generateMonstersAndResources();
    update();
}

// Funzione di aggiornamento della grafica
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
    drawMonsters();
    drawResources();
}

// Event listener per il movimento
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

// Inizializza il gioco
generateMonstersAndResources();
update();

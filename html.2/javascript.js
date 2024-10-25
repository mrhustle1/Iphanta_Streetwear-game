const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

let player = { x: 50, y: 50, width: 20, height: 20, speed: 3 };
let mazeWalls = [
    { x: 0, y: 100, width: 400, height: 20 },
    { x: 100, y: 200, width: 400, height: 20 },
    { x: 0, y: 300, width: 400, height: 20 },
    { x: 100, y: 400, width: 400, height: 20 },
    { x: 200, y: 0, width: 20, height: 500 }
];

let gameActive = false;
let statusMessage = document.getElementById('statusMessage');

function drawPlayer() {
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawMaze() {
    ctx.fillStyle = '#000';
    mazeWalls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function checkCollision() {
    for (let i = 0; i < mazeWalls.length; i++) {
        let wall = mazeWalls[i];
        if (
            player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y
        ) {
            gameOver();
        }
    }
}

function gameOver() {
    gameActive = false;
    statusMessage.textContent = 'Game Over! You lost!';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    if (!gameActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPlayer();
    checkCollision();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', function (e) {
    if (!gameActive) return;
    
    switch (e.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
    }

    if (player.x >= canvas.width - player.width) {
        gameWin();
    }
});

function gameWin() {
    gameActive = false;
    statusMessage.textContent = 'Congratulations! You win a free T-shirt!';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('startBtn').addEventListener('click', function () {
    player.x = 50;
    player.y = 50;
    gameActive = true;
    statusMessage.textContent = '';
    update();
});

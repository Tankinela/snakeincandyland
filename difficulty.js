const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('menu');
const gameOverText = document.getElementById('game-over');
const startOverButton = document.getElementById('startOver');
const menuButton = document.getElementById('menuButton');
const startButton = document.getElementById('start');

// Zvukové efekty
const eatSound = new Audio('sounds/eat.mp3'); // Zvuk sbírání bonbónu
const gameOverSound = new Audio('sounds/gameover.mp3'); // Zvuk kolize
const backgroundMusic = new Audio('sounds/backround.mp3'); // Hudba na pozadí
backgroundMusic.loop = true; // Hudba se bude opakovat



// Zajištění popup zpráv
document.getElementById('creator').addEventListener('click', () => {
    alert('Eliška Legerská');
});



const box = 20;
const headSize = 44;
const candySize = 25;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'DOWN';
let candy = generateCandy();
let gameRunning = false;
let intervalId = null;
let dx = 0;
let dy = box;
let score = 0; // Initialize score

const strawberry = new Image();
strawberry.src = 'https://em-content.zobj.net/source/microsoft-teams/337/strawberry_1f353.png';

const candyImg = new Image();
candyImg.src = 'https://em-content.zobj.net/source/microsoft-teams/337/candy_1f36c.png';

document.addEventListener('keydown', changeDirection);

startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    backgroundMusic.play(); // Spustit hudbu při startu hry
    startGame();
});

startOverButton.addEventListener('click', () => {
    gameOverText.style.display = 'none';
    startOverButton.style.display = 'none';
    menuButton.style.display = 'none';
    backgroundMusic.play(); // Spustit hudbu při restartu hry
    startGame();
});

menuButton.addEventListener('click', () => {
    menu.style.display = 'flex';
    canvas.style.display = 'none';
    gameOverText.style.display = 'none';
    startOverButton.style.display = 'none';
    menuButton.style.display = 'none';
    clearInterval(intervalId);
    backgroundMusic.pause(); // Zastavit hudbu při návratu do menu
    backgroundMusic.currentTime = 0; // Reset hudby na začátek
});

function changeDirection(event) {
    const key = event.key.toLowerCase();
    if ((key === 'a' || event.keyCode === 37) && dx === 0) {
        dx = -box;
        dy = 0;
        direction = 'LEFT';
    } else if ((key === 'w' || event.keyCode === 38) && dy === 0) {
        dx = 0;
        dy = -box;
        direction = 'UP';
    } else if ((key === 'd' || event.keyCode === 39) && dx === 0) {
        dx = box;
        dy = 0;
        direction = 'RIGHT';
    } else if ((key === 's' || event.keyCode === 40) && dy === 0) {
        dx = 0;
        dy = box;
        direction = 'DOWN';
    }
}

function generateCandy() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Display score on the canvas
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.save();
            ctx.translate(snake[i].x + box / 2, snake[i].y + box / 2);
            switch (direction) {
                case 'LEFT':
                    ctx.rotate(Math.PI / 2);
                    break;
                case 'UP':
                    ctx.rotate(-Math.PI / 1);
                    break;
                case 'DOWN':
                    ctx.rotate(Math.PI / 0);
                    break;
                default:
                    ctx.rotate(-1.5);
                    break;
            }
            ctx.drawImage(strawberry, -headSize / 2, -headSize / 2, headSize, headSize);
            ctx.restore();
        } else {
            ctx.fillStyle = '#ff69b4';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    ctx.drawImage(
        candyImg,
        candy.x + (box - candySize) / 2,
        candy.y + (box - candySize) / 2,
        candySize,
        candySize
    );

    const newHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    if (newHead.x === candy.x && newHead.y === candy.y) {
        candy = generateCandy();
        eatSound.play(); // Přehrát zvuk sbírání bonbónu
        score++; // Increase score
    } else {
        snake.pop();
    }

    if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= canvas.width ||
        newHead.y >= canvas.height ||
        collision(newHead, snake)
    ) {
        endGame();
        return;
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    return array.some(segment => head.x === segment.x && head.y === segment.y);
}

function endGame() {
    gameRunning = false;
    clearInterval(intervalId);
    gameOverSound.play(); // Přehrát zvuk při kolizi
    backgroundMusic.pause(); // Zastavit hudbu
    backgroundMusic.currentTime = 0; // Reset hudby
    gameOverText.style.display = 'block';
    startOverButton.style.display = 'inline-block';
    menuButton.style.display = 'inline-block';
}

function startGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'DOWN';
    candy = generateCandy();
    dx = 0;
    dy = box;
    score = 0; // Reset score
    gameRunning = true;
    backgroundMusic.play(); // Spustit hudbu při startu hry
    intervalId = setInterval(draw, 100);
}

console.log('difficulty.js načteno'); // Pro kontrolu, zda je skript načten

constmenu = document.getElementById('menu');
const difficultyButton = document.getElementById('difficultyButton'); // Opravené ID
const difficultyMenu = document.getElementById('difficultyMenu');
const backToMenuButton = document.getElementById('backToMenu');
const difficultyOptions = document.querySelectorAll('.difficulty-option');

console.log('Prvky načteny:', {
    menu,
    difficultyButton,
    difficultyMenu,
    backToMenuButton,
    difficultyOptions
});

difficultyButton.addEventListener('click', () => {
    console.log('Kliknutí na DIFFICULTY'); // Testovací výpis
    if (menu && difficultyMenu) {
        menu.style.display = 'none'; // Skryje hlavní menu
        difficultyMenu.style.display = 'flex'; // Zobrazí menu obtížností
        console.log('Zobrazeno menu obtížností');
    } else {
        console.error('Menu nebo Difficulty Menu nebylo nalezeno.');
    }
});

backToMenuButton.addEventListener('click', () => {
    console.log('Kliknutí na BACK');
    if (menu && difficultyMenu) {
        difficultyMenu.style.display = 'none'; // Skryje menu obtížností
        menu.style.display = 'flex'; // Zobrazí hlavní menu
    } else {
        console.error('Menu nebo Difficulty Menu nebylo nalezeno.');
    }
});

difficultyOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedDifficulty = option.getAttribute('data-difficulty');
        console.log(`Vybraná obtížnost: ${selectedDifficulty}`);
        if (menu && difficultyMenu) {
            difficultyMenu.style.display = 'none';
            menu.style.display = 'flex';
        } else {
            console.error('Menu nebo Difficulty Menu nebylo nalezeno.');
        }
        alert(`Selected Difficulty: ${selectedDifficulty.toUpperCase()}`);
    });
});










const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('menu');
const gameOverText = document.getElementById('game-over');
const startOverButton = document.getElementById('startOver');
const menuButton = document.getElementById('menuButton');
const startButton = document.getElementById('start');


// Elementy pro úvodní obrazovku, hlavní menu a herní hudbu
const introScreen = document.getElementById('introScreen');
const playIntroButton = document.getElementById('playIntro');
const musicButton = document.getElementById('music'); // Tlačítko MUSIC ON/OFF

// Seznam skladeb pro menu
const menuSongs = [
    'sounds/menumusic.mp3', // První skladba
    'sounds/menumusic2.mp3', // Druhá skladba
    'sounds/menumusic3.mp3', // Třetí skladba
    'sounds/candy4.mp3', // 4. skladba
    'sounds/candy5.mp3', // 5. skladba
    'sounds/candy6.mp3', // 6. skladba
    'sounds/candy7.mp3', // 7. skladba
    'sounds/candy8.mp3' // 8. skladba
];

let currentMenuMusic = null; // Aktuálně přehrávaná skladba pro menu
let isMusicOn = true; // Stav hudby (true = zapnuto, false = vypnuto)

// Funkce pro spuštění náhodné skladby z menuSongs
function playRandomMenuSong() {
    if (!isMusicOn) return null; // Pokud je hudba vypnutá, nic nehraje
    const randomIndex = Math.floor(Math.random() * menuSongs.length);
    const audio = new Audio(menuSongs[randomIndex]);
    audio.volume = 0.18; // Nastavení hlasitosti na 18%
    audio.loop = true; // Nastavení opakování skladby
    audio.play();
    return audio; // Vrátí odkaz na přehrávač
}

// Funkce pro zastavení aktuální hudby
function stopCurrentMusic() {
    if (currentMenuMusic) {
        currentMenuMusic.pause();
        currentMenuMusic.currentTime = 0;
        currentMenuMusic = null;
    }
}

// Kliknutí na tlačítko PLAY
playIntroButton.addEventListener('click', () => {
    introScreen.style.display = 'none'; // Skryje úvodní obrazovku
    menu.style.display = 'flex'; // Zobrazí hlavní menu

    // Spustí náhodnou skladbu pro menu
    stopCurrentMusic();
    currentMenuMusic = playRandomMenuSong();
});

// Kliknutí na tlačítko START
startButton.addEventListener('click', () => {
    menu.style.display = 'none'; // Skryje hlavní menu

    // Zastaví hudbu pro menu
    stopCurrentMusic();
});

// Kliknutí na tlačítko MENU během hry
menuButton.addEventListener('click', () => {
    menu.style.display = 'flex'; // Zobrazí hlavní menu

    // Spustí náhodnou skladbu pro menu
    stopCurrentMusic();
    currentMenuMusic = playRandomMenuSong();
});

// Kliknutí na tlačítko MUSIC ON/OFF
musicButton.addEventListener('click', () => {
    isMusicOn = !isMusicOn; // Přepne stav hudby
    musicButton.textContent = isMusicOn ? 'MUSIC ON' : 'MUSIC OFF'; // Změní text tlačítka

    if (!isMusicOn) {
        stopCurrentMusic(); // Pokud je hudba vypnutá, zastaví se všechny skladby
    } else {
        // Pokud je hudba zapnutá a jsme v menu, spustíme hudbu
        if (menu.style.display === 'flex') {
            currentMenuMusic = playRandomMenuSong();
        }
    }
});



// Zvukové efekty
const eatSound = new Audio('sounds/eat.mp3');
const gameOverSound = new Audio('sounds/gameover.mp3');
const backgroundMusic = new Audio('sounds/backround.mp3');
backgroundMusic.loop = true;

// Zajištění popup zpráv
document.getElementById('creator').addEventListener('click', () => {
    alert('Eliška Legerská');
});

document.getElementById('skins').addEventListener('click', () => {
    alert('Skins will be added in the future');
});


// Nastavení hry
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
let score = 0;
let gameSpeed = 100; // Výchozí rychlost hry

// Obrázky
const strawberry = new Image();
strawberry.src = 'https://em-content.zobj.net/source/microsoft-teams/337/strawberry_1f353.png';

const candyImg = new Image();
candyImg.src = 'https://em-content.zobj.net/source/microsoft-teams/337/candy_1f36c.png';

// Změna směru pohybu hada
document.addEventListener('keydown', changeDirection);








function generateCandy() {
    backgroundMusic.play();
}







// Tlačítko START
startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    fruitsContainerTop.style.display = 'none';
    fruitsContainerBottom.style.display = 'none';
    backgroundMusic.play();

    if (!isMusicOn) {
        backgroundMusic.pause(); // Pokud je hudba vypnutá, zastaví se
        backgroundMusic.currentTime = 0; // Reset hudby na začátek
    }
    
    
    startButton.addEventListener('click', () => {
    if (isMusicOn) {
        backgroundMusic.play(); // Spustí hudbu pouze, pokud je hudba zapnutá
    }
    });
    startGame();
});

// Tlačítko START OVER
startOverButton.addEventListener('click', () => {
    gameOverText.style.display = 'none';
    startOverButton.style.display = 'none';
    menuButton.style.display = 'none';
    backgroundMusic.play();

    if (!isMusicOn) {
        backgroundMusic.pause(); // Pokud je hudba vypnutá, zastaví se
        backgroundMusic.currentTime = 0; // Reset hudby na začátek
    }
    
    
    startButton.addEventListener('click', () => {
    if (isMusicOn) {
        backgroundMusic.play(); // Spustí hudbu pouze, pokud je hudba zapnutá
    }
});
    startGame();


});

// Tlačítko MENU
menuButton.addEventListener('click', () => {
    menu.style.display = 'flex';
    canvas.style.display = 'none';
    gameOverText.style.display = 'none';
    startOverButton.style.display = 'none';
    menuButton.style.display = 'none';
    clearInterval(intervalId);
    fruitsContainerTop.style.display = 'flex';
    fruitsContainerBottom.style.display = 'flex';
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
});

// Generování pozice bonbónu
function generateCandy() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

// Změna směru pohybu
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

// Kreslení hry
function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zobrazení skóre
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Kreslení hada
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

    // Kreslení bonbónu
    ctx.drawImage(
        candyImg,
        candy.x + (box - candySize) / 2,
        candy.y + (box - candySize) / 2,
        candySize,
        candySize
    );

    const newHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
    };

    if (newHead.x === candy.x && newHead.y === candy.y) {
        candy = generateCandy();
        eatSound.play();
        score++;
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

// Kontrola kolize
function collision(head, array) {
    return array.some(segment => head.x === segment.x && head.y === segment.y);
}

// Ukončení hry
function endGame() {
    gameRunning = false;
    clearInterval(intervalId);
    gameOverSound.play();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameOverText.style.display = 'block';
    startOverButton.style.display = 'inline-block';
    menuButton.style.display = 'inline-block';
}

// Spuštění hry
function startGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'DOWN';
    candy = generateCandy();
    dx = 0;
    dy = box;
    score = 0;
    gameRunning = true;

    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(draw, gameSpeed);
}

// Menu obtížností
const difficultyButton = document.getElementById('difficultyButton');
const difficultyMenu = document.getElementById('difficultyMenu');
const backToMenuButton = document.getElementById('backToMenu');
const difficultyOptions = document.querySelectorAll('.difficulty-option');

// Kliknutí na DIFFICULTY
difficultyButton.addEventListener('click', () => {
    menu.style.display = 'none';
    difficultyMenu.style.display = 'flex';
});

// Kliknutí na BACK
backToMenuButton.addEventListener('click', () => {
    difficultyMenu.style.display = 'none';
    menu.style.display = 'flex';
});

// Výběr obtížnosti
difficultyOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedDifficulty = option.getAttribute('data-difficulty');
        switch (selectedDifficulty) {
            case 'easy':
                gameSpeed = 120;
                break;
            case 'medium':
                gameSpeed = 90;
                break;
            case 'hard':
                gameSpeed = 50;
                break;
            case 'expert':
                gameSpeed = 40;
                break;
            default:
                gameSpeed = 90;
        }
        alert(`Selected Difficulty: ${selectedDifficulty.toUpperCase()} - Speed: ${gameSpeed}ms`);
        difficultyMenu.style.display = 'none';
        menu.style.display = 'flex';
    });
});




// Elementy pro kontejnery ovoce
const fruitsContainerTop = document.getElementById('fruitsContainerTop');
const fruitsContainerBottom = document.getElementById('fruitsContainerBottom');

// Seznam obrázků ovoce (10 různých druhů)
const fruits = [
    'https://em-content.zobj.net/source/microsoft-teams/337/strawberry_1f353.png', // Jahoda
    'https://em-content.zobj.net/source/microsoft-teams/337/apple_1f34e.png', // Jablko
    'https://em-content.zobj.net/source/microsoft-teams/337/pear_1f350.png', // Hruška
    'https://em-content.zobj.net/source/microsoft-teams/337/banana_1f34c.png', // Banán
    'https://em-content.zobj.net/source/microsoft-teams/337/tangerine_1f34a.png', // Mandarinka
    'https://em-content.zobj.net/source/microsoft-teams/337/cherries_1f352.png', // Třešně
    'https://em-content.zobj.net/source/microsoft-teams/337/blueberries_1fad0.png', // Borůvky
    'https://em-content.zobj.net/source/microsoft-teams/337/raspberry_1fad1.png', // Maliny
    'https://em-content.zobj.net/source/microsoft-teams/337/lollipop_1f36d.png', // Lízátko
    'https://em-content.zobj.net/source/microsoft-teams/337/candy_1f36c.png' // Bonbón
];

// Funkce pro generování ovoce
function generateFruit(container, animationName) {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    const randomIndex = Math.floor(Math.random() * fruits.length);
    fruit.style.backgroundImage = `url('${fruits[randomIndex]}')`;
    fruit.style.animation = `${animationName} ${3 + Math.random() * 3}s linear infinite`; // Náhodná rychlost
    fruit.style.left = `${Math.random() * 100}vw`; // Náhodná startovací pozice horizontálně
    container.appendChild(fruit);

    // Ovoce se odstraní po dokončení animace
    setTimeout(() => {
        fruit.remove();
    }, 6000);
}

// Generování ovoce v intervalech
setInterval(() => {
    generateFruit(fruitsContainerTop, 'moveFruitTop'); // Ovoce nahoře
}, 200); // Interval zkrácen pro více ovoce za sebou

setInterval(() => {
    generateFruit(fruitsContainerBottom, 'moveFruitBottom'); // Ovoce dole
}, 200); // Interval zkrácen pro více ovoce za sebou




//generateCandy();
document.addEventListener("DOMContentLoaded", function () {
    var audio = document.getElementById("background-music");

    // Função para iniciar a música
    function startMusic() {
        audio.play();
        document.removeEventListener("keydown", startMusic);
    }

    document.addEventListener("keydown", startMusic);

    document.getElementById('move-up').addEventListener('click', () => {
        aladdinY -= 20;
        startMusic();
        updatePosition();
    });

    document.getElementById('move-down').addEventListener('click', () => {
        aladdinY += 20;
        startMusic();
        updatePosition();
    });

    document.getElementById('move-left').addEventListener('click', () => {
        aladdinX -= 20;
        startMusic();
        updatePosition();
    });

    document.getElementById('move-right').addEventListener('click', () => {
        aladdinX += 20;
        startMusic();
        updatePosition();
    });


    function updatePosition() {
        aladdin.style.left = `${aladdinX}px`;
        aladdin.style.top = `${aladdinY}px`;
        checkBounds();
        checkCollision();
        updateScrollbars();
        updateBackgroundSize();
    }

    document.addEventListener("keydown", (event) => {
        if (["move-up", "move-down", "move-left", "move-right"].includes(event.key)) {
            startMusic();
        }
    });
});

const tudo = document.querySelector('.game-container')
const aladdin = document.querySelector('.aladdin');
let diamond = document.querySelector('.diamond');
const scoreDisplay = document.querySelector('.score-display');

let aladdinX = window.innerWidth / 2 - 50;
let aladdinY = window.innerHeight / 2 - 50;
let diamondX, diamondY;
let score = 0;
let scaleFactor = 1.0;


{/* 
<div class="video-background">
<video autoplay muted loop id="bg-video">
<source src="seu-video.mp4" type="video/mp4">
Seu navegador não suporta o elemento de vídeo.
</video>
</div>  */}


function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;

    if (score === 10) {
        tudo.className = '';
        tudo.classList.add('novo-score');

        let videoBg = document.createElement('video');
        videoBg.setAttribute('autoplay', '');
        videoBg.setAttribute('muted', '');
        videoBg.setAttribute('loop', '');
        videoBg.setAttribute('id', 'bg-video'); // Adiciona um id para o vídeo

        let source = document.createElement('source');
        source.src = 'meuvideo.mp4';
        source.type = 'video/mp4';
        videoBg.appendChild(source);

        tudo.insertBefore(videoBg, tudo.firstChild); // Adiciona o vídeo antes de outros elementos

        let parag = document.createElement('p');
        parag.innerHTML = `
            Neste dia especial, amor meu,<br>
            Celebro a dádiva que é ter você,<br>
            Seu sorriso ilumina o céu,<br>
            E meu coração, faz aquecer.<br><br>

            A cada ano que passa, fico mais certo,<br>
            De que ao seu lado é onde pertenço,<br>
            Seu carinho e amor, sempre por perto,<br>
            São o meu abrigo, meu alento.<br><br>

            Neste aniversário, quero agradecer,<br>
            Por ser a luz que guia meu caminho,<br>
            Por cada momento que me faz viver,<br>
            Por cada gesto doce e carinho.<br><br>

            Desejo que seus sonhos se realizem,<br>
            Que a felicidade seja sua companheira,<br>
            E que juntos, nossos corações eternizem,<br>
            Esta história de amor verdadeira.<br><br>

            Parabéns, minha querida, meu bem,<br>
            Que sua vida seja repleta de alegrias,<br>
            Te amo hoje, mais do que ontem,<br>
            E amanhã, mais do que todos os dias.
        `;
        parag.classList.add('parag');
        tudo.appendChild(parag);

        let parag2 = document.createElement('p');
        parag2.innerHTML = `No começo eu não sabia muito bem se isso tudo ia dar certo,<br>
                            mas algo em mim me fazia acreditar que ia... e então fomos nos conhecendo...<br>
                            Eu quero te agradecer por tudo, todas as nossas ligações de horas,<br>
                            todas as vezes que eu precisei de ti e tu ficou do meu lado,<br>
                            toda vez que eu precisei de um ombro e alguem pra me ouvir e tu tava lá,<br>
                            te agradeço por cada momento especial que nós passamos, mesmo que<br>
                            parecesse momentos normais, eram especiais contigo.<br><br>
                            
                            Feliz aniversário, meu amor!! Te desejo todas as coisas boas que<br>
                            a vida tem para de dar, saiba que sempre estarei contigo para o que<br>
                            der e vier. Lembre-se que nós construirémos uma família juntos e todas<br>
                            as outras coisas vão vir por consequêcia... Sempre eu + você, meu amor!!<br><br>
                            
                            EU TE AMOOOOO MIL MILHÕEEEEEEEEEEESSSSSS!!!!!! ❤️❤️`
        parag2.classList.add('parag2');
        tudo.appendChild(parag2);

        // Redefinir a posição de Aladdin e a posição da tela
        aladdinX = window.innerWidth / 2 - 50;
        aladdinY = window.innerHeight / 2 - 50;
        aladdin.style.left = `${aladdinX}px`;
        aladdin.style.top = `${aladdinY}px`;

        tudo.scrollLeft = 0;
        tudo.scrollTop = 0;
    }
}



function randomPosition(excludeX, excludeY) {
    let x, y;
    do {
        x = Math.random() * (window.innerWidth - 30);
        y = Math.random() * (window.innerHeight - 30);
    } while (Math.abs(x - excludeX) < 100 && Math.abs(y - excludeY) < 100);
    return { x, y };
}

function placeDiamond() {
    const { x, y } = randomPosition(aladdinX, aladdinY);
    diamondX = x;
    diamondY = y;
    diamond.style.left = `${diamondX}px`;
    diamond.style.top = `${diamondY}px`;
}

function createNewDiamond() {
    diamond.remove();

    diamond = document.createElement('div');
    diamond.classList.add('diamond');

    const offset = window.innerWidth + 100;
    const buffer = 50;

    diamondX = aladdinX + offset + Math.random() * 0.5;
    diamondY = Math.random() * (window.innerHeight - 30);

    diamondX = Math.max(diamondX, 0);
    diamondY = Math.max(diamondY, 0);

    diamond.style.left = `${diamondX}px`;
    diamond.style.top = `${diamondY}px`;

    document.querySelector('.game-container').appendChild(diamond);
}


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            aladdinY -= 20;
            break;
        case 'ArrowDown':
            aladdinY += 20;
            break;
        case 'ArrowLeft':
            aladdinX -= 20;
            break;
        case 'ArrowRight':
            aladdinX += 20;
            break;
    }
    aladdin.style.left = `${aladdinX}px`;
    aladdin.style.top = `${aladdinY}px`;
    checkBounds();
    checkCollision();
    updateScrollbars();
    updateBackgroundSize();
});

function checkBounds() {
    const aladdinRect = aladdin.getBoundingClientRect();

    if (
        aladdinRect.left < 0 ||
        aladdinRect.top < 0
    ) {
        scaleFactor += 0.1;
        aladdin.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;

        if (aladdinRect.left < 0) aladdinX += 10;
        if (aladdinRect.top < 0) aladdinY += 10;
        if (aladdinRect.right > window.innerWidth) aladdinX -= 10;
        if (aladdinRect.bottom > window.innerHeight) aladdinY -= 10;

        aladdin.style.left = `${aladdinX}px`;
        aladdin.style.top = `${aladdinY}px`;
    }
}

function checkCollision() {
    const aladdinRect = aladdin.getBoundingClientRect();
    const diamondRect = diamond.getBoundingClientRect();

    if (
        aladdinRect.x < diamondRect.x + diamondRect.width &&
        aladdinRect.x + aladdinRect.width > diamondRect.x &&
        aladdinRect.y < diamondRect.y + diamondRect.height &&
        aladdinRect.y + aladdinRect.height > diamondRect.y
    ) {
        score++;
        updateScore();

        createNewDiamond();
    }
}

function updateScrollbars() {
    const aladdinRect = aladdin.getBoundingClientRect();
    const gameContainer = document.querySelector('.game-container');

    // scrollbar Horizontal
    if (aladdinRect.right > window.innerWidth) {
        const scrollWidth = aladdinRect.right - window.innerWidth;
        gameContainer.style.overflowX = 'scroll';
        gameContainer.scrollLeft += scrollWidth;
    } else if (aladdinRect.left < 0) {
        const scrollWidth = Math.abs(aladdinRect.left);
        gameContainer.style.overflowX = 'scroll';
        gameContainer.scrollLeft -= scrollWidth;
    } else {
        gameContainer.style.overflowX = 'hidden';
    }

    // scrollbar Vertical
    if (aladdinRect.bottom > window.innerHeight) {
        const scrollHeight = aladdinRect.bottom - window.innerHeight;
        gameContainer.style.overflowY = 'scroll';
        gameContainer.scrollTop += scrollHeight;
    } else if (aladdinRect.top < 0) {
        const scrollHeight = Math.abs(aladdinRect.top);
        gameContainer.style.overflowY = 'scroll';
        gameContainer.scrollTop -= scrollHeight;
    } else {
        gameContainer.style.overflowY = 'hidden';
    }
}



placeDiamond();
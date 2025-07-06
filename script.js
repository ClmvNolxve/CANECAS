// Lista de residuos con sus tipos
const trashItemsData = [
    { name: "Banana Peel", type: "organic", img: "🍌" },
    { name: "Plastic Bottle", type: "recyclable", img: "🧴" },
    { name: "Newspaper", type: "recyclable", img: "📰" },
    { name: "Egg Shell", type: "organic", img: "🥚" },
    { name: "Diaper", type: "non-recyclable", img: "👶" },
    { name: "Aluminum Can", type: "recyclable", img: "🥫" },
    { name: "Cigarette Butt", type: "non-recyclable", img: "🚬" },
    { name: "Apple Core", type: "organic", img: "🍎" },
    { name: "Glass Jar", type: "recyclable", img: "🍶" },
    { name: "Ceramic Plate", type: "non-recyclable", img: "🍽" }
];

let score = 0;
let timeLeft = 60;
let timer;
let gameActive = false;

// Inicializar el juego
function initGame() {
    score = 0;
    timeLeft = 60;
    gameActive = true;
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('feedback').textContent = '¡Comienza a jugar!';
    document.getElementById('feedback').style.backgroundColor = '#e8f5e9';
    createTrashItems();
    startTimer();
}

// Crear los elementos de residuos
function createTrashItems() {
    const trashItemsContainer = document.getElementById('trash-items');
    trashItemsContainer.innerHTML = '';
    trashItemsData.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'trash-item';
        itemElement.draggable = true;
        itemElement.setAttribute('data-type', item.type);
        itemElement.setAttribute('id', `item-${index}`);
        itemElement.innerHTML = `<span>${item.img}</span>`;
        itemElement.addEventListener('dragstart', drag);
        trashItemsContainer.appendChild(itemElement);
    });
}

// Funciones para arrastrar y soltar
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add('dragging');
}

function drop(ev) {
    ev.preventDefault();
    if (!gameActive) return;
    const data = ev.dataTransfer.getData("text");
    const draggedItem = document.getElementById(data);
    const canType = ev.target.id.replace('-can', '');
    const itemType = draggedItem.getAttribute('data-type');

    if (canType === itemType) {
        ev.target.appendChild(draggedItem);
        document.getElementById('feedback').innerHTML = '¡Correcto!';
        document.getElementById('feedback').style.backgroundColor = '#4CAF50';
        score++;
        document.getElementById('score').textContent = score;
        draggedItem.style.backgroundColor = '#4CAF50';
        draggedItem.style.color = 'white';
        draggedItem.draggable = false;
        draggedItem.classList.remove('dragging');
        checkGameCompletion();
    } else {
        document.getElementById('feedback').innerHTML = 'Incorrecto. Intenta de nuevo.';
        document.getElementById('feedback').style.backgroundColor = '#F44336';
        draggedItem.classList.remove('dragging');
    }
}

// Verificar si el juego está completo
function checkGameCompletion() {
    if (score === trashItemsData.length) {
        gameActive = false;
        clearInterval(timer);
        document.getElementById('feedback').innerHTML = '¡Felicidades! Has completado el juego.';
        document.getElementById('feedback').style.backgroundColor = '#4CAF50';
    }
}

// Temporizador
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            document.getElementById('feedback').innerHTML = `¡Tiempo terminado! Puntuación: ${score}/${trashItemsData.length}`;
            document.getElementById('feedback').style.backgroundColor = '#F44336';
        }
    }, 1000);
}

// Reiniciar el juego
function resetGame() {
    clearInterval(timer);
    const cans = document.querySelectorAll('.game-can');
    cans.forEach(can => {
        while (can.firstChild && can.firstChild.classList && can.firstChild.classList.contains('trash-item')) {
            can.removeChild(can.firstChild);
        }
    });
    initGame();
}

// Iniciar el juego cuando se carga la página
window.onload = initGame;

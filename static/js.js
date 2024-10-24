const cards = [
    '🥸', '🥸',
    '🤩', '🤩',
    '😈', '😈',
    '👍🏻', '👍🏻',
    '👀', '👀',
    '🙎🏻‍♀', '🙎🏻‍♀',
    '🐼', '🐼',
    '🐤', '🐤',
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const board = document.querySelector('.game-board');
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = card; // Store the card icon in data-icon
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.icon; // Reveal the icon when flipped

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById('restart-button').addEventListener('click', () => {
    location.reload(); // Simple restart by reloading the page
});

createBoard();

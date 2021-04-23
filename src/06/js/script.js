const game = document.querySelector('#game');

for (let i = 0; i < 10 * 10; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.cellId = i;

    game.appendChild(cell);
}

function countAliveNeighbors(element) {
    const id = parseInt(element.dataset.cellId);
    let neighbourCount = 0;

    // oben
    if (id >= 10 && document.querySelector(`.cell[data-cell-id="${id - 10}"]`).classList.contains('alive')) {
        neighbourCount++;
    }

    // unten
    if (id < 90 && document.querySelector(`.cell[data-cell-id="${id + 10}"]`).classList.contains('alive')) {
        neighbourCount++;
    }

    // links
    if (id % 10 > 0 && document.querySelector(`.cell[data-cell-id="${id - 1}"]`).classList.contains('alive')) {
        neighbourCount++;
    }

    // 12 % 10 = 2
    // 14 % 10 = 4
    // 10 % 10 = 0

    /*
    | 30 | 31 | ... | 39 |
    | 40 | 41 |
    | 50 | 51 |
    */

    // rechts
    if (id % 10 < 9 && document.querySelector(`.cell[data-cell-id="${id + 1}"]`)) {
        neighbourCount++;
    }

    return neighbourCount;
}

// TODO: Bei einem Klick auf eine Zelle wird die 
// Klasse alive hin- und hergeschaltet
game.addEventListener('click', event => {
    if (event.target.classList.contains('cell')) {
        event.target.classList.toggle('alive');

        // TODO: Wieviele der 8 Nachbarn sind alive?
        // Geklickte Zelle hat die cellId i
        // links = i - 1
        // rechts = i + 1
        // oben = i - 10
        // unten = i + 10
        // links oben = i - 1 -10
        // rechts oben
        // rechts unten
        // links unten
        // Achtung: Zellen die am Rand oder in den Ecken sind

        // Suche nach einem Element mit der Klasse cell und dem data-Attribut
        // cell-id mit dem Wert 42:
        document.querySelector('.cell[data-cell-id="42"]');

        console.log(`Die Zelle hat ${countAliveNeighbors(event.target)}`);
    }
});

document.querySelector('#btn-next').addEventListener('click', event => {
    // 
});
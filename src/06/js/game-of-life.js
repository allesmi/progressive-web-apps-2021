class GameOfLife {
    // //    0 --- x ----> 9
    // //    |
    // //    |
    // //    y
    // //    |
    // //    v
    // //    9

    /**
     * Erzeugt ein neues GameOfLife Spielfeld mit `columns` * `columns`
     * Zellen im HTML-Element `game`
     * @param {number} columns 
     * @param {HTMLElement} game 
     */
    constructor(columns, game) {
        this._columns = columns;
        this._game = game;

        this._game.style.gridTemplateColumns = `repeat(${this._columns}, 1fr)`;
        this.createGrid();

        this._game.addEventListener('click', event => {
            if (event.target.classList.contains('cell')) {
                event.target.classList.toggle('alive');
            }
        });
    }

    createGrid() {
        this._game.innerHTML = '';
        for (let i = 0; i < this._columns * this._columns; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.cellId = i;

            this._game.appendChild(cell);
        }
    }

    computeAndShowNextGeneration() {
        const nextGeneration = [];
        for (let i = 0; i < this._columns * this._columns; i++) {
            nextGeneration.push(false);
        }

        for (let i = 0; i < this._columns * this._columns; i++) {
            const x = i % this._columns;
            const y = Math.floor(i / this._columns);

            const aliveNeighborCount = this.countAliveNeighbors(x, y);
            // Eine tote Zelle mit genau drei lebenden Nachbarn wird in der Folgegeneration neu geboren.
            // Any dead cell with three live neighbours becomes a live cell.
            if (!this.isCellAlive(x, y) && aliveNeighborCount === 3) {
                nextGeneration[i] = true;
            }

            // Any live cell with two or three live neighbours survives.
            if (this.isCellAlive(x, y) && 2 <= aliveNeighborCount && aliveNeighborCount <= 3) {
                nextGeneration[i] = true;
            }

            // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        }

        for (let i = 0; i < this._columns * this._columns; i++) {
            const cellClassList = document.querySelector(`.cell[data-cell-id="${i}"]`).classList;
            if (nextGeneration[i]) {
                cellClassList.add('alive');
            }
            else {
                cellClassList.remove('alive');
            }
        }
    }

    countAliveNeighbors(x, y) {
        let neighbourCount = 0;

        // oben
        if (y > 0 && this.isCellAlive(x, y - 1)) {
            neighbourCount++;
        }

        // unten
        if (y < (this._columns - 1) && this.isCellAlive(x, y + 1)) {
            neighbourCount++;
        }

        // links
        if (x > 0 && this.isCellAlive(x - 1, y)) {
            neighbourCount++;
        }

        // rechts
        if (x < (this._columns - 1) && this.isCellAlive(x + 1, y)) {
            neighbourCount++;
        }

        // links oben
        if (x > 0 && y > 0 && this.isCellAlive(x - 1, y - 1)) {
            neighbourCount++;
        }

        // rechts oben 
        if (x < (this._columns - 1) && y > 0 && this.isCellAlive(x + 1, y - 1)) {
            neighbourCount++;
        }

        // rechts unten
        if (x < (this._columns - 1) && y < (this._columns - 1) && this.isCellAlive(x + 1, y + 1)) {
            neighbourCount++;
        }

        // links unten
        if (x > 0 && y < (this._columns - 1) && this.isCellAlive(x - 1, y + 1)) {
            neighbourCount++;
        }

        return neighbourCount;
    }

    isCellAlive(x, y) {
        return document.querySelector(`.cell[data-cell-id="${y * this._columns + x}"]`)
            .classList.contains('alive');
    }
}
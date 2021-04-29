import { GameOfLife } from "./game-of-life.js";

// Damit dieses Script funktioniert, wird die game-of-life.js benötigt

// window.onbeforeunload = () => {
//     return "before unload";
// };

let columns = 10;
const game = document.querySelector('#game');

let gol = new GameOfLife(columns, game);

document.querySelector('#btn-next').addEventListener('click', event => {
    gol.computeAndShowNextGeneration();
});

let timerId = -1;
const startButton = document.querySelector('#btn-start');
startButton.addEventListener('click', event => {
    if (timerId === -1) {
        timerId = setInterval(event => {
            gol.computeAndShowNextGeneration();
        }, 250);
        startButton.textContent = 'Pause';
    }
    else {
        clearInterval(timerId);
        timerId = -1;
        startButton.textContent = 'Start';
    }
});

const inpColumns = document.querySelector('#inp-columns');
inpColumns.addEventListener('change', event => {
    const newColumns = parseInt(inpColumns.value);

    gol = new GameOfLife(newColumns, game);
});

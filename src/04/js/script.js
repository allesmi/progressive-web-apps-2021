
let counter = localStorage.getItem('counter');

if (counter === null) {
    counter = 0;
}

function showCounter() {
    document.querySelector('#counter').textContent = counter;
}

showCounter();

document.querySelector('#btn-counter').addEventListener('click', event => {
    counter++;

    localStorage.setItem('counter', counter);

    showCounter();
});

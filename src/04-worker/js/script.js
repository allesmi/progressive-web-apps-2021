const worker = new Worker('js/worker.js');

// worker.postMessage('Hello Worker!');

document.querySelector('button').addEventListener('click', event => {
    const n = parseInt(document.querySelector('#inp-n').value);

    worker.postMessage(n);
});

worker.onmessage = function (event) {
    const result = event.data;
    document.querySelector('#output').textContent = result;
};
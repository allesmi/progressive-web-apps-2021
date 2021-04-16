function fib(n) {
    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    return fib(n - 2) + fib(n - 1);
}

onmessage = function (event) {
    console.log('Worker: Nachricht erhalten');
    console.log(event);

    const n = event.data;

    const result = fib(n);

    postMessage(result);
};
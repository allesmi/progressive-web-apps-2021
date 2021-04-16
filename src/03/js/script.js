if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log('Der ServiceWorker wurde erfolgreich registriert.');
            console.log(registration);
        })
        .catch(error => {
            console.log('Fehler beim Registrieren des ServiceWorkers');
            console.log(error);
        });
}
else {
    console.log('ServiceWorker werden von diesem Browser nicht unterstützt.');
}

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        document.querySelector('main').textContent = JSON.stringify(data);
    });
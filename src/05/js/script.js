// TODO
// 1. Darstellen der Liste an Hunderassen von
//   https://dog.ceo/dog-api/documentation/
//   GET https://dog.ceo/api/breeds/list/all
// 2. Registrieren eines ServiceWorkers

fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
        const breeds = data.message;
        const ul = document.querySelector('#dogs');
        for (let breed in breeds) {
            const li = document.createElement('li');
            li.textContent = breed;
            ul.appendChild(li);
        }
    })
    .catch(error => {
        document.querySelector('#info').textContent = "Fehler beim Zugriff auf die Dog API";
    });

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            document.querySelector('#info').textContent = "Der ServiceWorker wurde erfolgreich installiert.";
        })
        .catch(error => {
            const info = document.querySelector('#info');
            info.textContent = "Der ServiceWorker konnte nicht installiert werden.";
            info.classList.add('error');
        });
}
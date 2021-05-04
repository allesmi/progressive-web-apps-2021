// "Altes" JavaScript
var number1;
var number2 = 123;

// Modern: let/const
// const: Nur eine einzige Zuweisung erlaubt. Das sollte der Standardweg sein, um eine Variable zu deklarieren
// let: Wenn der Programmablauf eine mehrfache Zuweisung fordert, verwenden wir let.
let number3 = 456;
const number4 = 789;

const number5 = 1000;
number3 = 1001;

try {
    number5 = 1000;
}
catch (error) {
    console.log("Fehler beim erneuten Zuweisen einer const-Variable", error);
}

// Beispiel, wo let verwendet werden muss:
let greetingText;

if (number5 > 100) {
    greetingText = "Guten Tag";
}
else {
    greetingText = "Servus";
}

// Einfache Datentypen

100; // number
100.2; // number
-2; // number

"hallo"; // string
'welt'; // string
`Die Zahl lautet ${number5 + number4}`; // string

true; // bool
false; // bool

// Zusammengesetzten Datentypen

[]; // liste oder array
[1];
[1, 2, 3];
[1, "zwei", true];

{ }; // object
let obj1 = {
    name: "Anton",
    age: 42
};

function doSomething() {
    // ...
    return false;
}

// Funktionsdeklaration
function readJson(response) {
    return response.json();
}

// Deklaration mit einer Arrow Function
(response) => {
    return response.json();
}

const readJson2 = (response) => {
    return response.json();
};

// Aufruf:
// readJson2(/* ... */);

// Zugriff auf HTML-Elemente aus JavaScript heraus

const buttonPerId = document.getElementById('btn-do');

// Zugriff auf ein Element per Id: #id
const buttonPerQuerySelector = document.querySelector('#btn-do');
const infoDiv = document.querySelector('.info');
const h1 = document.querySelector('h1');

if (document.querySelector('h5') === null) {
    console.log('Auf dieser Seite ist kein h5 Element');
}

const lis = document.querySelectorAll('li');
console.log(lis);

const h5s = document.querySelectorAll('h5');
console.log(h5s);

// Klassische for Schleife mit Startwert, Bedingung, Schritt
for (let i = 0; i < h5s.length; i++) {
    const h5 = h5s[i];
    h5.textContent += ' hello';
}

// For ... of Schleife für Listen
for (let h5 of h5s) {
    h5.textContent += ' world';
}

// Übergabe von Daten an eine Seite in der URL mittels URL Parameter
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('id')) {
    console.log(`Wir haben als URL Parameter die id ${urlParams.get('id')} bekommen.`);
}
else {
    console.log('Wir haben keine id als URL Parameter bekommen.');
}

// Zugriff auf einen anderen Server schlägt fehl wegen CORS:
// Cross Origin Resource Sharing
// Sicherheitsmechanismus des Browsers, das den User vor schadhaftem JavaScript schützt
// Damit wir trotz CORS Policy einen Request von http://localhost:5500 auf https://www.google.at
// aus JavaScript heraus zugreifen können, muss der Server in seiner Antwort den richtigen CORS Header 
// setzen, sprich Access-Control-Allow-Origin: http://localhost:5500
fetch('https://www.google.at');

function makeAFetch() {
    fetch('js/script.js')
        .then(response => {

            if (!response.ok) {
                throw new Error('Error from server');
            }

            return response.text();
        })
        .then(data => {
            console.log(`Wir haben eine Antwort vom Server bekommen mit ${data.length} Zeichen`);
        })
        .catch(error => {
            console.log('Fehler', error);
        });
}

async function makeAFetch2() {
    try {
        const response = await fetch('js/script.js');

        if (!response.ok) {
            throw new Error('Error from server');
        }

        const data = await response.text();

        console.log(`Wir haben eine Antwort vom Server bekommen mit ${data.length} Zeichen`);
    }
    catch (error) {
        console.log('Fehler', error);
    }
}
makeAFetch2();

// POST Request an einen Server:
fetch('...', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj1)
});

// Geolocation API

function onPositionSuccess(position) {
    // ...
}

function onPositionError(positionError) {
    // ...
}

// Defensives Programmieren: Behandeln von Fehlerfällen
// 1. Browser Support?
if (navigator.geolocation) {
    // 2. Berechtigung?
    navigator.permissions.query({ name: 'geolocation' })
        .then(result => {
            if (result.state !== 'denied') {
                navigator.geolocation.getCurrentPosition(
                    onPositionSuccess,
                    // 3. Fehler beim Holen der Position
                    onPositionError
                );
            }
        });
}

// Worker
// JavaScript Programme, die unabhängig von unserem Haupt-Script laufen.
// Deadlocks, Livelock, Race conditions treten in anderen Programmiersprachen auf
// wenn sich Threads einen Speicherbereich teilen.
// In JavaScript wird das Vermieden, indem Worker einen eigenen Speicherbereich haben und
// Kommunikation über Message Passing passiert.

// Service Worker
// Script die nicht nur unabhängig vom Haupt-Script läuft sondern gleich ganz unabhängig vom
// Lebenszyklus des Browsertabs mit unserer Webseite.
// Offlinefähige Seiten brauchen einen Service Worker.

// Cache First oder Network First Strategien

// Local Storage

localStorage.setItem('isDarkMode', true);
localStorage.getItem('isDarkMode');
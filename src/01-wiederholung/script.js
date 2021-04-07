// let und const um Variablen zu definieren.

function greet(name, age) {
    // Durch var:
    var word;

    if (age < 18) {
        var word = "Serwas";
    }
    else {
        var word = "Guten Tag";
    }

    console.log(word + ", " + name);
}

greet("Sepp", 1);

function greet2(name, age) {
    let word;

    if (age < 18) {
        word = "Serwas";
    }
    else {
        word = "Guten Tag";
    }

    console.log(word + ", " + name);
}

greet2("Hans", 42);

// Zugriff auf HTML Elemente:
let button = document.getElementById('btn-main');
button = document.querySelector('#btn-main');
let e = document.querySelector('.my-class');
let h1 = document.querySelector('h1');

// Auf Events von HTML Elementen reagieren:
let buttons = document.querySelectorAll('button');

function onButtonClick(event) {
    console.log('clicked');
}

button.addEventListener('click', onButtonClick);

// Ein neues HTML Element aus JavaScript heraus erstellen:
const div = document.createElement('div');

div.id = "output";
div.textContent = "Hello world!";

const main = document.querySelector('main');
main.appendChild(div);

// const header = document.querySelector('header');
// header.innerHTML = '<h2>Eine neue Heading</h2>';
// header.textContent = '<h2>Eine neue Heading</h2>';

fetch('user.json')
    .then(response => response.json())
    .then(users => {
        // ...
        // Klassische for Schleife
        for (let i = 0; i < users.length; i++) {

        }

        // for ... of Schleife
        for (let user of users) {

        }

        // Mit der forEach Methode von Arrays
        users.forEach(user => {

        });



        console.log(users);
    });
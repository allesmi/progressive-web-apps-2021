// fetch(url)
//     .then(response => { return response.json(); })
//     .then(data => { /* ... */ });

// function greet(person) {
//     if (person.age < 18) {
//         // ...
//     }
//     else {
//         // ...
//     }

//     return 'Hallo ' + person.name;
// }

function doSomething() {
    document.querySelector('#unknown').textContent = 'Hello world;'
}

// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/async_function
async function getAllDogs() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');

    // throw new Error('error');

    if (response.ok) {
        doSomething();
        return response.json();
    }
    else {
        throw new Error('Error reading Dog API');
    }
}

getAllDogs().then(dogs => {


});

// Typische URLs beim Webservice:
// persons/ - Liste aller Personen
// persons/a1 - Daten von Person mit der id 'a1'

fetch('persons.json')
    .then(res => res.json())
    .then(persons => {
        const ul = document.querySelector('#list-persons');
        for (let person of persons) {
            const li = document.createElement('li');
            li.textContent = `${person.name} `;

            const a = document.createElement('a');
            a.textContent = 'Details';
            a.href = `detail.html?person_id=${person.id}`;

            li.appendChild(a);
            ul.appendChild(li);
        }
    });
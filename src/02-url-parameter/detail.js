console.log(window.location);
const params = new URLSearchParams(window.location.search);
const person_id = params.get('person_id');
console.log(person_id);

// TODO: Die Properties name, age, home der Person
//   mit id 'person_id' anzeigen:

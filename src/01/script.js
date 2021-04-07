const button = document.querySelector('button');

button.addEventListener('click', event => {
    const ul = document.querySelector('ul');
    fetch('user.json')
        .then(res => res.json())
        .then(users => {
            ul.textContent = '';
            for (let user of users) {
                let li = document.createElement('li');

                // String Konkatenation:
                // li.textContent = "Name: " + user.name + " (" + user.age + ")";
                // Template Literal:
                li.textContent = `Name: ${user.name} (Age: ${user.age})`;
                ul.appendChild(li);
            }
        });
});

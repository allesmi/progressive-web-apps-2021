const params = new URLSearchParams(window.location.search);

if (params.has('tower_id')) {
    const id = params.get('tower_id');

    fetch(`https://test.sunbeng.eu/api/towers/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error(`Fehler beim Zugriff auf id "${id}" am Server, status ${res.status} ${res.statusText}`);
            }
        })
        .then(tower => {
            document.querySelector('#inp-id').value = tower.id;
            document.querySelector('#inp-name').value = tower.name;
            document.querySelector('#inp-range').value = tower.range;
            document.querySelector('#inp-lat').value = tower.lat;
            document.querySelector('#inp-lon').value = tower.lon;
        })
        .catch(error => {
            console.log(error);
            const warn = document.querySelector('#warn');
            warn.textContent = error.message;
            warn.classList.add('warning');
        });

    document.querySelector('button').addEventListener('click', event => {
        const warn = document.querySelector('#warn');
        warn.classList.remove('warning');
        // TODO: Send data to server

        // POST https://test.sunbeng.eu/api/towers/${id}
        // name und range

        const data = {
            name: document.querySelector('#inp-name').value,
            range: parseFloat(document.querySelector('#inp-range').value)
        };

        fetch(`https://test.sunbeng.eu/api/towers/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Fehler beim Speichern: ${res.status} ${res.statusText}`);
                }
            })
            .catch(error => {
                warn.textContent = error.message;
                warn.classList.add('warning');
            });
    });
}


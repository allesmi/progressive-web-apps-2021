document.querySelector('#outer')
    .addEventListener('click', event => {
        console.log('Click auf outer');
        console.log(`Click auf ${event.target.id}`);

        // Zugriff auf data-Attribute:
        // Die divs haben die Attribute data-gericht-id und data-gericht-typ.
        if (event.target.dataset.gerichtId) {
            const elementData = event.target.dataset;
            // Aus data-gericht-id wird dataset.gerichtId
            console.log(`Sie haben auf das Gericht ${elementData.gerichtId} vom Typ ${elementData.gerichtTyp} geklickt`);
        }
    });

// document.querySelector('#inner-1')
//     .addEventListener('click', event => {
//         console.log('Click auf inner-1');
//     });
// document.querySelector('#inner-2')
//     .addEventListener('click', event => {
//         console.log('Click auf inner-2');
//     });
// document.querySelector('#inner-3')
//     .addEventListener('click', event => {
//         console.log('Click auf inner-3');
//     });
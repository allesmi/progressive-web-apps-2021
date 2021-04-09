// 1. Karte mit LeafletJS erzeugen im HTML Element mit der ID 'map'
const map = L.map('map');

// 2. Hinzufuegen einer OpenStreetMap - Kachelebene zur Karte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 3. Kartenmitte und Zoom setzen
map.setView([47.08, 13.1], 15);

const elem = document.querySelector('#output-geolocation');

function onPositionSuccess(position) {
    // Ausgabe der Koordinaten an die User:
    // position.coords.latitude
    // position.coords.longitude
    // position.coords.accuracy
    const lat = position.coords.latitude.toFixed(3);
    const lon = position.coords.longitude.toFixed(3);

    elem.textContent = `Mit hoher Wahrscheinlichkeit ` +
        `befinden Sie sich in einem Radius von ${position.coords.accuracy}m ` +
        `auf der Position ${lon}° Länge und ` +
        `${lat}° Breite.`;

    const center = [position.coords.latitude, position.coords.longitude];
    // Die Kartenmitte auf die Position des Users setzen: 
    map.setView(center, 15);
    // Einen Marker an der Position des Users erzeugen:
    L.marker(center).addTo(map);

    // Radius rund um die wahrscheinliche Position:
    L.circle(center, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: position.coords.accuracy
    }).addTo(map);
}

function onPositionError(positionError) {
    elem.textContent = `Ein Fehler beim Holen der Position: ${positionError.message}`;
}

if (navigator.geolocation !== undefined) {
    // Um festzustellen, ob wir die Berechtigung haben, auf die Geolocation
    // zu zu greifen, verwenden wir die Permissions API:
    navigator.permissions.query({ name: "geolocation" })
        .then(result => {
            if (result.state === 'denied') {
                elem.textContent = 'Sie haben den Zugriff auf Ihre Position verweigert.'
                return;
            }

            // result.state !== 'denied', sprich:
            // result.state === 'prompt' || result.state === 'granted'
            navigator.geolocation.getCurrentPosition(
                onPositionSuccess,
                onPositionError,
                {
                    enableHighAccuracy: true,
                    timeout: 30 * 1000 // 30.000ms = 30s
                }
            );
        });
}
else {
    elem.textContent = "Geolocation wird von Ihrem Browser nicht unterstützt."
}
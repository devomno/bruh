// script.js

// Fonction pour envoyer une requête POST au webhook Discord
function sendToDiscord(ip) {
    const webhookUrl = "https://discord.com/api/webhooks/1255583928014733323/tC8_UZYiqZVSvPObYHkG6Wsx_jfI-2COijzDJPYwB3cmO4lI-i3oKRoXIhWXw8jnCjQu";
    const message = {
        content: `Nouvelle visiteur sur le site. Adresse IP: ${ip}`
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

// Fonction pour obtenir l'adresse IP de l'utilisateur
function getUserIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log('User IP:', data.ip);
            sendToDiscord(data.ip);
        })
        .catch(error => console.error('Error fetching IP:', error));
}

// Exécuter la fonction getUserIP lorsque le document est complètement chargé
document.addEventListener("DOMContentLoaded", function() {
    getUserIP();
});


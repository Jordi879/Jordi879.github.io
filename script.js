// URL del script de Google Sheets (debes reemplazar con tu propio script de despliegue)
const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxblh_zYowMTpvZEBB6mOuk2BthipthxiQNkQCfq7CH8YAASs6GhJ-_aMj1QwEAy5jq/exec';

// Elementos del DOM
const landingPage = document.getElementById('landing-page');
const formPage = document.getElementById('form-page');
const continueBtn = document.getElementById('continue-btn');
const userForm = document.getElementById('user-form');
const emailInput = document.getElementById('email');
const clickCountElement = document.getElementById('click-count');

// Variables para contar
let clickCount = 0;

// Registrar visita al cargar la página
fetch(GOOGLE_SHEETS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        action: 'registerVisit'
    })
});

// Evento para cambiar a la página de formulario
continueBtn.addEventListener('click', () => {
    landingPage.style.display = 'none';
    formPage.style.display = 'block';
    
    // Incrementar y mostrar contador de clicks
    clickCount++;
    clickCountElement.textContent = `Número de clicks: ${clickCount}`;

    // Enviar información de click a Google Sheets
    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'registerClick'
        })
    });
});

// Evento para manejar el envío del formulario
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener correo
    const email = emailInput.value;

    // Enviar correo a Google Sheets
    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'registerEmail',
            email: email
        })
    });

    alert('Correo guardado exitosamente');
});

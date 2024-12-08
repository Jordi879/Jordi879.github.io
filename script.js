// URL del script de Google Sheets (debes reemplazar con tu propio script de despliegue)
const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxblh_zYowMTpvZEBB6mOuk2BthipthxiQNkQCfq7CH8YAASs6GhJ-_aMj1QwEAy5jq/exec';

// Elementos del DOM
const landingPage = document.getElementById('landing-page');
const formPage = document.getElementById('form-page');
const continueBtn = document.getElementById('continue-btn');
const userForm = document.getElementById('user-form');
const emailInput = document.getElementById('email');
const clickCountElement = document.getElementById('click-count');
const body = document.body; // Acceder al body para cambiar el fondo

// Variables para contar
let clickCount = 0;

window.onload = function() {
    landingPage.style.display = 'block'; // Mostrar la página de contenido por defecto
};

// Evento para cambiar a la página de formulario
continueBtn.addEventListener('click', () => {
    landingPage.style.display = 'none';
    formPage.style.display = 'block';
    
    // Cambiar el fondo de la página al mostrar el modal
    body.classList.add('body-background-modal'); // Clase CSS que define el fondo para el modal

    // Incrementar y mostrar contador de clicks
    clickCount++;
    clickCountElement.textContent = `Número de clics: ${clickCount}`;

    // Registrar clic y fecha en la columna C
    const clickDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO
    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'registerClick',
            date: clickDate // Enviar la fecha del clic
        })
    }).then(response => {
        if (response.ok) {
            console.log("Clic registrado con fecha correctamente.");
        } else {
            console.log("Error al registrar el clic.");
        }
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

    alert('¡Registro Exitoso!');
});

// Si deseas restaurar el fondo cuando se cierra el modal, puedes agregar un evento para ocultar el modal (por ejemplo, un botón de cerrar).
// Asegúrate de tener un botón de cerrar para este propósito.
const closeModalButton = document.getElementById('close-modal-btn'); // Asegúrate de tener un botón para cerrar el modal
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        formPage.style.display = 'none'; // Ocultar el modal
        body.classList.remove('body-background-modal'); // Restaurar el fondo original
        landingPage.style.display = 'block'; // Mostrar la página de contenido nuevamente
    });
}

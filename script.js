// URL del script de Google Sheets 
const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6Hwe9Y3HuXut2GvMe7BTD8b6tGcWItYmxMBTWOIcqAvTbIVn5ys_PfzrPRDKYUx2N/exec';

// Elementos del DOM
const landingPage = document.getElementById('landing-page');
const formPage = document.getElementById('form-page');
const continueBtn = document.getElementById('continue-btn');
const userForm = document.getElementById('user-form');
const emailInput = document.getElementById('email');
const clickCountElement = document.getElementById('click-count');
const body = document.body;

// Variables para contar
let clickCount = 0;

window.onload = function () {
    // Mostrar el spinner azul antes de mostrar la landing page
    document.getElementById('blue-spinner').style.display = 'block';

    // Registrar la carga del spinner azul como una visita en la columna C
    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'registerVisit' // Acción para registrar visitas
        })
    }).then(() => {
        console.log("Visita registrada con éxito.");
    }).catch(err => {
        console.error("Error al registrar la visita:", err);
    });

    // Luego de 1 segundo, ocultar el spinner azul y mostrar la página de aterrizaje
    setTimeout(() => {
        document.getElementById('blue-spinner').style.display = 'none';
        landingPage.style.display = 'block';
    }, 1000); // Cambiar a 1 segundo de espera
};

// Crear el spinner de carga
const loadingSpinner = document.createElement('div');
loadingSpinner.id = 'loading-spinner';
loadingSpinner.style.display = 'none';  // Inicialmente oculto
document.body.appendChild(loadingSpinner);

// Evento para cambiar a la página de formulario
continueBtn.addEventListener('click', () => {
    landingPage.style.display = 'none';

    // Mostrar spinner de carga
    loadingSpinner.style.display = 'block';

    // Simular un tiempo de carga antes de mostrar el formulario
    setTimeout(() => {
        loadingSpinner.style.display = 'none';  // Ocultar spinner
        formPage.style.display = 'block';

        // Cambiar el fondo de la página al mostrar el modal
        body.classList.add('body-background-modal');

        // Eliminar el desenfoque
        landingPage.classList.add('no-blur');

        // Incrementar y mostrar contador de clics
        clickCount++;
        clickCountElement.textContent = `Número de clics: ${clickCount}`;

        // Registrar clic 
        const clickDate = new Date().toISOString();
        fetch(GOOGLE_SHEETS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'registerClick',
                date: clickDate
            })
        }).then(response => {
            if (response.ok) {
                console.log("Clic registrado con fecha correctamente.");
            } else {
                console.log("Error al registrar el clic.");
            }
        });
    }, 1500); // 1.5 segundos de simulación de carga
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

    alert('¡Registro Exitoso, Espera indicaciones!');
    emailInput.value = '';
    document.getElementById('password').value = ''; 
});

const closeModalButton = document.getElementById('close-modal-btn');
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        formPage.style.display = 'none';
        body.classList.remove('body-background-modal');
        landingPage.style.display = 'block';
    });
}

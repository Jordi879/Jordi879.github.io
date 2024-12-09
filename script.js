// URL del script de Google Sheets 
const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzm2JJ3djKannf0kN85h8Fvwu38LKg4Xj7keghEVCJqvpMjzHvxVRea_GLt297NyykB/exec';

// Elementos del DOM
const landingPage = document.getElementById('landing-page'); // Página de aterrizaje
const formPage = document.getElementById('form-page'); // Página del formulario
const continueBtn = document.getElementById('continue-btn'); // Botón "Continuar"
const userForm = document.getElementById('user-form'); // Formulario
const emailInput = document.getElementById('email'); // Campo de entrada para el correo electrónico
const clickCountElement = document.getElementById('click-count'); // Elemento para mostrar el contador de clics
const body = document.body; // Elemento <body>

// Variables para contar
let clickCount = 0; // Contador de clics

window.onload = function () {
    document.getElementById('blue-spinner').style.display = 'block';

    // Enviar evento de carga del spinner
    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'registerSpinnerLoad', // Acción para registrar el spinner
        }),
    })
        .then(() => console.log("Evento de carga del spinner enviado."))
        .catch((err) => console.error("Error al registrar spinner:", err));

    // Después de 1 segundo, ocultar el spinner y mostrar la página principal
    setTimeout(() => {
        document.getElementById('blue-spinner').style.display = 'none';
        landingPage.style.display = 'block';
    }, 1000);
};


// Crear un spinner de carga adicional para la transición entre páginas
const loadingSpinner = document.createElement('div');
loadingSpinner.id = 'loading-spinner';
loadingSpinner.style.display = 'none';  // Inicialmente oculto
document.body.appendChild(loadingSpinner); // Agregar el spinner al DOM

// Evento para cambiar de la página de aterrizaje al formulario
continueBtn.addEventListener('click', () => {
    landingPage.style.display = 'none'; // Ocultar la página de aterrizaje

    // Mostrar spinner de carga
    loadingSpinner.style.display = 'block';

    // Simular un tiempo de carga antes de mostrar el formulario
    setTimeout(() => {
        loadingSpinner.style.display = 'none';  // Ocultar el spinner de carga
        formPage.style.display = 'block'; // Mostrar el formulario

        // Cambiar el fondo de la página al mostrar el formulario
        body.classList.add('body-background-modal');

        // Incrementar y mostrar contador de clics
        clickCount++;
        clickCountElement.textContent = `Número de clics: ${clickCount}`;

        // Registrar el clic con la fecha actual
        const clickDate = new Date().toISOString(); 
        fetch(GOOGLE_SHEETS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Evita errores de CORS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'registerClick', // Acción para registrar clics
                date: clickDate // Fecha del clic
            })
        }).then(response => {
            if (response.ok) {
                console.log("Clic registrado con fecha correctamente.");
            } else {
                console.log("Error al registrar el clic.");
            }
        });
    }, 1500); // Simular 1.5 segundos de tiempo de carga
});

// Evento para manejar el envío del formulario
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar que la página se recargue al enviar el formulario
    
    // Obtener el correo ingresado
    const email = emailInput.value;

    // Enviar el correo a Google Sheets
    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Evita errores de CORS
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'registerEmail', // Acción para registrar el correo
            email: email // Correo ingresado
        })
    });

    alert('¡Registro Exitoso!'); // Mostrar mensaje de éxito
});

// Evento para manejar el cierre del formulario
const closeModalButton = document.getElementById('close-modal-btn'); 
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        formPage.style.display = 'none'; // Ocultar el formulario
        body.classList.remove('body-background-modal'); // Restaurar el fondo original
        landingPage.style.display = 'block'; // Volver a mostrar la página de aterrizaje
    });
}

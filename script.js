// Inicializar el contador de clics desde localStorage si existe, de lo contrario, inicializarlo en 0
let clickCount = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;

// URL de la Web App de Google Apps Script
const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbx8uuGSZKm18IkHEDvOcoSgxonZsGsuw3WUF5_jsHZ02rtZVLZ-nA25mHcfOmxXJyLv/exec';  // Reemplaza con la URL de tu Web App

// Función que se ejecuta cuando el formulario se envía
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir el envío tradicional del formulario
    
    const email = document.getElementById('email').value;  // Obtener el correo ingresado
    
    // Crear el objeto con el correo para enviar al Google Apps Script
    const data = {
        email: email
    };

    fetch('https://script.google.com/macros/s/AKfycbyxfSz2gGyZDQGgSj7xH-N7jRwdLx3LaVi-hU9BJfp6L452VqnptTo6zGuKS3nyazPK/exec', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log('Correo guardado:', data);
  })
  .catch(error => {
      console.error('Error al guardar correo:', error);
  });
});
  

// Guardar el contador de clics y redirigir al formulario
document.getElementById('continuarBtn')?.addEventListener('click', () => {
    clickCount++;  // Incrementar el contador de clics
    localStorage.setItem('clickCount', clickCount);  // Guardar el contador en localStorage
    window.location.href = 'form.html';  // Redirigir al formulario
});

// Solo agregar el listener si el formulario existe
const form = document.getElementById('loginForm');
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevenir el envío del formulario
        const email = document.getElementById('email').value;  // Obtener el correo del formulario

        // Guardar el correo en Google Sheets
        saveToGoogleSheets(email);

        alert('Correo guardado: ' + email);  // Confirmación para el usuario
    });
}

// Función para guardar el correo en Google Sheets
function saveToGoogleSheets(email) {
    fetch(googleAppsScriptUrl, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Correo guardado:', data);
    })
    .catch(error => {
        console.error('Error al guardar correo:', error);
    });
}

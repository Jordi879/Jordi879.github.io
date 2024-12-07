// Variable para contar clics
let clickCount = localStorage.getItem('clickCount') || 0;

// Evento en el botón de la página principal
document.getElementById('continue-btn')?.addEventListener('click', () => {
  clickCount++;
  localStorage.setItem('clickCount', clickCount);
  window.location.href = 'form.html';
});

// Manejar el formulario
document.getElementById('user-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;

  // Guardar correos en localStorage
  let emails = JSON.parse(localStorage.getItem('emails')) || [];
  emails.push(email);
  localStorage.setItem('emails', JSON.stringify(emails));

  alert('Correo guardado. Redirigiendo a la página principal.');
  window.location.href = 'index.html';
});

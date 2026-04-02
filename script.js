// Navigation
function initNav(activePage) {
  const toggle = document.querySelector('.nav-toggle');
  const dropdown = document.querySelector('.nav-dropdown');

  if (toggle && dropdown) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle('open');
      toggle.textContent = open ? '✕' : '☰';
    });
    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      toggle.textContent = '☰';
    });
    dropdown.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href') === activePage) a.classList.add('active');
    });
  }
}

// Kontaktformular
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('[name="name"]').value;
  btn.textContent = '⏳ Wird gesendet…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = `✓ Danke, ${name}! Wir melden uns bald.`;
    btn.style.background = '#6e1212';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Anfrage senden →';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }, 900);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

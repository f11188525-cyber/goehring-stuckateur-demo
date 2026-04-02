// ── Mobiles Menü ──
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? '✕' : '☰';
  });

  // Schließen bei Klick auf Link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });

  // Schließen bei Klick außerhalb
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
}

// ── Kontaktformular ──
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('[name="name"]').value;

  btn.textContent = '⏳ Wird gesendet…';
  btn.disabled = true;

  // Simuliertes Absenden – im Live-Betrieb hier Backend/Formspree anbinden
  setTimeout(() => {
    btn.textContent = `✓ Danke, ${name}! Wir melden uns bald.`;
    btn.style.background = 'var(--accent-dark)';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Anfrage senden →';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }, 900);
}

// ── Smooth Scroll für Anker ohne Hash-Sprung ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Navigation ──
function initNav(activePage) {
  const toggle = document.querySelector('.nav-toggle');
  const dropdown = document.querySelector('.nav-dropdown');
  if (!toggle || !dropdown) return;

  toggle.addEventListener('click', e => {
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

// ── Galerie-Tabs ──
function initGallery() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const grids = document.querySelectorAll('.gallery-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      grids.forEach(g => g.style.display = 'none');
      tab.classList.add('active');
      const target = document.getElementById('panel-' + tab.dataset.cat);
      if (target) target.style.display = 'grid';
    });
  });
  // Show first
  if (grids[0]) grids[0].style.display = 'grid';
}

// ── Lightbox ──
let currentImages = [];
let currentIndex = 0;

function openLightbox(src, images, index) {
  currentImages = images;
  currentIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
  document.getElementById('lightbox-img').src = currentImages[currentIndex];
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft') lightboxNav(-1);
});

// ── Kontaktformular ──
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

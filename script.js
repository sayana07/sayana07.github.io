// ══════════════════════════════════════════
//   Arena's Portfolio — script.js
// ══════════════════════════════════════════

// ── 1. Footer Year ───────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ── 2. Typewriter Effect ─────────────────
const phrases = [
  'CS Student.',
  'Problem Solver.',
  'Web Developer.',
  'Code Enthusiast.',
 // 'Future Engineer.'
];

let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
const tw = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    tw.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeWriter(); }, 1800);
      return;
    }
  } else {
    tw.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }

  setTimeout(typeWriter, deleting ? 55 : 90);
}

typeWriter();


// ── 3. Scroll Fade-in Animation ──────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ── 4. Mobile Menu ───────────────────────
function toggleMenu() {
  const menu  = document.getElementById('mobile-menu');
  const open  = document.getElementById('icon-open');
  const close = document.getElementById('icon-close');

  menu.classList.toggle('open');
  open.style.display  = menu.classList.contains('open') ? 'none'  : 'block';
  close.style.display = menu.classList.contains('open') ? 'block' : 'none';
}

function closeMenu() {
  const menu  = document.getElementById('mobile-menu');
  const open  = document.getElementById('icon-open');
  const close = document.getElementById('icon-close');

  menu.classList.remove('open');
  open.style.display  = 'block';
  close.style.display = 'none';
}


// ── 5. Responsive Navbar ─────────────────
function handleResize() {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('desktop-nav');

  if (window.innerWidth < 768) {
    btn.style.display = 'block';
    nav.style.display = 'none';
  } else {
    btn.style.display = 'none';
    nav.style.display = 'flex';
    closeMenu();
  }
}

handleResize();
window.addEventListener('resize', handleResize);


// ── 6. Responsive About Grid ─────────────
function aboutGrid() {
  const grid = document.querySelector('.about-grid');
  if (grid) {
    grid.style.gridTemplateColumns = window.innerWidth < 768 ? '1fr' : '1fr 1fr';
  }
}

aboutGrid();
window.addEventListener('resize', aboutGrid);


// ── 7. Contact Form (Web3Forms) ──────────
function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('contact-form');
  const btn  = document.getElementById('submit-btn');

  btn.textContent   = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled      = true;

  // Build JSON payload — more reliable than FormData
  const payload = {
    access_key: "fb9e247f-ffe0-473e-a1f1-8d9f0ed19a53",
    name:       document.getElementById('name').value,
    email:      document.getElementById('email').value,
    subject:    document.getElementById('subject').value,
    message:    document.getElementById('message').value,
    from_name:  "Portfolio Contact Form"
  };

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Web3Forms response:', data);
    if (data.success) {
      form.reset();
      showToast('Message sent successfully!', 'success');
    } else {
      console.error('Web3Forms error:', data);
      showToast('Error: ' + (data.message || 'Try again.'), 'error');
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
    showToast('Network error. Check your connection.', 'error');
  })
  .finally(() => {
    btn.innerHTML = `Send Message
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>`;
    btn.style.opacity = '1';
    btn.disabled      = false;
  });
}


// ── 8. Toast Notification ────────────────
function showToast(message, type) {
  const toast = document.getElementById('toast');
  const text  = document.getElementById('toast-text');

  text.textContent = message;

  // Green for success, red for error
  if (type === 'error') {
    toast.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    toast.style.color       = '#fca5a5';
  } else {
    toast.style.borderColor = 'rgba(34, 197, 94, 0.3)';
    toast.style.color       = '#86efac';
  }

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
// ── 9. Smart Email Link ──────────────────
const emailLink = document.getElementById('email-link');
if (emailLink) {
  emailLink.addEventListener('click', function(e) {
    const isMobile = /iPhone|iPad|Android|Mobile/i.test(navigator.userAgent);
    if (isMobile) {
      e.preventDefault();
      window.location.href = 'mailto:thelastsupper2004@gmail.com';
    }
    // On laptop — the default Gmail web link works automatically
  });
}


// ── 9. Active Nav Link on Scroll ─────────
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 80;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      link.style.color = (scrollY >= top && scrollY < top + height)
        ? '#f1f5f9'
        : '';
    }
  });
});

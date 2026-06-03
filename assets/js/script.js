/* NAV scroll state */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* Mobile menu */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.classList.toggle('open', open);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
  });
});

/* Scroll-triggered fade-up animations */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.hero-text, .hero-photo, .servico-card, .case-item, .sobre-stats, .membro-card, .contato-left, .contato-right'
).forEach((el, i) => {
  el.classList.add('fade-up');
  if (i % 4 === 1) el.classList.add('delay-1');
  if (i % 4 === 2) el.classList.add('delay-2');
  if (i % 4 === 3) el.classList.add('delay-3');
  observer.observe(el);
});

/* Contact form */
const form = document.getElementById('form-contato');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    feedback.textContent = 'Por favor, preencha os campos obrigatórios.';
    feedback.style.color = 'var(--error)';
    return;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    feedback.textContent = 'Por favor, insira um e-mail válido.';
    feedback.style.color = 'var(--error)';
    return;
  }

  const subject = encodeURIComponent(`Contato via site — ${nome}`);
  const body = encodeURIComponent(
    `Nome: ${nome}\nE-mail: ${email}\nEmpresa: ${form.empresa.value.trim() || '—'}\n\nMensagem:\n${mensagem}`
  );
  window.location.href = `mailto:michelle@mamartins.com.br?subject=${subject}&body=${body}`;

  feedback.textContent = 'Obrigado! Seu cliente de e-mail foi aberto.';
  feedback.style.color = 'rgba(255, 255, 255, 0.68)';
  form.reset();
});

/* Active nav link highlight on scroll */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

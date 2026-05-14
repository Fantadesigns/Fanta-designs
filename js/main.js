/* FANTA DESIGNS — main.js */

function initExperience() {
  const items = document.querySelectorAll('.exp-sidebar-item');
  const panels = document.querySelectorAll('.exp-content-inner');
  if (!items.length) return;
  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      items.forEach(i => i.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;
  let current = 0, charIndex = 0, typingTimer = null, pauseTimer = null;
  function typeCard(index) {
    cards.forEach(c => c.classList.remove('active'));
    clearInterval(typingTimer); clearTimeout(pauseTimer);
    const card = cards[index];
    card.classList.add('active');
    const textEl = card.querySelector('.testimonial-text');
    const fullText = card.dataset.text || '';
    textEl.textContent = ''; charIndex = 0;
    typingTimer = setInterval(() => {
      if (charIndex < fullText.length) { textEl.textContent += fullText[charIndex]; charIndex++; }
      else { clearInterval(typingTimer); pauseTimer = setTimeout(() => { current = (current + 1) % cards.length; typeCard(current); }, 3500); }
    }, 22);
  }
  typeCard(0);
}

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initExperience();
  initTestimonials();
  initScrollReveal();
});

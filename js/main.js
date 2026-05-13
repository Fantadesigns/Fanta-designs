// Experience tab switching
function initExperience() {
  const items = document.querySelectorAll('.exp-sidebar-item');
  const contents = document.querySelectorAll('.exp-content-inner');
  
  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      items.forEach(i => i.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      item.classList.add('active');
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });
}

// Typewriter testimonials
function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  let current = 0;
  let charIndex = 0;
  let typing = null;

  function getTextEl(card) {
    return card.querySelector('.testimonial-text');
  }

  function showCard(index) {
    cards.forEach(c => c.classList.remove('active'));
    const card = cards[index];
    card.classList.add('active');
    const textEl = getTextEl(card);
    const fullText = card.dataset.text;
    textEl.textContent = '';
    charIndex = 0;
    clearInterval(typing);
    typing = setInterval(() => {
      if (charIndex < fullText.length) {
        textEl.textContent += fullText[charIndex];
        charIndex++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          current = (current + 1) % cards.length;
          showCard(current);
        }, 3000);
      }
    }, 28);
  }

  showCard(0);
}

// Scroll fade-in
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initExperience();
  initTestimonials();
  initScrollReveal();
});

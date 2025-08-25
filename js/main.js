// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
navToggle?.addEventListener('click', () => {
  const open = nav.style.display === 'flex';
  nav.style.display = open ? 'none' : 'flex';
  navToggle.setAttribute('aria-expanded', String(!open));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth'});
      if (window.innerWidth < 980) { nav.style.display='none'; }
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Lightbox for portfolio
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const btnClose = document.querySelector('.lightbox-close');
const btnPrev = document.querySelector('.lightbox-prev');
const btnNext = document.querySelector('.lightbox-next');

const galleryButtons = Array.from(document.querySelectorAll('[data-lightbox]'));
let currentIndex = -1;

function openLightbox(index){
  currentIndex = index;
  const src = galleryButtons[currentIndex].dataset.lightbox;
  lightboxImg.src = src;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function showPrev(){ openLightbox((currentIndex - 1 + galleryButtons.length) % galleryButtons.length); }
function showNext(){ openLightbox((currentIndex + 1) % galleryButtons.length); }

galleryButtons.forEach((btn, i) => btn.addEventListener('click', () => openLightbox(i)));
btnClose.addEventListener('click', closeLightbox);
btnPrev.addEventListener('click', showPrev);
btnNext.addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('is-open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') showPrev();
  if(e.key === 'ArrowRight') showNext();
});

// Testimonials slider (vanilla)
const slider = document.querySelector('.slider');
if (slider){
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsWrap = slider.querySelector('.dots');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let active = 0;
  let timerId;

  function renderDots(){
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      if(i === active) d.classList.add('is-active');
      d.addEventListener('click', () => go(i, false));
      dotsWrap.appendChild(d);
    });
  }
  function go(i, auto){
    slides[active].classList.remove('is-active');
    active = (i + slides.length) % slides.length;
    slides[active].classList.add('is-active');
    renderDots();
    if(!auto){ resetAutoplay(); }
  }
  function nextSlide(){ go(active + 1, true); }
  function prevSlide(){ go(active - 1, true); }
  function resetAutoplay(){
    clearInterval(timerId);
    const delay = Number(slider.dataset.autoplay || 7000);
    timerId = setInterval(nextSlide, delay);
  }

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);
  renderDots();
  resetAutoplay();
}

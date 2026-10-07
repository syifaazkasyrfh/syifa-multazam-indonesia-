const navbar=document.getElementById('navbar');
const menu=document.getElementById('menu');

window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>40);
});

menu.addEventListener('click',()=>{
  const n=document.getElementById('nav');
  n.classList.toggle('open');
  if(n.classList.contains('open')){
    n.style.display='flex';
    n.style.flexDirection='column';
    n.style.position='absolute';
    n.style.top='68px';
    n.style.right='5%';
    n.style.background='#fff';
    n.style.padding='20px';
    n.style.borderRadius='15px';
    n.style.boxShadow='0 10px 35px rgba(0,0,0,.12)';
  }else{
    n.removeAttribute('style');
  }
});

document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{
  document.getElementById('nav').classList.remove('open');
  if(window.innerWidth<=900) document.getElementById('nav').removeAttribute('style');
}));

// Slider otomatis foto pemilik
const slides=document.querySelectorAll('.owner-slide');
const dots=document.querySelectorAll('.slider-dots .dot');
const prevBtn=document.querySelector('.slider-btn.prev');
const nextBtn=document.querySelector('.slider-btn.next');
let currentSlide=0;
let sliderTimer;

function showSlide(index){
  if(!slides.length)return;
  currentSlide=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('active',i===currentSlide));
  dots.forEach((dot,i)=>dot.classList.toggle('active',i===currentSlide));
}

function nextSlide(){
  showSlide(currentSlide+1);
}

function startSlider(){
  clearInterval(sliderTimer);
  sliderTimer=setInterval(nextSlide,4000);
}

prevBtn?.addEventListener('click',()=>{
  showSlide(currentSlide-1);
  startSlider();
});
nextBtn?.addEventListener('click',()=>{
  showSlide(currentSlide+1);
  startSlider();
});
dots.forEach((dot,i)=>dot.addEventListener('click',()=>{
  showSlide(i);
  startSlider();
}));

showSlide(0);
startSlider();

/* ================================
   CUSTOM CURSOR - MINI KA'BAH
   Aktif hanya pada perangkat bermouse
   ================================ */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'makkah-cursor';
  cursor.setAttribute('aria-hidden','true');
  cursor.innerHTML = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kaabahGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f4dc96"/>
          <stop offset="1" stop-color="#c6a15b"/>
        </linearGradient>
      </defs>
      <path d="M13 23.5 32 13l19 10.5v24L32 58 13 47.5z"
            fill="#111c19" stroke="url(#kaabahGold)" stroke-width="1.8"/>
      <path d="M13 23.5 32 34l19-10.5" fill="#172b26"/>
      <path d="M32 34v24" stroke="#c6a15b" stroke-width="1.2"/>
      <path d="M13 29.5 32 40l19-10.5" fill="none" stroke="#e4c982" stroke-width="2.5"/>
      <path d="M13 23.5 32 13l19 10.5" fill="none" stroke="#e4c982" stroke-width="1.5"/>
      <path d="M26 36.8h12v4H26z" fill="url(#kaabahGold)"/>
      <path d="M27.5 36.8v-4.2h9v4.2" fill="none" stroke="#c6a15b" stroke-width="1.2"/>
      <circle cx="32" cy="7" r="2.2" fill="#e4c982"/>
      <path d="M32 1.5v3M26.5 3.5l2 2M37.5 3.5l-2 2" stroke="#e4c982" stroke-width="1" stroke-linecap="round"/>
    </svg>
  `;
  document.body.appendChild(cursor);

  const dot = document.createElement('div');
  dot.className = 'makkah-cursor-dot';
  dot.setAttribute('aria-hidden','true');
  document.body.appendChild(dot);

  let mouseX = window.innerWidth/2;
  let mouseY = window.innerHeight/2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let lastTrail = 0;

  window.addEventListener('mousemove', function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    const now = performance.now();
    if(now - lastTrail > 45){
      const trail = document.createElement('span');
      trail.className = 'makkah-cursor-trail';
      trail.style.left = mouseX + 'px';
      trail.style.top = mouseY + 'px';
      document.body.appendChild(trail);
      setTimeout(()=>trail.remove(),600);
      lastTrail = now;
    }
  }, {passive:true});

  function animateCursor(){
    cursorX += (mouseX - cursorX) * .22;
    cursorY += (mouseY - cursorY) * .22;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mouseover', function(e){
    if(e.target.closest('a, button, input, textarea, select, [role="button"]')){
      cursor.classList.add('is-hover');
    } else {
      cursor.classList.remove('is-hover');
    }
  });

  window.addEventListener('mousedown', ()=>cursor.classList.add('is-click'));
  window.addEventListener('mouseup', ()=>cursor.classList.remove('is-click'));
})();

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

/* =====================================
   APP-LIKE UPGRADE 2.0
   ===================================== */
(function(){
  const loader=document.getElementById('app-loader');
  const progress=document.getElementById('scroll-progress');
  const backTop=document.getElementById('back-to-top');
  const mobileItems=[...document.querySelectorAll('.mobile-nav-item')];
  const sections=[...document.querySelectorAll('section[id]')];

  // Loading screen: tetap ringan dan tidak menghalangi jika halaman gagal load.
  function hideLoader(){ if(loader) loader.classList.add('hide'); }
  if(document.readyState==='complete') setTimeout(hideLoader,450);
  else window.addEventListener('load',()=>setTimeout(hideLoader,450),{once:true});
  setTimeout(hideLoader,3000);

  function updateUI(){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const pct=max>0?(window.scrollY/max)*100:0;
    if(progress) progress.style.width=Math.min(100,pct)+'%';
    if(backTop) backTop.classList.toggle('show',window.scrollY>500);

    let current='home';
    sections.forEach(section=>{
      if(window.scrollY >= section.offsetTop-180) current=section.id;
    });
    mobileItems.forEach(item=>item.classList.toggle('active',item.getAttribute('href')==='#'+current));
  }
  window.addEventListener('scroll',updateUI,{passive:true});
  window.addEventListener('resize',updateUI,{passive:true});
  updateUI();

  backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Animasi masuk setiap section/card saat mulai terlihat.
  const revealTargets=document.querySelectorAll('.section,.stats,.cta,footer .foot,.cards article,.facility>div,.timeline>div,.gallery-main,.gallery-note,.owner-content');
  revealTargets.forEach(el=>el.classList.add('reveal'));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
      });
    },{threshold:.12,rootMargin:'0px 0px -35px'});
    revealTargets.forEach(el=>observer.observe(el));
  }else revealTargets.forEach(el=>el.classList.add('visible'));

  // Tutup menu desktop/mobile lama setelah memilih menu.
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
    const nav=document.getElementById('nav');
    if(nav?.classList.contains('open')){nav.classList.remove('open');nav.removeAttribute('style')}
  }));
})();

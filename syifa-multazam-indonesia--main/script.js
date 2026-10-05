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

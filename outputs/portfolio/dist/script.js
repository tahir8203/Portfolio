document.getElementById('year').textContent = new Date().getFullYear();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);} }), {threshold:.08});
 document.querySelectorAll('.section h2,.project,.skills-grid>div,.timeline article,.education-grid article,.research-paper,.about>div,.stats>div').forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--delay',`${i%3*70}ms`);observer.observe(el);});
}
const progress=document.querySelector('.scroll-progress');let scheduled=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;document.querySelector('header').classList.toggle('scrolled',scrollY>20);scheduled=false;}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();
if('IntersectionObserver' in window){const sections=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -65% 0px',threshold:0});document.querySelectorAll('main section[id]').forEach(s=>sections.observe(s));}

(function(){
  var menu=document.querySelector('.lab-menu');var nav=document.querySelector('.lab-nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});nav.addEventListener('click',function(){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')})}
  var items=document.querySelectorAll('[data-reveal]');
  if(!('IntersectionObserver' in window)){items.forEach(function(el){el.classList.add('is-visible')});return}
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -40px'});
  items.forEach(function(el,index){el.style.transitionDelay=Math.min(index%5,3)*70+'ms';observer.observe(el)});
}());

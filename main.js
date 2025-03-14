gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);

// gsap.ticker.add((time) => {
//   lenis.raf(time * 1200);
// });	

ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.8,
    effects: true
  })



const menu = {
	element: document.querySelector(".menu"),
	// pages : document.querySelectorAll(".menu-row-pages > h2"),
	// info: document.querySelectorAll(".menu-row-info > div > span"),
	// title: document.querySelectorAll(".menu-row-title > h1"),
	// media: document.querySelector(".menu-row-media"),
 
 };
 
 const button = {
	element: document.querySelector(".nav-menu-button"),
	text:document.querySelectorAll(".nav-menu-button-text"),
	open : document.querySelector(".--open-menu"),
	close :document.querySelector(".--close-menu"),
 
 };
 
 const clipPath = {
	init: 'inset(0% 0% 0% 0% )',
	bottom: 'inset(100% 0% 0% 0% )',
	top: 'inset(0% 0% 100% 0% )',
 };
 
 const tlMenu = gsap.timeline({
	paused:true,
	defaults: { duration: 1.6, ease: 'expo.inOut' },
 });
 
 let isEnabled = false;
 
 const initMenu = () =>{
	gsap.set(menu.element, {PointerEvents: 'none', clipPath: clipPath.top});
	gsap.set(menu.pages, {yPercent: 100, autoAlpha: 0});
	 gsap.set(menu.info, {yPercent: 100, autoAlpha: 0});
	gsap.set(menu.title, {yPercent: 100, rotateY: 20, scale: 0.2});
	gsap.set(menu.media, { clipPath: clipPath.bottom});
 
	animateInnerMenu(); 
 };
 
 const animateMenu = () =>{
	if(!isEnabled) {
	  gsap.to(menu.element, {
		 duration: 1.2,
		 PointerEvents: "auto",
		 clipPath: clipPath.init,
		 ease: "expo.inOut",
 
	  });
	
	}else {
	  gsap.to(menu.element, {
		 duration: 0.8,
			 clipPath: clipPath.top,
			 ease: 'expo.inOut',
		 onComplete: ()=>{
			gsap.set(menu.element, {PointerEvent: 'none', clipPath: clipPath.top});
		 },
	  });
	}
 }
 
 const animateInnerMenu = () =>{
	 tlMenu.to(
		 menu.pages,{
 
			 yPercent:0,
			 autoAlpha: 1,
			 stagger: 0.032,
	 },
	 0.24
		 )
		 .to(
			 menu.info,{
 
				 yPercent:0,
				 autoAlpha: 1,
				 stagger: 0.032,
		 },
		 0.24
		 ).to(
			 menu.title,
			 {
				 yPercent:0,
				 rotateY: 0,
				 scale: 1,
				 stagger: 0.032,
		 },
		 0
		 ).to(
			 menu.media,
			 {
				 clipPath: clipPath.init,
		 },
		 0
		 );
 
 };
 
 const animateButton = (text) => {
	 gsap.timeline().to(button.element, {
		 duration: 0.8,
		 autoAlpha: 0,
		 PointerEvents: 'none',
		 onComplete: ()=> {
			 button.text[0].textContent = text;
		 },
	 }) .to(button.element, {
		 duration: 0.8,
		 autoAlpha: 1,
		 PointerEvents: 'auto',
	 });
 };
 
 const addEventListener = () =>{
	 button.open.addEventListener('click', ()=> {
		 if(!isEnabled) {
			 animateButton('Close')
			 animateMenu();
			 tlMenu.play();
			 
		 } else {
			 animateButton('Menu')
			 animateMenu();
			 tlMenu.reverse(2);
		 }
		 isEnabled = !isEnabled;
	 });
 };
 
 window.addEventListener('DOMContentLoaded', ()=>{
	initMenu();
	addEventListener();
 })

 if (ScrollTrigger.isTouch !==1){

 }
 gsap.fromTo('.images-page', { scale: .2, x:0, y:-700,}, { 
		scale: 1, y:0, x: 0,
		scrollTrigger: {
		  trigger: '.hero',
		  start:'100',
		  duration: 1,
		  delay : 1,
		  ease: "Power1.easeOut",
		  scrub:true,
		  stagger: 5,
		}
	 })

		let itemsR =  gsap.utils.toArray( '.hero__desc-right')
		itemsR.forEach(item => {
		gsap.fromTo( item, { x: 0 , opacity: 1 }, {
			opacity: 0	, x: 200,
			scrollTrigger: {
				trigger: item,
				start: '-50',
				// end: '-100',
				scrub: true
			}
		})
		})

		let itemsL =  gsap.utils.toArray( '.hero__desc-left')
		itemsL.forEach(item => {
		gsap.fromTo( item, { x: 0 , opacity: 1 }, {
			opacity: 0	, x: -200,
			scrollTrigger: {
				trigger: item,
				start: '50',
				// end: '-100',
				scrub: true
			}
		})
		})

let itemsL2 =  gsap.utils.toArray( '.about-img-1, .about-img-2')
itemsL2.forEach(item => {
  gsap.fromTo( item, { x: 400 ,  }, {
    x: 0,
    scrollTrigger: {
      trigger: item,
      start: '450',
      // end: '-100',
      scrub: true
    }
  })
})

let itemsR2 =  gsap.utils.toArray( '.about-img-4, .about-img-5')
itemsR2.forEach(item => {
  gsap.fromTo( item, { x: -400 }, {
     x: 0,
    scrollTrigger: {
      trigger: item,
      start: '450',
      // end: '-100',
      scrub: true
    }
  })
})
const revealElements = document.querySelectorAll("[data-reveal]");

   const scrollReveal = function(){
   for(let i = 0; i < revealElements.length; i++){
    const isElementsOnScreen = revealElements[i].getBoundingClientRect().top < 1000;
    // window.innerHeight
    if(isElementsOnScreen){
      revealElements[i].classList.add("revealed")
    } else {
      revealElements[i].classList.remove("revealed")
    }
  }
}


window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);


ScrollReveal({
  distance: '100px',
  duration: 2000, 
  delay: 200,
  reset:true,
  
})




 



 


 




	




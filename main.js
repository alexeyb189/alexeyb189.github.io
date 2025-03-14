gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !== 1) {

	ScrollSmoother.create({
		wrapper: '.wrapper',
		content: '.content',
		smooth: 1.5,
		effects: true
	})


  const menu = {
    element: document.querySelector(".menu"),
    
   
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


  document.addEventListener("DOMContentLoaded", function () {
      const footer = document.querySelector(".sticky-bottom");
      const lastCard = document.querySelector(".card.scroll");
      const pinnedSections = gsap.utils.toArray(".pinned");
    
      pinnedSections.forEach((section, index, sections) => {
        let img = section.querySelector(".img");
    
        // Get each <section class="card pinned"> and lastCard
        let nextSection = sections[index + 1] || lastCard;
    
        let endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;
    
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top top",
    
            // if section is a last section of the pinnedSections array
            end:
              index === sections.length
                ? `+=${lastCard.offsetHeight / 2}`
                : footer.offsetTop - window.innerHeight,
            pin: true,
            pinSpacing: false,
            scrub: 1
          }
        });
    
        gsap.fromTo(
          img,
          {
            scale: 1,
            opacity: 1
          },
          {
          //   scale: 0.3,
            // opacity: 0.01,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: endScalePoint,
              scrub: 1
            }
          }
        );
      });
    
    });
      
}


// document.addEventListener("DOMContentLoaded", function() {
// 	document.getElementById("search").addEventListener("click", function() {
// 			document.querySelector(".header").classList.toggle("open-2")
     
// 	})
// })

var swiper = new Swiper(".poduct-list", {
	slidesPerView: 4,
	spaceBetween: 20,
	speed: 1200,
	// centeredSlides: true,
	loop: true,
  //  mousewheel: {
  //     sensitivity: 1,
  //   }
	
});

 //SERVICES
// const cursor = document.querySelector(".cursor");
const cursorMedias = document.querySelectorAll(".footer__list-circle ");
const cursorMedias2 = document.querySelectorAll(".footer__content-item ");
const navLinks = document.querySelectorAll(".footer__list-model");

let activeNavLinkIndex = 0; // Initialize with the first item as active

const tl = gsap.timeline({
  paused: true // Start the timeline paused initially
});

// Set the initial state for the first item (default: first navigation link is active)
cursorMedias[activeNavLinkIndex].classList.add("active");
navLinks[activeNavLinkIndex].classList.add("active"); // Add "active" class to the first nav link

navLinks.forEach((navLink, i) => {
  navLink.addEventListener("mouseover", () => {
    if (i !== activeNavLinkIndex) {
      // Remove the "active" class from all navigation links
      navLinks.forEach((link, index) => {
        if (index !== i) {
          cursorMedias[index].classList.remove("active");
          cursorMedias2[index].classList.remove("active");

          link.classList.remove("active"); // Remove "active" class from other nav links
          gsap.to(link, {
            color: "", // Restore the original color
            x: 0, // Move back to the original position
            duration: 0.3 // Animation duration
          });


        }
      });

      activeNavLinkIndex = i;
      cursorMedias[i].classList.add("active");
      cursorMedias2[i].classList.add("active");

      // Animate the current navLink on mouseover
      gsap.to(navLink, {
      //   color: "red", // Change the color
        // x: 20, // Move 20px to the right
        duration: 0.3 // Animation duration
      });

      tl.play();
    }
  });
});
 //SERVICES


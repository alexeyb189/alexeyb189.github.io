gsap.registerPlugin(ScrollTrigger);
const body = document.querySelector(".body");
const intro = document.querySelector(".intro");
const introCard = intro.querySelectorAll('.intro-card');
const introMedia = intro.querySelector(".intro-media");
const isMobile = window.matchMedia('(max-width: 768px)');
const init = () => {
  gsap.set(body, { overflow: "hidden" });
  gsap.set(introCard[0], { scale: 0.5 });
  initLenis();
  initScrollHero();
  initScrollMedia();
};
const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};
const initScrollHero = () => {
  const tlHero = gsap.timeline({
    defaults: { stagger: 0.08, ease: "power1.inOut" },
    scrollTrigger: {
      trigger: ".intro-one",
      start: "top top",
      end: "center",
      scrub: true,
      pin: true,
      pinSpacing: true,
    },
  });
  tlHero.add("start").to(introCard[0], {
    scale: 1,
  });
};
const initScrollMedia = () => {
  const tlMedia = gsap.timeline({
    scrollTrigger: {
      trigger: intro,
      start: "center top",
      end: "bottom bottom",
      scrub: 2,
      pinSpacing: false,
    },
  });
  gsap.set(introMedia, { autoAlpha: 1 });
  tlMedia.to(introMedia, {
    autoAlpha: 0,
  });
  initGalleryText();
};
const initGalleryText = () => {
  const gallery = document.querySelector('.gallery');
  const galleryText = gallery.querySelector('.gallery-text');
  ScrollTrigger.create({
    trigger: gallery,
    pin: galleryText,
    start: 'top top',
    end: 'bottom bottom',
  });
  
  const texts = gsap.utils.toArray('.gallery-text-items > h2');
  gsap.set(texts, { y: '100%', autoAlpha: 0 });
  
  texts.forEach((text, i) => {
    const tlGalleryText = gsap.timeline({
      scrollTrigger: {
        trigger: gallery,
        start: () => `top+=${i * window.innerHeight} top+=60%`,
        end: () => `top+=${(i + 1) * window.innerHeight} top`,
        scrub: 2,
      },
    });
    tlGalleryText.to(text, {
      y: 0,
      autoAlpha: 1,
    })
    .to(text, {
      y: '-100%',
      autoAlpha: 0,
    });
  });
};
const initConnection = () => {
  const connect = document.querySelector('.connect');
  const connectMedia = document.querySelectorAll('.connect-media');
  
  connectMedia.forEach((media) => {
    if (media.classList.contains('image-front')) {
      gsap.set(media, { xPercent: -500, y: 0, yPercent: -50 });
    } else {
      gsap.set(media, { xPercent: 500, y: 0, yPercent: -50 });
    }
  });
  
  const tlConnect = gsap.timeline({
    ease: 'none',
    scrollTrigger: {
      trigger: connect,
      start: 'top top',
      end: '+=3000',
      scrub: 1,
      pin: true,
    },
  });
  
  tlConnect.to(connectMedia, {
    xPercent: 100,
  }).to(connectMedia, {
    scale: 0.5,
  });
};
window.addEventListener("DOMContentLoaded", () => {
  if (!isMobile.matches) {
    init();
  } else {
    initLenis();
    initScrollMedia();
  }
});
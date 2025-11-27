// SELECTOR
const BATMAN = document.querySelector(".layer-batman img");
const BATSIGNAL = document.querySelector(".layer-batsignal img");
const LOGO = document.querySelector(".layer-logo img");

// INICIAL POSICION'S
const BATMAN_START = 0;
const BATSIGNAL_START = 0;
const LOGO_START = 0;

// SPEED FACTOR'S
const BATMAN_SPEED = 0.3;
const BATSIGNAL_SPEED = 0.1;
const LOGO_SPEED = 0.9;

// FUNCION SCROLL
window.addEventListener("scroll", () => {
  const SCROLL_Y = window.scrollY;

  // MOVE BATMAN
  BATMAN.style.transform = `translateX(${SCROLL_Y * BATMAN_SPEED}px)`;

  // MOVE BATSIGNAL
  BATSIGNAL.style.transform = `translateX(${-SCROLL_Y * BATSIGNAL_SPEED}px)`;


  // LOGO MOVE
  LOGO.style.transform = ` translateX(${SCROLL_Y * LOGO_SPEED}px)`;
});

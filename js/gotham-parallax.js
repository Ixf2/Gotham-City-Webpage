// SELECTORES DE CAPAS
const batman = document.querySelector(".layer-batman img");
const batsignal = document.querySelector(".layer-batsignal img");
const logo = document.querySelector(".layer-logo img");

// POSICIONES INICIALES
const batmanStart = 0;
const batsignalStart = 0;
const logoStart = 0;

// SPEED FACTOR'S
const batmanSpeed = 0.9; 
const batsignalSpeed = 0.1;
const logoSpeed = 0.29;

// FUNCION SCROLL
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // MOVE BATMAN
  batman.style.transform = `translateX(${scrollY * batmanSpeed}px)`;

  // MOVE BATSIGNAL
batsignal.style.transform = `translateX(${-scrollY * batsignalSpeed}px)`;


  // LOGO MOVE
  logo.style.transform = ` translateX(${scrollY * logoSpeed}px)`;
});

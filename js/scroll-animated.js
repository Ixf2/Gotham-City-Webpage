const SCROLL_ELEMENTS = document.querySelectorAll(".scroll-animate");

//FUNCTION FOR SEE THE ELEMENT IS VISIBLE
const ELEMENT_IN_VIEW = (el, offset = 0) => {
  const ELEMENT_TOP = el.getBoundingClientRect().top;
  return ELEMENT_TOP <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};


//FUNCION SCROLL ANIMATED
const DISPLAY_SCROLL_ELEMENT = (el) => {
  el.classList.add("visible");
};

const HIDE_SCROLL_ELEMENT = (el) => {
  el.classList.remove("visible");
};

const HADLE_SCROLL_ANIMATION = () => {
  SCROLL_ELEMENTS.forEach(el => {
    if (ELEMENT_IN_VIEW(el, 100)) { 
      DISPLAY_SCROLL_ELEMENT(el);
    } else {
      HIDE_SCROLL_ELEMENT(el);
    }
  });
};

//SCROLL EVENT
window.addEventListener("scroll", () => {
  HADLE_SCROLL_ANIMATION();
});

document.addEventListener("DOMContentLoaded", () => {
  HADLE_SCROLL_ANIMATION();
});

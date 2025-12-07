function toggleMenu() {
  const MENU_LINKS = document.querySelector('.menu-links');
  MENU_LINKS.classList.toggle('show');
}

//MESSAGES CHAT MENU
const FLOAT_ING_BTN = document.getElementById("floating-btn");
const CHAT_CONTAINER = document.getElementById("chat-container");

// Abrir/cerrar ventana al hacer clic
FLOAT_ING_BTN.addEventListener("click", () => {
  if (CHAT_CONTAINER.style.display === "none" || CHAT_CONTAINER.style.display === "") {
    CHAT_CONTAINER.style.display = "flex";   
  } else {
    CHAT_CONTAINER.style.display = "none";   
  }
});



function toggleMenu() {
  const MENU_LINKS = document.querySelector('.menu-links');
  MENU_LINKS.classList.toggle('show');
}

//MESSAGES CHAT MENU
const CHAT_ICON = document.getElementById("chat-icon");
const CHAT_CONTAINER = document.getElementById("chat-container");
const CLOSE_CHAT = document.querySelector(".close-chat");

CHAT_ICON.addEventListener("click", () => {
  CHAT_CONTAINER.style.display = "flex";
  CHAT_ICON.style.display = "none"; // ocultar el icono
});

CLOSE_CHAT.addEventListener("click", () => {
  CHAT_CONTAINER.style.display = "none";
  CHAT_ICON.style.display = "flex"; // volver a mostrar el icono
});

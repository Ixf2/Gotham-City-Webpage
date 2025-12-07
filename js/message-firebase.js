import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA3kAu8CstilbjvC94gj29Gyb-FWdEElFk",
    authDomain: "gotham-city-webpage-proyecto.firebaseapp.com",
    databaseURL: "https://gotham-city-webpage-proyecto-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "gotham-city-webpage-proyecto",
    storageBucket: "gotham-city-webpage-proyecto.appspot.com",
    messagingSenderId: "148141084936",
    appId: "1:148141084936:web:fe6f7ae51b763bf0d5dcbd",
    measurementId: "G-443VQ84RK8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app, "https://gotham-city-webpage-proyecto-default-rtdb.europe-west1.firebasedatabase.app");
const messagesRef = ref(db, "messages");

        let userName = '';
        let userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        // Entrar al chat
window.enterChat = function enterChat() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();
    if (name === '') {
        document.getElementById('login-error').textContent = 'Por favor ingresa tu nombre';
        return;
    }
    
    userName = name;
    document.getElementById('login-screen').style.display = 'none';
    
    // Mostrar el chat-screen existente
    const chatScreen = document.getElementById('chat-screen');
    chatScreen.style.display = 'flex';
    chatScreen.style.flexDirection = 'column';
    
    loadMessages();
    document.getElementById('message-input').focus();
    
    // Registrar eventos para el input de mensaje
    setTimeout(() => {
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }, 0);
}

        // Enviar mensaje
        function sendMessage() {
            const messageInput = document.getElementById('message-input');
            const messageText = messageInput.value.trim();
            if (messageText === '') return;
            const newMessage = {
                text: messageText,
                userName: userName,
                userId: userId,
                timestamp: Date.now()
            };
            push(messagesRef, newMessage)
                .then(() => {
                    messageInput.value = '';
                })
                .catch((error) => {
                    console.error('Error al enviar mensaje:', error);
                    alert('Error al enviar el mensaje. Verifica tu configuración de Firebase.');
                });
        }

        window.sendMessage = sendMessage;

        // Cargar y escuchar mensajes
        function loadMessages() {
            onChildAdded(messagesRef, (snapshot) => {
                const message = snapshot.val();
                displayMessage(message);
            });
        }

        // Mostrar mensaje en la interfaz
        function displayMessage(message) {
            const container = document.getElementById('messages-container');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            if (message.userId === userId) {
                messageDiv.classList.add('own');
            }
            const time = new Date(message.timestamp).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
            messageDiv.innerHTML = `
                <div class="message-header">
                    ${message.userName}
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${escapeHtml(message.text)}</div>
            `;
            container.appendChild(messageDiv);
            container.scrollTop = container.scrollHeight;
        }

        // Escapar HTML para prevenir XSS
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Enviar mensaje con Enter para el input de nombre
        document.addEventListener('DOMContentLoaded', () => {
            const nameInput = document.getElementById('name-input');
            if (nameInput) {
                nameInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') enterChat();
                });
            }
        });
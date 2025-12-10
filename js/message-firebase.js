import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


const APP = getApp();
const DB = getDatabase(APP);


const MESSEGES_REF = ref(DB, "messages");


let userName = '';
let userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
// ENTER CHAT
window.enterChat = function enterChat() {
    const NAME_INPUT = document.getElementById('name-input');
    const NAME = NAME_INPUT.value.trim();
    if (NAME === '') {
        document.getElementById('login-error').textContent = 'Por favor ingresa tu nombre';
        return;
    }

    userName = NAME;
    document.getElementById('login-screen').style.display = 'none';

    // SHOW THE CHAT-SCREEN
    const CHAT_SCREEN = document.getElementById('chat-screen');
    CHAT_SCREEN.style.display = 'flex';
    CHAT_SCREEN.style.flexDirection = 'column';

    loadMessages();
    document.getElementById('message-input').focus();

    setTimeout(() => {
        const MESSAGE_INPUT = document.getElementById('message-input');
        if (MESSAGE_INPUT) {
            MESSAGE_INPUT.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }, 0);
}

// SEND MESSAGE
function sendMessage() {
    const MESSAGE_INPUT = document.getElementById('message-input');
    const MESSAGE_TEXT = MESSAGE_INPUT.value.trim();
    if (MESSAGE_TEXT === '') return;
    const NEW_MESSAGE = {
        text: MESSAGE_TEXT,
        userName: userName,
        userId: userId,
        timestamp: Date.now()
    };
    push(MESSEGES_REF, NEW_MESSAGE)
        .then(() => {
            MESSAGE_INPUT.value = '';
        })
        .catch((error) => {
            console.error('Error al enviar mensaje:', error);
            alert('Error al enviar el mensaje. Verifica tu configuración de Firebase.');
        });
}

window.sendMessage = sendMessage;

// MESSAGE LOAD 
function loadMessages() {
    onChildAdded(MESSEGES_REF, (snapshot) => {
        const MESSAGE = snapshot.val();
        displayMessage(MESSAGE);
    });
}

// INTERFACE MESSAGE
function displayMessage(message) {
    const CONTAINER = document.getElementById('messages-container');
    const MESSAGE_DIV = document.createElement('div');
    MESSAGE_DIV.className = 'message';
    if (message.userId === userId) {
        MESSAGE_DIV.classList.add('own');
    }
    const TIME = new Date(message.timestamp).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
    MESSAGE_DIV.innerHTML = `
                <div class="message-header">
                    ${message.userName}
                    <span class="message-time">${TIME}</span>
                </div>
                <div class="message-text">${escapeHtml(message.text)}</div>
            `;
    CONTAINER.appendChild(MESSAGE_DIV);
    CONTAINER.scrollTop = CONTAINER.scrollHeight;
}


function escapeHtml(text) {
    const DIV = document.createElement('div');
    DIV.textContent = text;
    return DIV.innerHTML;
}


document.addEventListener('DOMContentLoaded', () => {
    const NAME_INPUT = document.getElementById('name-input');
    if (NAME_INPUT) {
        NAME_INPUT.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enterChat();
        });
    }
});
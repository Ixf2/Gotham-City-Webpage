// log-in-sign-up.js
import { AUTH, db } from './firebase-setup.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Show notification helper
const showNotification = (message, duration = 3000) => {
  const notification = document.getElementById('notification');
  if (!notification) return;
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => notification.classList.remove('show'), duration);
};

document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTS
  const LOGIN_BTN = document.getElementById('login-header-btn');
  const SIGNUP_BTN = document.getElementById('signup-header-btn');
  const LOGIN_SUBMENU = document.getElementById('login-submenu');
  const SIGNUP_SUBMENU = document.getElementById('signup-submenu');
  const LOGIN_FORM = LOGIN_SUBMENU?.querySelector('form');
  const SIGNUP_FORM = SIGNUP_SUBMENU?.querySelector('form');
  const LOGOUT_BTN = document.getElementById('logout-btn');
  const ADMIN_BTN = document.getElementById('admin-btn'); // optional
  const USER_INFO = document.getElementById('user-info');

  // OPEN/CLOSE SUBMENUS
  LOGIN_BTN?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = LOGIN_BTN.getBoundingClientRect();
    if (LOGIN_SUBMENU) {
      LOGIN_SUBMENU.style.left = rect.left + "px";
      LOGIN_SUBMENU.style.top = rect.bottom + "px";
      LOGIN_SUBMENU.style.display = LOGIN_SUBMENU.style.display === 'block' ? 'none' : 'block';
    }
    if (SIGNUP_SUBMENU) SIGNUP_SUBMENU.style.display = 'none';
  });

  SIGNUP_BTN?.addEventListener('click', (e) => {
    e.preventDefault();
    const rect = SIGNUP_BTN.getBoundingClientRect();
    if (SIGNUP_SUBMENU) {
      SIGNUP_SUBMENU.style.left = rect.left + "px";
      SIGNUP_SUBMENU.style.top = rect.bottom + "px";
      SIGNUP_SUBMENU.style.display = SIGNUP_SUBMENU.style.display === 'block' ? 'none' : 'block';
    }
    if (LOGIN_SUBMENU) LOGIN_SUBMENU.style.display = 'none';
  });

  document.addEventListener('click', (e) => {
    if (!LOGIN_BTN?.contains(e.target) && !LOGIN_SUBMENU?.contains(e.target)) LOGIN_SUBMENU.style.display = 'none';
    if (!SIGNUP_BTN?.contains(e.target) && !SIGNUP_SUBMENU?.contains(e.target)) SIGNUP_SUBMENU.style.display = 'none';
  });

  
  // UPDATE BUTTONS AND SHOW USER INFO
  const updateButtonsByRole = async (user) => {
    if (!user) {
      if (LOGOUT_BTN) LOGOUT_BTN.style.display = 'none';
      if (ADMIN_BTN) ADMIN_BTN.style.display = 'none';
      if (USER_INFO) USER_INFO.textContent = '';
      return;
    }

    if (LOGOUT_BTN) LOGOUT_BTN.style.display = 'block';
    if (LOGIN_SUBMENU) LOGIN_SUBMENU.style.display = 'none';
    if (SIGNUP_SUBMENU) SIGNUP_SUBMENU.style.display = 'none';

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData?.role === 'admin' && ADMIN_BTN) {
        ADMIN_BTN.style.display = 'block';
        
      } else if (ADMIN_BTN) {
        ADMIN_BTN.style.display = 'none';
      }

      if (USER_INFO) {
        USER_INFO.textContent = userData?.username ? `Hello, ${userData.username}` : '';
      }

    } catch (err) {
      console.error("Error fetching user role:", err);
      if (ADMIN_BTN) ADMIN_BTN.style.display = 'none';
      if (USER_INFO) USER_INFO.textContent = '';
    }
  };

  // LOGIN
  LOGIN_FORM?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = LOGIN_FORM[0].value;
    const password = LOGIN_FORM[1].value;

    try {
      const userCredential = await signInWithEmailAndPassword(AUTH, email, password);
      const user = userCredential.user; 
      LOGIN_FORM.reset();
      await updateButtonsByRole(user);
      showNotification('Login successful');
    } catch (err) {
      showNotification(err.message);
    }
  });

  // SIGNUP
  SIGNUP_FORM?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = SIGNUP_FORM[0].value;
    const email = SIGNUP_FORM[1].value;
    const password = SIGNUP_FORM[2].value;

    try {
      const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        role: 'guest'
      });

      SIGNUP_FORM.reset();
      await updateButtonsByRole(user);
      showNotification('Registration successful');
    } catch (err) {
      showNotification(err.message);
    }
  });

  // LOGOUT
  LOGOUT_BTN?.addEventListener('click', async () => {
    await signOut(AUTH);
    if (LOGOUT_BTN) LOGOUT_BTN.style.display = 'none';
    if (ADMIN_BTN) ADMIN_BTN.style.display = 'none';
    if (LOGIN_SUBMENU) LOGIN_SUBMENU.style.display = 'none';
    if (SIGNUP_SUBMENU) SIGNUP_SUBMENU.style.display = 'none';
    if (USER_INFO) USER_INFO.textContent = '';
    showNotification('Session closed');
  });

  // AUTH STATE
  onAuthStateChanged(AUTH, async (user) => {
    await updateButtonsByRole(user);
  });
});

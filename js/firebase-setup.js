// Importar funciones necesarias de Firebase modular
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
        // Configuración de Firebase
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

        // Inicializar Firebase y la base de datos
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app, "https://gotham-city-webpage-proyecto-default-rtdb.europe-west1.firebasedatabase.app");
        const messagesRef = ref(db, "messages");


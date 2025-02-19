// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para Firestore (base de datos)


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBFGk48_rlqq1EHajvCwl5sWsJPOIh17tQ",
  authDomain: "blogmarkdownbd.firebaseapp.com",
  projectId: "blogmarkdownbd",
  storageBucket: "blogmarkdownbd.appspot.com",
  messagingSenderId: "783393344700",
  appId: "1:783393344700:web:11f47fed7975e28c1294b9",
  measurementId: "G-XZSDZ92GXC",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore (base de datos)
const db = getFirestore(app);



// Exporta la instancia de Firestore para usarla en otros archivos
export { db };
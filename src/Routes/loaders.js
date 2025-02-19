import { db } from "./firebase"; // Importa la instancia de Firestore
import { getDocs, collection } from "firebase/firestore";

export const indexLoader = async () => {
    try {
        // Obtener todos los documentos de la colección "blogs"
        const querySnapshot = await getDocs(collection(db, "blogs"));

        // Transformar los documentos en un array de objetos con los datos y el ID
        const blogsBucket = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Incluir el ID del documento
            ...doc.data(), // Extraer los datos del documento
        }));

        return blogsBucket;
    } catch (error) {
        console.error("Error al cargar los blogs:", error);
        throw new Error("No se pudieron cargar los blogs"); // Lanzar un error para que React Router lo maneje
    }
};
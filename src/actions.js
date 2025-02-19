import { db } from "./firebase"; // Importa la instancia de Firestore
import { setDoc, doc, updateDoc } from "firebase/firestore"; // Funciones de Firestore
import { redirect } from "react-router-dom";
export const updateBlogAction = async ({request, params})=>{
    const formData = await request.formData();

    // Convertir FormData a un objeto plano
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    try {
        const blogId = params.idBlog; // Obtener el ID del blog desde los parámetros de la ruta
        const blogRef = doc(db, "blogs", blogId); // Referencia al documento en Firestore

        // Guardar los datos en Firestore
        await updateDoc(blogRef,data);
        // Devolver una respuesta de éxito
        return { ok: true, message: "Blog actualizado correctamente en Firestore" };
    } catch (error) {
        console.error("Error al guardar en Firestore:", error);
        // Devolver una respuesta de error
        return { ok: false, error: "Error al guardar en Firestore" };
    }
}


export const rootaction = async ({ request }) => {
    const formData = await request.formData();

  
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

   
    const idBlog = formData.get("idBlog");

    if (!idBlog) {
        console.error("Error: idBlog no proporcionado en el FormData");
        return { ok: false, error: "ID del blog no proporcionado" };
    }

    try {
        
        const blogRef = doc(db, "blogs", idBlog);

       
        await setDoc(blogRef, data);

        console.log("Documento añadido con ID:", idBlog);

       
        return redirect(`/updateBlog/${idBlog}`);
    } catch (error) {
        console.error("Error al guardar en Firestore:", error);
        // Devolver una respuesta de error
        return { ok: false, error: "Error al guardar en Firestore" };
    }
};
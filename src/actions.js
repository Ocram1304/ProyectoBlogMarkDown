export const updateBlogAction = async ({request})=>{
    const formData = await request.formData();

    // Convertir FormData a un objeto plano
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Mostrar los datos en la consola (para depuración)
    console.log("Datos recibidos:", data);
}
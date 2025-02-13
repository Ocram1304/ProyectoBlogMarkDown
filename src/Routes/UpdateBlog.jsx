import { useFetcher, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { BlogContext } from "../Context/context";

export default function UpdateBlog() {
    const fetcher = useFetcher();
    const [content, setContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [blogName, setBlogName] = useState("");
    const { state, dispatch } = useContext(BlogContext);
    const { idBlog } = useParams();

    // Cargar los datos del blog cuando el componente se monta o el ID cambia
    useEffect(() => {
        const loadBlogData = async () => {
            try {
                if (!state || state.length === 0) {
                    console.warn("El estado está vacío.");
                    return;
                }

                const blog = state.find((blog) => String(blog.idBlog) === String(idBlog));
                if (blog) {
                    console.log(state)
                    setBlogName(blog.nameBlog);
                    setContent(blog.contentBlog);
                 
                } else {
                    console.warn(`No se encontró el blog con ID: ${idBlog}`);
                }
            } catch (error) {
                console.error("Error al cargar los datos del blog:", error);
                // Puedes mostrar un mensaje de error al usuario o manejar el error de otra manera
            }
        };

        loadBlogData();
    }, [idBlog, state]);

    // Función para manejar el guardado
    const handleSave = () => {
        setShowModal(prev=>!prev);
    };

    // Función para confirmar el guardado
    const confirmSave = (event) => {
        event.preventDefault();

        // Actualizar el estado global
        dispatch({
            type: "UPDATE_BLOG",
            payload: {
                idBlog: idBlog,
                nameBlog: blogName,
                contentBlog: content,
            },
        });

        // Enviar datos al backend (opcional)
        const formData = new FormData();
        formData.append("action", "updateBlog");
        formData.append("name", blogName);
        formData.append("content", content);
        fetcher.submit(formData, { method: "post" });

        // Cerrar la ventana de confirmación
        setShowModal(false);
    };

    return (
        <>
            <div>
                {/* Editor de texto MD */}
                <div className="editor">
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        height={200}
                        placeholder="Escribe tu contenido aquí"
                    />
                </div>

                {/* Botones */}
                <div className="buttons">
                    <button type="button" name="deleteArticle">Borrar</button>
                    <button type="button" onClick={handleSave}>Guardar</button>
                </div>
            </div>

           
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Guardar cambios</h3>
                        <fetcher.Form onSubmit={confirmSave}>
                            <label htmlFor="blogName">Nombre del blog:</label>
                            <input
                                type="text"
                                id="blogName"
                                value={blogName}
                                onChange={(e) => setBlogName(e.target.value)}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit">Confirmar</button>
                            </div>
                        </fetcher.Form>
                    </div>
                </div>
            )}
        </>
    );
}
import { useParams, useFetcher } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { BlogContext } from "../Context/context";
import Modal from "./Modal";

export default function UpdateBlog() {
    
    //Datos del blog
    const [content, setContent] = useState("");
    const [blogName, setBlogName] = useState("");
    const { state, dispatch } = useContext(BlogContext);
    const { idBlog } = useParams();
    const fetcher = useFetcher();

    //Estados de las modales
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setshowModalDelete]= useState(false);
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

    //Función para manejar la eliminación del blog
    const handleDelete = ()=>{
        setshowModalDelete(prev=>!prev);
    }

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
        formData.append("action","updateBlog");
        formData.append("nameBlog", blogName);
        formData.append("contentBlog", content);
        fetcher.submit(formData, { method: "post" });

        setShowModal(false);
    };
    
    //Funcipon para manejar la eliminación del blog
    const confirmDelete = (event)=>{
        event.preventDefault();
        dispatch({
            type: "DELETE_BLOG",
            payload: {
                idBlog: idBlog,
                nameBlog: blogName,
                contentBlog: content,
            },
        });
         
         const formData = new FormData();
         formData.append("action", "deleteBlog");
         formData.append("nameBlog", blogName);
         formData.append("contentBlog", content);
         fetcher.submit(formData, { method: "post" });
 
         setshowModalDelete(false);
    }
    return (
        <>
            <div>
                {/* Editor de texto MD */}
                <div className="editor">
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        height={350}
                        placeholder={content}
                    />
                </div>

                {/* Botones */}
                <div className="buttons-updateBlog">
                    <button className="btn btn-danger" type="button" onClick={handleDelete}>Borrar</button>
                    <button className="btn btn-primary" type="button" onClick={handleSave}>Guardar</button>
                </div>
            </div>

           
            {showModal && (
                <Modal 
                typeSubmit={confirmSave}
                setBlogName={setBlogName}
                setShowModal={setShowModal}
                blogName={blogName}
                text={"save"}
                />    
            )}

            {showModalDelete && (
                <Modal 
                typeSubmit={confirmDelete}
                setBlogName={setBlogName}
                setShowModal={setshowModalDelete}
                blogName={blogName}
                text={"delete"}
                />    
            )}

           
        </>
    );
}
import { useFetcher } from "react-router-dom"
export default function Modal({
    typeSubmit,
    setBlogName,
    setShowModal,
    blogName,
    text,
}) {
    const fetcher = useFetcher();

    // Mapear el texto según la acción
    const modalText = {
        save: "Guardar cambios",
        delete: "Borrar Blog",
    }[text] || "Acción";

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{modalText}</h3>
                <fetcher.Form onSubmit={typeSubmit}>
                    {text === "save" && ( 
                        <>
                            <label htmlFor="blogName">Nombre del blog:</label>
                            <input
                                type="text"
                                id="blogName"
                                value={blogName}
                                onChange={(e) => setBlogName(e.target.value)}
                                required
                                placeholder={blogName}
                            />
                        </>
                    )}
                    <div className="modal-buttons">
                        <button type="button" onClick={() => setShowModal(false)}>
                            Cancelar
                        </button>
                        <button type="submit">Confirmar</button>
                    </div>
                </fetcher.Form>
            </div>
        </div>
    );
}
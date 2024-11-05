import React from "react";

function ItemTarea({ tarea, onDelete }) {

    return (
        <React.Fragment>
            <li>
                <h3>{tarea.nombreT}</h3>
                <p>{tarea.fechaT}</p>
                <button onClick={() => onDelete(tarea.id)}>Eliminar Tarea</button>
            </li>
        </React.Fragment>
    );
}

export default ItemTarea;

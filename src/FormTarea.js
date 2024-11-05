import React, { useState, useRef } from 'react';
import { firestore } from "./firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';
import SimpleReactValidator from 'simple-react-validator';

function FormuTareas({ addTarea }) {
    const [tarea, setTarea] = useState({ nombreT: '', fechaT: '' });
    const validador = useRef(new SimpleReactValidator());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarea({ ...tarea, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validador.current.allValid()) {
            try {
                const newTarea = { nombreT: tarea.nombreT, fechaT: tarea.fechaT };
                const docRef = await addDoc(collection(firestore, 'tareas'), newTarea);

                addTarea({ id: docRef.id, ...newTarea });
                setTarea({ nombreT: '', fechaT: '' });

            } catch (error) {
                console.error('Error al agregar Tarea:', error);
            }
        } else {
            validador.current.showMessages();
            setTarea({ ...tarea });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombreT"
                value={tarea.nombreT}
                onChange={handleChange}
                placeholder="Nombre de la Tarea"
            />
            {validador.current.message('nombreT', tarea.nombreT, 'required', { className: 'text-danger' })}
            <input
                type="date"
                name="fechaT"
                value={tarea.fechaT}
                onChange={handleChange}
                placeholder="Fecha Límite"
            />
            {validador.current.message('fechaT', tarea.fechaT, 'required', { className: 'text-danger' })}
            <button type="submit">Guardar nueva Tarea</button>
        </form>
    );
}

export default FormuTareas;

import React, { useEffect, useState } from "react";
import ItemTarea from "./ItemTarea";
import { firestore } from './firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

function ListaTareas() {
    const [tareas, setTarea] = useState([]);

    const fetchTareas = async () => {
        try {
            const colleccionT = collection(firestore, 'tareas');
            const snapshot = await getDocs(colleccionT);
            const tareasData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTarea(tareasData);
        } catch (error) {
            console.error('Error al obtener Tareas:', error);
        }
    };

    useEffect(() => {
        fetchTareas();
    }, []);

    const handleDelete = async (IdT) => {
        try {
            const tareaDoc = doc(firestore, 'tareas', IdT);
            await deleteDoc(tareaDoc);
            setTarea(tareas.filter((tarea) => tarea.id !== IdT));
        } catch (error) {
            console.error('Error al eliminar Tareas:', error);
        }
    };

    return (
        <div>
            <h3>Lista de Tareas</h3>
            {tareas.length > 0 ? (
                <ul>
                    {tareas.map((tarea) => (
                        <ItemTarea key={tarea.id} tarea={tarea} onDelete={handleDelete} />
                    ))}
                </ul>
            ) : (
                <h4>No hay Tareas Pendientes</h4>
            )}
        </div>
    );
}

export default ListaTareas;
import React, { useState } from 'react';
import ListaTareas from "./ListaTareas";
import FormTareas from "./FormTarea";


function AppPrincipal() {
  const [tareas, setTareas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  const addTarea = (tarea) => {
    setTareas((prevTareas) => [...prevTareas, tarea]);
  };


  return (
    <div>
      <h1>Listado de Tareas</h1>

      <ListaTareas tareas={tareas} />

      <button onClick={() => setMostrarForm(!mostrarForm)}>
        {mostrarForm ? 'Ocultar Formulario' : 'Agregar Tarea'}
      </button>
      {mostrarForm && <FormTareas addTarea={addTarea} />}
    </div>
  );
}

export default AppPrincipal;
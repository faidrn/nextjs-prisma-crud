"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


function NewPage({ params }) {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resolvedParams = React.use(params);
  useEffect(() => {
    // Cargando los datos desde la API/BD
    if (resolvedParams.id) {
      fetch(`/api/tasks/${resolvedParams.id}`)
      .then((res) => res.json()) 
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      });
    }
  }, []);

  const onSubmit = async (e) => {
          e.preventDefault();
          
          if (!resolvedParams.id) {
            // Crear una nueva tarea
            const res = await fetch('/api/tasks', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ title, description })
            });
            
            const data = await res.json(); 

          } else {
            // Actualizar una tarea existente
            const res = await fetch(`/api/tasks/${resolvedParams.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ title, description })
            });
            
            const data = await res.json(); 
          }
        

          router.push('/');
    };

  return (
    <div
      className="h-screen flex justify-center items-center"
    >
      <form
        className="bg-slate-800 p-10"
        onSubmit={onSubmit}
      >
        <label 
          htmlFor="title"
          className="font-bold text-sm"
        >
          Titulo de la tarea
        </label>
        <input 
          id="title"
          type="text" 
          className="border border-gray-400 p-2 mb-4 w-full bg-gray-200 text-black"
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label 
          htmlFor="description"
          className="font-bold text-sm"
        >
          Descripción de la tarea
        </label>
        <textarea 
          id="description"
          rows="3"
          className="bg-gray-200 text-black border border-gray-400 p-2 w-full mb-4"
          placeholder="Descripción de la tarea"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear
        </button>
      </form>
    </div>
  );
}

export default NewPage;
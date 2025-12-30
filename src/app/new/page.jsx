"use client";
import { useRouter } from "next/navigation";


function NewPage() {

  const router = useRouter();

  const onSubmit = async (e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;
          
          const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
          });

          const data = await res.json(); 
          console.log(data);

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
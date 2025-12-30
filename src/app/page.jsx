import { prisma } from "@/libs/prisma";

async function loadTasks() {
  // obteniendo de la base de datos
  return await prisma.task.findMany();

  // Obteniendo los datos desde nuestra API
  // const res = await fetch('http://localhost:3000/api/tasks');
  // const data = await res.json();
  //return data;
}

async function HomePage() {

  const tasks = await loadTasks();

  return (
    <section
      className="container mx-auto p-4"
    >
      <div
        className="grid grid-cols-3 gap-3 mt-2"
      >
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer"
          >
            <h3
              className="text-2xl font-bold mb-2"
            >
              {task.title}
            </h3>
            <p>{task.description}</p>
            <p>
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
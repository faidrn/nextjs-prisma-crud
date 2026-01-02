import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";

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
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
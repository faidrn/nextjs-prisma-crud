import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


// Consultar 
export async function GET(request, { params }) {
    const { id } = await params;
    const tasks = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json(tasks);
}

// Actualizar
export async function PUT(request, { params }) {
    const { id } = await params;
    const data = await request.json();

    const taskUpdate = await prisma.task.update({
      where: { id: Number(id) },
      data: data
    });
    
    return NextResponse.json(taskUpdate);
}

// Eliminar
export async function DELETE(request, { params }) {
    const { id } = await params;
     try {
        const taskRemove = await prisma.task.delete({
        where: { id: Number(id) },
        });
        console.log(taskRemove);

        return NextResponse.json(taskRemove);
     } catch (error) {
        return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
     }
}
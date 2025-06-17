import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("GET todos error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, description, status }= await request.json();

    if (!title || !status) {
      return NextResponse.json(
        { message: "Title and status are required" },
        { status: 400 }
      );
    }

    

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
        status,
        userId
      }
    });

    return NextResponse.json(
      { message: "Todo created successfully", todo },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST todo error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Todo ID is required" },
        { status: 400 }
      );
    }

    
    const existingTodo = await prisma.todo.findUnique({
      where: { id }
    });

    if (!existingTodo || existingTodo.userId !== userId) {
      return NextResponse.json(
        { message: "Todo not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.todo.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE todo error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
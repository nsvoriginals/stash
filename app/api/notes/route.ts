import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// Input validation schema
const noteSchema = {
  create: {
    title: (value: string) => value.length >= 1 && value.length <= 255,
    content: (value: string) => value.length >= 1,
  },
  update: {
    id: (value: string) => !!value,
    title: (value: string) => value.length >= 1 && value.length <= 255,
    content: (value: string) => value.length >= 1,
  }
};

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("GET notes error:", error);
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

    const { title, content } = await request.json();

    // Basic validation
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    if (!noteSchema.create.title(title) || !noteSchema.create.content(content)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId
      }
    });

    return NextResponse.json(
      { message: "Note created successfully", note },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST note error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, title, content } = await request.json();

    // Basic validation
    if (!id || !title || !content) {
      return NextResponse.json(
        { message: "ID, title and content are required" },
        { status: 400 }
      );
    }

    if (!noteSchema.update.id(id) || !noteSchema.update.title(title) || !noteSchema.update.content(content)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Check if note exists and belongs to user
    const existingNote = await prisma.note.findUnique({
      where: { id }
    });

    if (!existingNote || existingNote.userId !== userId) {
      return NextResponse.json(
        { message: "Note not found or unauthorized" },
        { status: 404 }
      );
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
       
      }
    });

    return NextResponse.json(
      { message: "Note updated successfully", note: updatedNote },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT note error:", error);
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
        { message: "Note ID is required" },
        { status: 400 }
      );
    }

    // Check if note exists and belongs to user
    const existingNote = await prisma.note.findUnique({
      where: { id }
    });

    if (!existingNote || existingNote.userId !== userId) {
      return NextResponse.json(
        { message: "Note not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.note.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE note error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
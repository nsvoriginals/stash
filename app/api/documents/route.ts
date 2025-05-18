import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// Input validation schema
const documentSchema = {
  create: {
    title: (value: string) => value.length >= 1 && value.length <= 255,
    docLink: (value: string) => value.startsWith('http') || value.startsWith('/'),
  },
  update: {
    id: (value: string) => !!value,
    title: (value: string) => value.length >= 1 && value.length <= 255,
    docLink: (value: string) => value.startsWith('http') || value.startsWith('/'),
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

    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("GET documents error:", error);
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

    const { title, description, docLink } = await request.json();

    // Basic validation
    if (!title || !docLink) {
      return NextResponse.json(
        { message: "Title and document link are required" },
        { status: 400 }
      );
    }

    if (!documentSchema.create.title(title) || !documentSchema.create.docLink(docLink)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const document = await prisma.document.create({
      data: {
        title,
        description: description || null,
        docLink,
        userId
      }
    });

    return NextResponse.json(
      { message: "Document created successfully", document },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST document error:", error);
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

    const { id, title, description, docLink } = await request.json();

    // Basic validation
    if (!id || !title || !docLink) {
      return NextResponse.json(
        { message: "ID, title and document link are required" },
        { status: 400 }
      );
    }

    if (!documentSchema.update.id(id) || !documentSchema.update.title(title) || !documentSchema.update.docLink(docLink)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Check if document exists and belongs to user
    const existingDocument = await prisma.document.findUnique({
      where: { id }
    });

    if (!existingDocument || existingDocument.userId !== userId) {
      return NextResponse.json(
        { message: "Document not found or unauthorized" },
        { status: 404 }
      );
    }

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        title,
        description: description || null,
        docLink,
       
      }
    });

    return NextResponse.json(
      { message: "Document updated successfully", document: updatedDocument },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT document error:", error);
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
        { message: "Document ID is required" },
        { status: 400 }
      );
    }

    // Check if document exists and belongs to user
    const existingDocument = await prisma.document.findUnique({
      where: { id }
    });

    if (!existingDocument || existingDocument.userId !== userId) {
      return NextResponse.json(
        { message: "Document not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.document.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Document deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE document error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
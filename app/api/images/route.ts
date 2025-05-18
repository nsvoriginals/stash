import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// Input validation schema
const imageSchema = {
  create: {
    title: (value: string) => value.length >= 1 && value.length <= 255,
    imgLink: (value: string) => value.startsWith('http') || value.startsWith('/'),
  },
  update: {
    id: (value: string) => !!value,
    title: (value: string) => value.length >= 1 && value.length <= 255,
    imgLink: (value: string) => value.startsWith('http') || value.startsWith('/'),
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

    const images = await prisma.image.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("GET images error:", error);
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

    const { title, description, imgLink } = await request.json();

    // Basic validation
    if (!title || !imgLink) {
      return NextResponse.json(
        { message: "Title and image link are required" },
        { status: 400 }
      );
    }

    if (!imageSchema.create.title(title) || !imageSchema.create.imgLink(imgLink)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const image = await prisma.image.create({
      data: {
        title,
        description: description || null,
        imgLink,
        userId
      }
    });

    return NextResponse.json(
      { message: "Image created successfully", image },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST image error:", error);
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

    const { id, title, description, imgLink } = await request.json();

    // Basic validation
    if (!id || !title || !imgLink) {
      return NextResponse.json(
        { message: "ID, title and image link are required" },
        { status: 400 }
      );
    }

    if (!imageSchema.update.id(id) || !imageSchema.update.title(title) || !imageSchema.update.imgLink(imgLink)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Check if image exists and belongs to user
    const existingImage = await prisma.image.findUnique({
      where: { id }
    });

    if (!existingImage || existingImage.userId !== userId) {
      return NextResponse.json(
        { message: "Image not found or unauthorized" },
        { status: 404 }
      );
    }

    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        title,
        description: description || null,
        imgLink,
       
      }
    });

    return NextResponse.json(
      { message: "Image updated successfully", image: updatedImage },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT image error:", error);
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
        { message: "Image ID is required" },
        { status: 400 }
      );
    }

    // Check if image exists and belongs to user
    const existingImage = await prisma.image.findUnique({
      where: { id }
    });

    if (!existingImage || existingImage.userId !== userId) {
      return NextResponse.json(
        { message: "Image not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.image.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE image error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
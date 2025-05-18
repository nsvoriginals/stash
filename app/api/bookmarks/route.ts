import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// Input validation schema
const bookmarkSchema = {
  create: {
    title: (value: string) => value.length >= 1 && value.length <= 255,
    bookmarkLink: (value: string) => value.startsWith('http') || value.startsWith('/'),
  },
  update: {
    id: (value: string) => !!value,
    title: (value: string) => value.length >= 1 && value.length <= 255,
    bookmarkLink: (value: string) => value.startsWith('http') || value.startsWith('/'),
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

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("GET bookmarks error:", error);
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

    const { title, description, bookmarkLink } = await request.json();

    // Basic validation
    if (!title || !bookmarkLink) {
      return NextResponse.json(
        { message: "Title and bookmark link are required" },
        { status: 400 }
      );
    }

    if (!bookmarkSchema.create.title(title) || !bookmarkSchema.create.bookmarkLink(bookmarkLink)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        title,
        description: description || null,
        bookmarkLink,
        userId
      }
    });

    return NextResponse.json(
      { message: "Bookmark created successfully", bookmark },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST bookmark error:", error);
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
        { message: "Bookmark ID is required" },
        { status: 400 }
      );
    }

    // Check if bookmark exists and belongs to user
    const existingBookmark = await prisma.bookmark.findUnique({
      where: { id }
    });

    if (!existingBookmark || existingBookmark.userId !== userId) {
      return NextResponse.json(
        { message: "Bookmark not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.bookmark.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Bookmark deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE bookmark error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
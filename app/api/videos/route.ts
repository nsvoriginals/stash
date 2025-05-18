import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

const YOUTUBE_ID_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;


const videoSchema = {
  create: {
    title: (value: string) => value.length >= 1 && value.length <= 255,
    videoUrl: (value: string) => YOUTUBE_ID_REGEX.test(value),
  },
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

    const videos = await prisma.video.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("GET videos error:", error);
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

    const { title, description, videoUrl } = await request.json();

    // Basic validation
    if (!title || !videoUrl) {
      return NextResponse.json(
        { message: "Title and video URL are required" },
        { status: 400 }
      );
    }

    if (!videoSchema.create.title(title) || !videoSchema.create.videoUrl(videoUrl)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Extract video ID from URL
    const match = videoUrl.match(YOUTUBE_ID_REGEX);
    if (!match || !match[1]) {
      return NextResponse.json(
        { message: "Invalid YouTube URL format" },
        { status: 400 }
      );
    }
    const videoId = match[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Check if video already exists for this user
    const existingVideo = await prisma.video.findFirst({
      where: {
        vidLink: embedUrl,
        userId
      }
    });

    if (existingVideo) {
      return NextResponse.json(
        { message: "This video is already saved" },
        { status: 409 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || null,
        vidLink: embedUrl,
        userId
      }
    });

    return NextResponse.json(
      { message: "Video saved successfully", video },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST video error:", error);
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
        { message: "Video ID is required" },
        { status: 400 }
      );
    }

    // Check if video exists and belongs to user
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    if (!existingVideo || existingVideo.userId !== userId) {
      return NextResponse.json(
        { message: "Video not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.video.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Video deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE video error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
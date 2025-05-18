import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
// Regex to extract tweet ID from various Twitter URL formats
const TWEET_ID_REGEX = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/i;

// Input validation schema
const tweetSchema = {
  create: {
    title: (value: string) => value.length >= 1 && value.length <= 255,
    tweetUrl: (value: string) => TWEET_ID_REGEX.test(value),
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

    const tweets = await prisma.tweet.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(tweets);
  } catch (error) {
    console.error("GET tweets error:", error);
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

    const { title, description, tweetUrl } = await request.json();

    // Basic validation
    if (!title || !tweetUrl) {
      return NextResponse.json(
        { message: "Title and tweet URL are required" },
        { status: 400 }
      );
    }

    if (!tweetSchema.create.title(title) || !tweetSchema.create.tweetUrl(tweetUrl)) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Extract tweet ID from URL
    const match = tweetUrl.match(TWEET_ID_REGEX);
    if (!match || !match[1]) {
      return NextResponse.json(
        { message: "Invalid Twitter URL format" },
        { status: 400 }
      );
    }
    const tweetId = match[1];

    // Check if tweet already exists for this user
    const existingTweet = await prisma.tweet.findFirst({
      where: {
        tweetId,
        userId
      }
    });

    if (existingTweet) {
      return NextResponse.json(
        { message: "This tweet is already saved" },
        { status: 409 }
      );
    }

    const tweet = await prisma.tweet.create({
      data: {
        title,
        description: description || null,
        tweetId,
        userId
      }
    });

    return NextResponse.json(
      { message: "Tweet saved successfully", tweet },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST tweet error:", error);
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
        { message: "Tweet ID is required" },
        { status: 400 }
      );
    }

    // Check if tweet exists and belongs to user
    const existingTweet = await prisma.tweet.findUnique({
      where: { id }
    });

    if (!existingTweet || existingTweet.userId !== userId) {
      return NextResponse.json(
        { message: "Tweet not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.tweet.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Tweet deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE tweet error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
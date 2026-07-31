import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ratelimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    // 1. Identify the user (prefer Clerk userId, fallback to IP address)
    const { userId } = await auth();
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const identifier = userId ?? ip;

    // 2. Check rate limit
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          }
        }
      );
    }

    // 3. Your main API logic goes here (e.g., saving a post to Sanity or your database)
    const body = await req.json();
    // TODO: Add database/Sanity write logic

    return NextResponse.json({ 
      success: true, 
      message: "Post created successfully!" 
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
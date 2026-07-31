import { NextResponse } from "next/server";
// Replace line 2 with this:
import { ratelimit } from "../../../lib/ratelimit";

export async function GET(request: Request) {
  // Use a mock or IP identifier
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { 
        error: "Rate limit exceeded! Slow down.",
        limit,
        remaining,
        reset 
      },
      { status: 429 }
    );
  }

  return NextResponse.json({
    message: "Request allowed!",
    limit,
    remaining,
  });
}
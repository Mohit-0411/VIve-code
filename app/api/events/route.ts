import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// 1. POST: Create and save an event with midnight TTL
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, eventName, eventDate } = body; 

    if (!eventId || !eventDate) {
      return NextResponse.json(
        { error: "Missing eventId or eventDate" }, 
        { status: 400 }
      );
    }

    const now = new Date();
    const targetDate = new Date(eventDate);
    targetDate.setHours(24, 0, 0, 0); 

    const secondsUntilMidnight = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

    if (secondsUntilMidnight <= 0) {
      return NextResponse.json(
        { error: "The target date has already passed." }, 
        { status: 400 }
      );
    }

    await redis.set(
      `event:${eventId}`, 
      JSON.stringify({ eventId, eventName, eventDate }), 
      { ex: secondsUntilMidnight }
    );

    return NextResponse.json({ 
      success: true, 
      message: `Event successfully created and will automatically delete at midnight on ${eventDate}.`,
      expires_in_seconds: secondsUntilMidnight
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// 2. GET: Fetch all active events that haven't expired yet
export async function GET() {
  try {
    const keys = await redis.keys("event:*");
    
    if (keys.length === 0) {
      return NextResponse.json({ events: [] });
    }

    const events = await redis.mget(...keys);
    const parsedEvents = events.map(event => 
      typeof event === "string" ? JSON.parse(event) : event
    );

    return NextResponse.json({ events: parsedEvents });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, category, message } = body;

    // Basic Validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // TODO: Add your email sending (e.g., Resend/Nodemailer) or Database save here
    console.log("Contact form submission received:", {
      fullName,
      email,
      category,
      message,
    });

    return NextResponse.json(
      { message: "Inquiry received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
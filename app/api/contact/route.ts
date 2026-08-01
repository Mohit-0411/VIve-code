import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, category, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Send email via Resend
    const data = await resend.emails.send({
      from: "Sahityik Contact <onboarding@resend.dev>", // Resend's default sender for testing
      to: ["bsmohit112@gmail.com"], // Your Gmail address where you want to receive inquiries
      replyTo: email, // Replying directly responds to the person who filled out the form
      subject: `New Inquiry: ${category || "General Inquiry"} - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
          <h2>New Event Contact Inquiry</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Category:</strong> ${category}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Inquiry received successfully!", data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error." },
      { status: 500 }
    );
  }
}
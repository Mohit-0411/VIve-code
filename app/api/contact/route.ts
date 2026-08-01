import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { message: "Server misconfiguration: missing API key." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { fullName, email, category, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Sahityik Contact <onboarding@resend.dev>",
      to: ["mohitsharmauprety@gmail.com"],
      replyTo: email,
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

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: error.message || "Failed to deliver email." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Inquiry received successfully!", data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("API Contact Error:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error." },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Prepare message payload
    const timestamp = new Date().toISOString();
    console.log(`[Contact Form] Message from ${name} (${email}) - ${subject || "No Subject"}`);
    console.log(`[Message Content]:`, message);

    // If an external SMTP or Resend API KEY is provided in environment variables, send real email:
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["jatianthony@gmail.com"],
          subject: `[Portfolio Contact] ${subject || "New Inquiry"} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nTimestamp: ${timestamp}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Resend delivery failed:", errData);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message was successfully received! Anthony will respond promptly.",
      data: { name, email, subject, timestamp },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "A server issue occurred while transmitting. Please reach out via direct email." },
      { status: 500 }
    );
  }
}

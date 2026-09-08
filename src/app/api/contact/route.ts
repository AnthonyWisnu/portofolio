import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format alamat email tidak valid." },
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
          from: "Portofolio Contact <onboarding@resend.dev>",
          to: ["jatianthony@gmail.com"],
          subject: `[Portfolio Contact] ${subject || "Pesan Baru"} dari ${name}`,
          text: `Nama: ${name}\nEmail: ${email}\nSubjek: ${subject}\n\nPesan:\n${message}\n\nWaktu: ${timestamp}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Resend delivery failed:", errData);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Pesan Anda berhasil diterima! Anthony akan segera membalasnya.",
      data: { name, email, subject, timestamp },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Terjadi kendala saat memproses pesan. Silakan gunakan email langsung." },
      { status: 500 }
    );
  }
}

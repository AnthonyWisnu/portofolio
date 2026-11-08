import { NextResponse } from "next/server";
import { OWNER_PROFILE } from "@/data/owner";
import { validateContactPayload } from "@/utils/validators";
import type { ContactFormPayload } from "@/types/portfolio";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactFormPayload>;

    const payload: ContactFormPayload = {
      name: String(body.name || ""),
      email: String(body.email || ""),
      topic: String(body.topic || "Diskusi Umum"),
      message: String(body.message || ""),
      website: body.website ? String(body.website) : "",
    };

    const validation = validateContactPayload(payload);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Data formulir tidak valid." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Layanan pengiriman email otomatis server belum aktif. Gunakan tombol email langsung di bawah untuk mengirim pesan Anda.",
          fallbackMailto: true,
        },
        { status: 503 }
      );
    }

    const timestamp = new Date().toISOString();
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portofolio AWJ <onboarding@resend.dev>",
        to: [OWNER_PROFILE.email],
        reply_to: payload.email.trim(),
        subject: `[Portofolio] ${payload.topic} dari ${payload.name.trim()}`,
        text: [
          `Nama: ${payload.name.trim()}`,
          `Email: ${payload.email.trim()}`,
          `Topik: ${payload.topic}`,
          `Waktu: ${timestamp}`,
          "",
          "Pesan:",
          payload.message.trim(),
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const errDetail = await res.text();
      console.error("[Contact API] Resend error:", res.status, errDetail);
      return NextResponse.json(
        {
          error:
            "Pengiriman melalui server email sedang terganggu. Silakan lanjutkan menggunakan aplikasi email langsung.",
          fallbackMailto: true,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pesan Anda berhasil terkirim! Anthony akan segera merespons ke email Anda.",
    });
  } catch (error) {
    console.error("[Contact API] Fatal error:", error);
    return NextResponse.json(
      {
        error:
          "Terjadi gangguan internal saat memproses pesan. Silakan gunakan tombol email langsung di bawah.",
        fallbackMailto: true,
      },
      { status: 500 }
    );
  }
}

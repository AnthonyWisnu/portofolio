import { NextResponse } from "next/server";
import { OWNER_PROFILE } from "@/data/owner";
import { checkContactRateLimit, resolveClientIp } from "@/utils/rateLimiter";
import { sanitizeHeaderText, validateContactPayload } from "@/utils/validators";
import type { ContactFormPayload } from "@/types/portfolio";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Format permintaan harus berupa JSON yang valid." },
        { status: 415 }
      );
    }

    const clientIp = resolveClientIp(req);
    const rate = checkContactRateLimit(clientIp);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Batas pengiriman pesan sementara tercapai. Silakan coba lagi dalam ${rate.retryAfterSeconds} detik atau hubungi email langsung.`,
          fallbackMailto: true,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfterSeconds),
          },
        }
      );
    }

    const body = (await req.json()) as Partial<ContactFormPayload>;

    const payload: ContactFormPayload = {
      name: String(body.name || ""),
      email: String(body.email || ""),
      topic: String(body.topic || "Diskusi Umum"),
      message: String(body.message || ""),
      website: body.website ? String(body.website) : "",
      formStartedAt: typeof body.formStartedAt === "number" ? body.formStartedAt : undefined,
    };

    const validation = validateContactPayload(payload, { enforceFillDuration: true });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Data formulir tidak valid." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || OWNER_PROFILE.email;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() || "Portofolio AWJ <onboarding@resend.dev>";

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Layanan email server menunggu aktivasi kunci API (.env). Gunakan tombol email langsung di bawah untuk mengirim pesan Anda sekarang.",
          fallbackMailto: true,
        },
        { status: 503 }
      );
    }

    const cleanName = sanitizeHeaderText(payload.name);
    const cleanEmail = sanitizeHeaderText(payload.email);
    const cleanTopic = sanitizeHeaderText(payload.topic).slice(0, 80) || "Diskusi Umum";
    const cleanMessage = payload.message.trim();
    const timestamp = new Date().toISOString();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: cleanEmail,
        subject: `[Portofolio] ${cleanTopic} dari ${cleanName}`,
        text: [
          `Nama: ${cleanName}`,
          `Email: ${cleanEmail}`,
          `Topik: ${cleanTopic}`,
          `Waktu: ${timestamp}`,
          `IP Klien: ${clientIp}`,
          "",
          "Pesan:",
          cleanMessage,
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

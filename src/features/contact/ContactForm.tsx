"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Mail, Send } from "lucide-react";
import { OWNER_PROFILE } from "@/data/owner";
import { validateContactPayload } from "@/utils/validators";
import { submitContactInquiry } from "@/services/contactService";
import { cn } from "@/utils/cn";

const TOPIC_OPTIONS = [
  "Kolaborasi Proyek",
  "Sistem Fullstack / SaaS",
  "Otomasi & Pipeline",
  "Diskusi Riset AI",
  "Sapa Singkat",
];

const FIELD_INPUT_CLS =
  "w-full px-4 py-2.5 rounded-xl bg-[#F5F4EF] border border-[#E4E1D8] text-sm text-[#141519] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2F54EB] transition-colors";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; text?: string; fallbackMailto?: boolean }>({ type: "idle" });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((prev) => Math.max(0, prev - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const mailtoHref = `mailto:${OWNER_PROFILE.email}?subject=${encodeURIComponent(
    `[Portofolio] ${topic} - ${name || "Pengunjung"}`
  )}&body=${encodeURIComponent(
    `${message || "Halo Anthony, saya ingin berdiskusi mengenai..."}\n\nDikirim oleh: ${name || "-"} (${email || "-"})`
  )}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldown > 0 || submitting) return;

    const payload = { name, email, topic, message, website };
    const check = validateContactPayload(payload);
    if (!check.valid) {
      setStatus({ type: "error", text: check.error });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "idle" });
    try {
      const result = await submitContactInquiry(payload);
      setStatus({ type: "success", text: result.message || "Pesan berhasil dikirim! Anthony akan segera merespons." });
      setName("");
      setEmail("");
      setMessage("");
      setCooldown(60);
    } catch (err) {
      const error = err as Error & { fallbackMailto?: boolean };
      setStatus({ type: "error", text: error.message || "Terjadi kendala saat menghubungi server.", fallbackMailto: Boolean(error.fallbackMailto) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E4E1D8] p-6 sm:p-8 soft-card-shadow">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <label className="block font-mono text-xs uppercase tracking-wider text-[#52555E]">Topik Diskusi</label>
          <div className="flex flex-wrap gap-2">
            {TOPIC_OPTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTopic(item)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                  topic === item
                    ? "bg-[#2F54EB] border-[#2F54EB] text-white"
                    : "bg-[#F5F4EF] border-[#E4E1D8] text-[#52555E] hover:border-[#2F54EB]/45 hover:text-[#141519]"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="block text-xs font-semibold text-[#141519]">Nama Lengkap</label>
            <input id="contact-name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Budi Santoso" className={FIELD_INPUT_CLS} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="block text-xs font-semibold text-[#141519]">Alamat Email</label>
            <input id="contact-email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@perusahaan.com" className={FIELD_INPUT_CLS} />
          </div>
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-website">Situs Web</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="block text-xs font-semibold text-[#141519]">Detail Pesan</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ceritakan konteks sistem, jadwal kolaborasi, atau hal teknis yang ingin dibahas..."
            className={`${FIELD_INPUT_CLS} py-3 resize-y`}
          />
        </div>

        {status.type !== "idle" && (
          <div role="status" className={cn("p-4 rounded-xl border text-xs leading-relaxed space-y-2.5", status.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-950")}>
            <div className="flex items-start gap-2.5">
              {status.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />}
              <span>{status.text}</span>
            </div>
            {status.fallbackMailto && (
              <a href={mailtoHref} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2F54EB] text-white font-mono text-[11px] hover:bg-[#2342C8] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>Lanjutkan Lewat Aplikasi Email</span>
              </a>
            )}
          </div>
        )}

        <button type="submit" disabled={submitting || cooldown > 0} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2F54EB] hover:bg-[#2342C8] disabled:bg-[#9CA3AF] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed">
          <Send className="w-4 h-4" />
          <span>{submitting ? "Mengirim Pesan..." : cooldown > 0 ? `Tunggu ${cooldown} detik sebelum mengirim lagi` : "Kirim Pesan Sekarang"}</span>
        </button>
      </form>
    </div>
  );
}

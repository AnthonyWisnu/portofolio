"use client";

import { useState } from "react";
import { OWNER_INFO } from "@/data/projects";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { InstagramIcon, ThreadsIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Kerjasama Proyek / Fullstack System",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim pesan.");
      }

      setStatus("success");
      setFeedback("Pesan Anda telah berhasil terkirim! Terima kasih telah menghubungi.");
      setForm({
        name: "",
        email: "",
        subject: "Kerjasama Proyek / Fullstack System",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      const errMsg = err instanceof Error ? err.message : "Terjadi kendala jaringan.";
      setFeedback(errMsg);
    }
  };

  // Pre-fill mailto link fallback
  const mailtoUrl = `mailto:${OWNER_INFO.email}?subject=${encodeURIComponent(
    form.subject || "Pesan dari Portofolio"
  )}&body=${encodeURIComponent(
    `Halo Anthony,\n\nNama: ${form.name || "[Nama]"}\nEmail: ${form.email || "[Email]"}\n\nPesan:\n${form.message || ""}\n`
  )}`;

  return (
    <footer
      id="contact"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-x-clip"
    >
      <div className="rounded-3xl bg-neutral-950 text-white p-5 sm:p-8 lg:p-12 relative overflow-hidden shadow-2xl border border-neutral-800 max-w-full">
        {/* Subtle red accent ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative z-10">
          {/* Left Column: Contact Information & Direct Links */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-900/60 text-red-400 font-mono text-xs uppercase tracking-widest font-semibold w-fit">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                04 / Contact & Connect
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                Mari Berdiskusi & Berkolaborasi.
              </h2>

              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                Punya ide sistem perangkat lunak, tawaran proyek, atau ingin berdiskusi seputar arsitektur teknologi? Kirimkan pesan Anda melalui formulir di samping atau hubungi langsung lewat saluran resmi.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3">
              <a
                href={`mailto:${OWNER_INFO.email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase">Direct Email</div>
                  <div className="text-sm font-semibold text-white">{OWNER_INFO.email}</div>
                </div>
              </a>

              <a
                href={OWNER_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-300">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase">GitHub Profile</div>
                    <div className="text-sm font-semibold text-white">github.com/AnthonyWisnu</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Social Media Channels */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-red-500" />
                <span>Social Presence // Media Sosial</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* Instagram */}
                <a
                  href={OWNER_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center transition-colors mb-1.5">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-white">Instagram</span>
                  <span className="text-[10px] font-mono text-neutral-400 truncate max-w-full">
                    {OWNER_INFO.socials.instagramHandle}
                  </span>
                </a>

                {/* Threads */}
                <a
                  href={OWNER_INFO.socials.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-200 group-hover:bg-white group-hover:text-neutral-950 flex items-center justify-center transition-colors mb-1.5">
                    <ThreadsIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-white">Threads</span>
                  <span className="text-[10px] font-mono text-neutral-400 truncate max-w-full">
                    {OWNER_INFO.socials.threadsHandle}
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href={OWNER_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors mb-1.5">
                    <FacebookIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-white">Facebook</span>
                  <span className="text-[10px] font-mono text-neutral-400 truncate max-w-full">
                    {OWNER_INFO.socials.facebookHandle}
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-4 space-y-1.5 font-mono text-xs text-neutral-500 border-t border-neutral-800/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Universitas Udayana (Bali) &bull; Asal: Klaten, Jawa Tengah</span>
              </div>
              <div className="text-neutral-400 pt-0.5">
                Domain Resmi: <span className="text-red-400 font-semibold">{OWNER_INFO.domain}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Width Professional Interactive Contact Form */}
          <div className="w-full h-full bg-neutral-900/70 rounded-3xl border border-neutral-800 p-5 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-xl max-w-full">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">
                    Kirim Pesan ke Anthony
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Pesan terkirim langsung ke {OWNER_INFO.email}
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Direct Form
                </span>
              </div>

              {status === "success" ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 my-8 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-semibold text-emerald-300">Pesan Berhasil Terkirim!</h4>
                    <p className="text-sm text-neutral-300 leading-relaxed max-w-md mx-auto font-light">
                      {feedback}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{feedback}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name (Dari Siapa) */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-neutral-300">
                        Nama Lengkap / Dari Siapa <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / PT Perusahaan"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:border-red-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-neutral-300">
                        Alamat Email Anda <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="nama@perusahaan.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject / Topik */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300">
                      Topik / Kebutuhan Proyek
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-hidden focus:border-red-500 transition-colors"
                    >
                      <option value="Kerjasama Proyek / Fullstack System">Kerjasama Proyek / Fullstack System</option>
                      <option value="Pengembangan Bot & Otomasi (WhatsApp / Telegram)">Pengembangan Bot & Otomasi (WhatsApp / Telegram)</option>
                      <option value="AI & GraphRAG Retrieval Architecture">AI & GraphRAG Retrieval Architecture</option>
                      <option value="Peluang Karir / Internship / Full-time">Peluang Karir / Internship / Full-time</option>
                      <option value="Diskusi Teknis / Lainnya">Diskusi Teknis / Lainnya</option>
                    </select>
                  </div>

                  {/* Message (Pesan) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300">
                      Pesan Anda <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tuliskan deskripsi proyek, pertanyaan, atau detail kolaborasi yang ingin Anda bahas..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:border-red-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action & Mailto Fallback */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 w-full">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] text-center"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirim Pesan Sekarang</span>
                        </>
                      )}
                    </button>

                    <a
                      href={mailtoUrl}
                      className="text-xs font-mono text-neutral-400 hover:text-white underline underline-offset-4 transition-colors text-center sm:text-right py-1"
                    >
                      Buka di Email App &rarr;
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Form Security & Response Guarantee Badge */}
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Direct encrypted delivery to {OWNER_INFO.email}</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Respon cepat dalam 24 jam</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} {OWNER_INFO.name}. All rights reserved.
          </div>
          <div>
            Official Domain: <span className="text-neutral-300 font-semibold">{OWNER_INFO.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

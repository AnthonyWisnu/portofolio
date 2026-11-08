"use client";

import { ContactChannels } from "@/features/contact/ContactChannels";
import { ContactForm } from "@/features/contact/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F5F4EF] text-[#141519] border-t border-[#E4E1D8]"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2F54EB] font-semibold">
              04 / Kanal Kontak
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#141519]">
              Diskusi &amp; Kolaborasi Sistem.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#52555E] leading-relaxed">
            Punya kebutuhan arsitektur web, otomasi operasional, atau ingin meninjau salah satu repositori di atas? Kirim pesan langsung melalui formulir atau email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <ContactChannels />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

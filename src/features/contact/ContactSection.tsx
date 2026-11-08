import { ContactChannels } from "@/features/contact/ContactChannels";
import { ContactForm } from "@/features/contact/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-[#0F131C] to-[#0B0D12] text-[#F3F4F6] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Hubungi Saya
        </h2>

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

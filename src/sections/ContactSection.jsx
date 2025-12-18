import React from "react";
import ContactCard from "../components/ContactCard";

export default function ContactSection() {
  return (
    <section className="space-y-4 border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
        Got any questions?
      </p>
      <p className="max-w-2xl pt-3 text-sm text-slate-200">
        If you have any questions regarding our services, please contact a
        member of our professional team so we can talk about it.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <ContactCard />
      </div>
    </section>
  );
}

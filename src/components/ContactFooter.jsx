import React from "react";
import ContactCard from "./ContactCard";

export default function ContactFooter() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          Got any questions?
        </p>
        <p className="mt-2 text-xs text-slate-300 md:text-sm">
          Have a question about your project or the 2025 regulations? Use the
          details on the right, or include a draft summary from the document
          builder when you get in touch.
        </p>
      </div>
      <div>
        <ContactCard compact />
      </div>
    </div>
  );
}

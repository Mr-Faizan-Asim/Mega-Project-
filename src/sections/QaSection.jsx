import React from "react";

export default function QaSection() {
  return (
    <section className="space-y-4 border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
        Q&A assistance
      </p>
      <p className="max-w-2xl pt-3 text-sm leading-relaxed text-slate-200">
        This section will be powered by Megaplan&apos;s AI assistant. You will
        be able to ask free-text questions about the 2025 building regulations,
        upload project details, and receive structured answers linked to your
        compliance journey.
      </p>

      <div className="border border-dashed border-slate-700 bg-black px-4 py-4 text-sm text-slate-200 rounded-lg">
        <p className="font-semibold text-slate-50">
          Coming soon: live AI Q&amp;A
        </p>
        <p className="mt-1 text-xs md:text-sm">
          For now, you can use the Help button in the bottom corner to see how
          the chat layout will look. In a later phase, this will connect to live
          AI services and your project data.
        </p>
      </div>
    </section>
  );
}

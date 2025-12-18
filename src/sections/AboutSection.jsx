import React from "react";

export default function AboutSection() {
  return (
    <section className="space-y-5 border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          About Megaplan
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
          Megaplan provides architecture and construction design services with a
          strong focus on Building Information Modelling (BIM), sustainability
          and practical compliance. The team combines experience in CAD and BIM
          workflows with an understanding of real-world project constraints.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-slate-800 bg-black p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-50 md:text-base">
            Why this compliance platform?
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-200 md:text-sm">
            The 2025 building regulations introduce tighter requirements and
            more complexity. This platform is designed as an extension of the
            main Megaplan website, giving clients and collaborators a simple,
            guided way to explore obligations and prepare the right documents.
          </p>
        </div>

        <div className="border border-slate-800 bg-black p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-50 md:text-base">
            Who is it for?
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-200 md:text-sm">
            It is built primarily for homeowners, small developers and
            professionals who prefer clear, step-by-step guidance rather than
            technical jargon. The layout, wording and navigation are kept simple
            so that anyone can follow the process at their own pace.
          </p>
        </div>
      </div>

      <div className="border border-slate-800 bg-black px-4 py-3 text-sm text-slate-200 rounded-lg">
        As regulations change, this platform will evolve with updated guidance,
        additional tools and closer integration with Megaplan projects.
      </div>
    </section>
  );
}

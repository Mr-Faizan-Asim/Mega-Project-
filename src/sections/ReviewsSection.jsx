import React from "react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Residential client – London",
      rating: 5,
      text: "Megaplan helped us understand exactly what was required for our extension. The process felt clear and well explained.",
    },
    {
      name: "Small developer – Southeast England",
      rating: 4,
      text: "The guidance around regulations and risk was very practical. Looking forward to using the full AI assistant.",
    },
    {
      name: "Consultant partner",
      rating: 5,
      text: "Having a structured summary we can share with the wider team is extremely helpful, especially at early design stages.",
    },
  ];

  return (
    <section className="space-y-4 border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
            Reviews & feedback
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Example feedback based on typical Megaplan projects. Live Google
            review integration will be added later.
          </p>
        </div>
        <div className="hidden flex-col items-end text-right text-xs text-slate-400 md:flex">
          <span className="font-semibold text-slate-100">
            ★ 4.8 / 5 (sample)
          </span>
          <span>Average satisfaction across recent projects.</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={r.name}
            className="flex flex-col border border-slate-800 bg-black p-4 rounded-lg"
          >
            <div className="mb-1 text-sm font-semibold text-slate-50">
              {r.name}
            </div>
            <div className="mb-2 text-xs text-slate-200">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>
            <p className="text-xs leading-relaxed text-slate-200 md:text-sm">
              {r.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

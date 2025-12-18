import React, { useState } from "react";

export default function FaqSection() {
  const faqs = [
    {
      q: "What are the 2025 building regulations?",
      a: "They are an updated set of UK requirements covering energy efficiency, safety, accessibility and environmental performance. This platform is designed to help you interpret them in the context of real projects.",
    },
    {
      q: "Do I need an account to use the platform?",
      a: "You can read the FAQs, About and Reviews without signing in. Creating an account unlocks the Q&A assistant, direct contact area and the document builder.",
    },
    {
      q: "Will the AI assistant replace professional advice?",
      a: "No. The AI assistant is designed to support, not replace, professional judgement. Final responsibility for design, specification and compliance always remains with qualified professionals.",
    },
    {
      q: "Can I export or email compliance summaries?",
      a: "Yes – the document builder is designed to generate quote-ready summaries that can be emailed to project teams. The email and export features will be connected in a later phase.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          Frequently Asked Questions
        </p>
      </div>

      <div className="divide-y divide-slate-800">
        {faqs.map((item, index) => {
          const open = index === openIndex;
          return (
            <button
              key={item.q}
              onClick={() =>
                setOpenIndex((prev) => (prev === index ? -1 : index))
              }
              className="w-full py-3 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-50">
                    {item.q}
                  </p>
                  {open && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-200 md:text-sm">
                      {item.a}
                    </p>
                  )}
                </div>
                <span className="mt-1 text-lg text-slate-500">
                  {open ? "−" : "+"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

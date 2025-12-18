import React from "react";

export default function HomeSection({ isAuthenticated, onGetStarted }) {
  return (
    <div className="space-y-8">
      {/* First block */}
      <section className="border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
        <h1 className="mb-2 text-xl font-semibold md:text-2xl tracking-wide">
          Welcome to the 2025 Building Regulations Compliance Platform
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
          Use this interactive platform to understand, plan and communicate
          compliance for your projects. Explore the FAQs, learn more about
          Megaplan, and see how the step-by-step journey turns complex
          regulations into clear, practical actions.
        </p>

        {!isAuthenticated && (
          <div className="mt-4 border border-slate-700 bg-black px-4 py-3 text-sm text-slate-100 rounded-sm">
            You can browse the FAQ, About and Reviews without signing in.
            Create an account to unlock Q&amp;A assistance, the contact area and
            the document builder.
          </div>
        )}
      </section>

      {/* Second block */}
      <section className="border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
            Your compliance journey
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              step: 1,
              title: "Capture project context",
              body: "Outline the project type, location, scale and key stakeholders so the platform can align guidance to the right 2025 regulations.",
            },
            {
              step: 2,
              title: "Guided Q&A assistance",
              body: "Walk through structured questions with AI-supported prompts to clarify obligations, grey areas and documentation needs.",
            },
            {
              step: 3,
              title: "Automated risk highlighting",
              body: "See potential compliance risks flagged early, helping you address issues before they affect programme, cost or safety.",
            },
            {
              step: 4,
              title: "Quote-ready summary",
              body: "Generate a concise, shareable summary that can be sent to clients, consultants and contractors as part of your project pack.",
            },
          ].map((card) => (
            <div
              key={card.step}
              className="flex gap-3 border border-slate-800 bg-black/95 p-4 rounded-lg"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                {card.step}
              </div>
              <div>
                <h3 className="text-sm font-semibold md:text-base">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-200 md:text-sm">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!isAuthenticated && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={onGetStarted}
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 focus:ring-offset-black"
            >
              Get started
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

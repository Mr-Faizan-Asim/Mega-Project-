import React from "react";

export default function DocumentBuilderSection({
  form,
  onChange,
  onBuild,
  draftSummary,
}) {
  return (
    <section className="space-y-5 border border-slate-800 bg-black px-4 py-5 shadow-sm md:px-6 md:py-6 rounded-lg">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          Document builder
        </p>
        <h2 className="mt-3 mb-1 text-xl font-semibold tracking-wide">
          Quote-ready compliance summary
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200">
          Collect the core information needed for a concise, shareable summary.
          In later phases, this summary will be refined by AI and emailed
          directly to the project team.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form */}
        <div className="space-y-3 text-sm">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Recipient email (project contact)
            </label>
            <input
              type="email"
              value={form.recipientEmail}
              onChange={(e) => onChange("recipientEmail", e.target.value)}
              className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
              placeholder="e.g. project.manager@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Project scope description
            </label>
            <textarea
              rows={3}
              value={form.projectScope}
              onChange={(e) => onChange("projectScope", e.target.value)}
              className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
              placeholder="Briefly describe the works, property type, location and key objectives."
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Known risks or points to highlight
            </label>
            <textarea
              rows={3}
              value={form.knownRisks}
              onChange={(e) => onChange("knownRisks", e.target.value)}
              className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
              placeholder="Planning constraints, structural concerns, fire strategy items, access issues, etc."
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Dispute prevention – clarifications or assumptions
            </label>
            <textarea
              rows={3}
              value={form.disputePrevention}
              onChange={(e) =>
                onChange("disputePrevention", e.target.value)
              }
              className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
              placeholder="List any assumptions, exclusions or clarifications that reduce risk of misunderstanding."
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Preferred contact wording / tone
            </label>
            <textarea
              rows={2}
              value={form.contactWording}
              onChange={(e) => onChange("contactWording", e.target.value)}
              className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
              placeholder="e.g. formal summary, friendly explanation, bullet-pointed next steps."
            />
          </div>

          <button
            type="button"
            onClick={onBuild}
            className="mt-2 w-full bg-white px-4 py-3 text-sm font-semibold text-black rounded-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 focus:ring-offset-black"
          >
            Build draft summary
          </button>
        </div>

        {/* Preview */}
        <div className="flex flex-col border border-slate-800 bg-black p-4 text-sm rounded-lg">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-50">
              Preview – draft compliance summary
            </p>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-100">
              Prototype only
            </span>
          </div>
          <p className="mb-2 text-xs text-slate-300 md:text-sm">
            This is a front-end preview. In a later phase, the content below
            will be sent to AI services for refinement, then emailed to the
            project team from Megaplan&apos;s systems.
          </p>
          <pre className="mt-2 flex-1 overflow-auto bg-black px-3 py-2 text-xs leading-relaxed text-slate-100 md:text-sm border border-slate-800 rounded-sm">
            {draftSummary ||
              "Add details on the left and click “Build draft summary” to see a preview here."}
          </pre>
        </div>
      </div>
    </section>
  );
}

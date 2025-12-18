import React from "react";

export default function SidebarNav({
  navItems,
  activeSection,
  onSelectSection,
}) {
  const CHATBOT_URL = "https://zesty-fox-03999c.netlify.app/";

  return (
    <aside className="hidden w-60 flex-shrink-0 border-r border-slate-800 bg-black px-3 py-4 md:block">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
        Navigation
      </p>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex w-full items-center px-3 py-2 text-left text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white border-l-2 border-white"
                  : "text-slate-200 border-l border-transparent hover:bg-slate-900"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Chatbot button at bottom */}
      <div className="mt-4 border-t border-slate-800 pt-4">
        <a
          href={CHATBOT_URL}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-slate-200"
        >
          Chatbot
        </a>
      </div>
    </aside>
  );
}

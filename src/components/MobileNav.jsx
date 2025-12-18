import React from "react";

export default function MobileNav({
  navItems,
  activeSection,
  onSelectSection,
}) {
  return (
    <div className="mb-4 flex gap-2 overflow-auto md:hidden">
      {navItems.map((item) => {
        const active = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectSection(item.id)}
            className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium ${
              active ? "bg-white text-black" : "bg-slate-900 text-slate-200"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

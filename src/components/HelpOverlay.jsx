import React from "react";
import HelpChatShell from "./HelpChatShell";

export default function HelpOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-black md:inset-6 md:rounded-lg md:border md:border-slate-700 md:shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 md:px-6">
        <div>
          <h2 className="text-base font-semibold md:text-lg">
            Megaplan AI Help
          </h2>
          <p className="text-xs text-slate-400 md:text-sm">
            Prototype chat – live AI assistance will be wired in later.
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full border border-slate-600 bg-black px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-black md:text-sm"
        >
          Close
        </button>
      </div>
      <HelpChatShell />
    </div>
  );
}

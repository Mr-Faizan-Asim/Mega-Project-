import React from "react";

export default function Header({
  isAuthenticated,
  userName,
  onSignOut,
  onSignInClick,
}) {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-black px-4 py-3 md:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-lg font-bold tracking-tight text-black">
          M
        </div>
        <div>
          <div className="text-base font-semibold md:text-lg tracking-wide uppercase">
            MEGAPLAN COMPLIANCE
          </div>
          <div className="text-xs text-slate-400 md:text-sm">
            2025 Building Regulations – Interactive Platform
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <span className="hidden text-xs text-slate-400 md:inline-block">
            Signed in as <span className="font-medium">{userName}</span>
          </span>
        )}

        {isAuthenticated ? (
          <button
            onClick={onSignOut}
            className="rounded-full border border-slate-500 bg-black px-4 py-2 text-xs font-medium text-slate-100 shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 focus:ring-offset-black md:text-sm"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={onSignInClick}
            className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 focus:ring-offset-black md:text-sm"
          >
            Sign in / Create account
          </button>
        )}
      </div>
    </header>
  );
}

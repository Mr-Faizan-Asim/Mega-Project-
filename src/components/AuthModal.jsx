import React from "react";

export default function AuthModal({
  authMode,
  setAuthMode,
  authMessage,
  authForm,
  onFieldChange,
  onSubmit,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-700 bg-black p-6 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-50">
            {authMode === "signin"
              ? "Sign in to Megaplan Compliance"
              : "Create a Megaplan Compliance account"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-xs font-medium text-slate-400 hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        {/* Toggle */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-700 bg-black p-1 text-xs md:text-sm">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signin");
                // clear message handled from parent if desired; here just visual parity
              }}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                authMode === "signin"
                  ? "bg-white text-black shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
              }}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                authMode === "signup"
                  ? "bg-white text-black shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Create account
            </button>
          </div>
        </div>

        {authMessage && (
          <div className="mb-3 bg-slate-900 px-3 py-2 text-xs text-slate-100 md:text-sm rounded">
            {authMessage}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          {authMode === "signup" && (
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-200">
                  First name
                </label>
                <input
                  type="text"
                  value={authForm.firstName}
                  onChange={(e) =>
                    onFieldChange("firstName", e.target.value)
                  }
                  className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-200">
                  Last name
                </label>
                <input
                  type="text"
                  value={authForm.lastName}
                  onChange={(e) =>
                    onFieldChange("lastName", e.target.value)
                  }
                  className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              value={authForm.email}
              onChange={(e) => onFieldChange("email", e.target.value)}
              className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              value={authForm.password}
              onChange={(e) => onFieldChange("password", e.target.value)}
              className="w-full border border-slate-600 bg-black px-3 py-3 text-sm text-slate-100 rounded-sm focus:border-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-white px-4 py-3 text-sm font-semibold text-black rounded-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 focus:ring-offset-black"
          >
            {authMode === "signin" ? "Sign in" : "Continue"}
          </button>

          <p className="mt-2 text-[11px] leading-snug text-slate-400">
            This is a front-end prototype. Authentication and account security
            will be connected to Megaplan’s live systems at a later stage.
          </p>
        </form>
      </div>
    </div>
  );
}

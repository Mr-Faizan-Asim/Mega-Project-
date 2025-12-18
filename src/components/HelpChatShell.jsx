import React, { useState } from "react";

export default function HelpChatShell() {
  const [messages, setMessages] = useState([
    {
      from: "system",
      text: "Welcome to the Megaplan help chat. In the live version, an AI assistant will answer questions about the 2025 building regulations and this platform.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages = [
      ...messages,
      { from: "user", text: trimmed },
      {
        from: "assistant",
        text: "This is a design-only preview. In the full version, this reply will come from the AI assistant, tailored to your project and question.",
      },
    ];
    setMessages(nextMessages);
    setInput("");
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-auto bg-black px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.map((m, idx) => {
            const isUser = m.from === "user";
            const isSystem = m.from === "system";
            return (
              <div
                key={idx}
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed md:text-sm rounded-lg ${
                    isSystem
                      ? "bg-slate-800 text-slate-100"
                      : isUser
                      ? "bg-white text-black"
                      : "bg-slate-900 text-slate-100 border border-slate-700"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSend}
        className="border-t border-slate-800 bg-black px-4 py-3 md:px-6"
      >
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question about 2025 building regulations…"
            className="flex-1 rounded-full border border-slate-700 bg-black px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 focus:ring-offset-black md:text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

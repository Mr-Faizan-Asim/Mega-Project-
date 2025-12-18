import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from "../api.js";
import { useAuth } from "../state/AuthContext.jsx";
import "./Chat.css";


export default function Chat() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setSending(true);
    setError('');

    try {
      const data = await sendChatMessage({ message: trimmed, token });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'No reply from assistant.' },
      ]);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: ' + (err.message || 'Unknown error') },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    // Enter = send, Shift+Enter = newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, sending]);

  return (
    <div className="chat-page">
      {/* Top header */}
      <header className="chat-header">
        <div className="chat-header-left">
          <div className="chat-avatar">M</div>
          <div>
            <div className="chat-title">Mega Planner</div>
            <div className="chat-subtitle">
              {sending ? 'Assistant is typing…' : 'Online • Building your compliance plan'}
            </div>
          </div>
        </div>
        <div className="chat-header-right">
          <span className="chat-tag">Regulations</span>
          <span className="chat-tag">Planning</span>
        </div>
      </header>

      {/* Messages area */}
      <main className="chat-body">
        {messages.length === 0 && (
          <div className="chat-empty">
            <h3>Start your planning conversation</h3>
            <p>
              Ask anything about building regulations, compliance steps, or how to structure your
              Mega Plan. I’ll guide you step by step.
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message-row ${
              msg.role === 'user' ? 'chat-message-row-user' : 'chat-message-row-assistant'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="chat-bubble-avatar assistant-avatar">M</div>
            )}

            <div
              className={`chat-bubble ${
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
              }`}
            >
              <div className="chat-bubble-label">
                {msg.role === 'user' ? 'You' : 'Mega Planner'}
              </div>
              <div className="chat-bubble-text">{msg.content}</div>
            </div>

            {msg.role === 'user' && (
              <div className="chat-bubble-avatar user-avatar">Y</div>
            )}
          </div>
        ))}

        {sending && (
          <div className="chat-message-row chat-message-row-assistant">
            <div className="chat-bubble-avatar assistant-avatar">M</div>
            <div className="chat-bubble chat-bubble-assistant">
              <div className="chat-bubble-label">Mega Planner</div>
              <div className="chat-bubble-text">
                <span className="typing-dot" /> 
                <span className="typing-dot" /> 
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Error message */}
      {error && (
        <div className="chat-error">
          {error}
        </div>
      )}

      {/* Input area */}
      <footer className="chat-input-bar">
        <textarea
          className="chat-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Mega Planner about your project, regulations, or compliance..."
          rows={2}
        />
        <button
          className="chat-send-button"
          onClick={handleSend}
          disabled={sending || !input.trim()}
        >
          {sending ? 'Sending…' : 'Send'}
        </button>
      </footer>
    </div>
  );
}

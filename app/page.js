"use client";

import { useState } from "react";

export default function Page() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setMessages([...messages, { role: "user", text: query }, { role: "assistant", text: data.output }]);
    setQuery("");
  }

  return (
    <div>
      <h1>Assistant Chat</h1>
      <div>
        {messages.map((m, i) => (
          <p key={i}><b>{m.role}:</b> {m.text}</p>
        ))}
      </div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

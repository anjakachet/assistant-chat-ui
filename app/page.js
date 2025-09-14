"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://node-js-runner.vercel.app/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      const assistantMessage = {
        role: "assistant",
        content: data.output || "(no response)",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error connecting to Assistant." },
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4">
        <h1 className="text-xl font-bold mb-4">💬 Assistant Chat</h1>
        <div className="h-96 overflow-y-auto border p-2 mb-4 rounded">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-2 ${
                m.role === "user" ? "text-blue-600" : "text-green-700"
              }`}
            >
              <b>{m.role}:</b> {m.content}
            </div>
          ))}
          {loading && <div className="text-gray-500">⏳ Assistant is typing…</div>}
        </div>
        <form onSubmit={sendMessage} className="flex">
          <input
            className="flex-grow border rounded-l px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            type="submit"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

// ── Brand ─────────────────────────────────────────────────────────────────────
const BRAND = {
  name: "Anivana",
  tagline: "কোটি AI-এর দুনিয়ায় স্বাগতম",
  accent: "#a78bfa",      // soft violet
  accentDim: "#2d1f4e",
  accentGlow: "rgba(167,139,250,0.15)",
};

// ── API Configuration ─────────────────────────────────────────────────────────
// এখানে শুধুমাত্র প্রথম API Key-টি দেওয়া হলো
const API_KEY = "AIzaSyAq2VaTQv_o5LXKBQ9HOs5sxxr9Jv_scs4";

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { emoji: "🌸", label: "Anime & Manga" },
  { emoji: "👻", label: "Spooky & Paranormal" },
  { emoji: "🕵️", label: "Detective & Mystery" },
  { emoji: "🏆", label: "Sports Coaches" },
  { emoji: "🎸", label: "Musicians" },
  { emoji: "🤖", label: "Sci-Fi & Robots" },
  { emoji: "🧙", label: "Fantasy & Magic" },
  { emoji: "☠️", label: "Zombie Apocalypse" },
  { emoji: "👑", label: "Royalty" },
  { emoji: "💼", label: "Crime Bosses" },
  { emoji: "🐉", label: "Mythical Creatures" },
  { emoji: "🌊", label: "Ocean & Nature" },
];

const BOTS = [
  { id: 1, name: "Aiko", desc: "Cheerful anime companion", emoji: "🌸", msgs: "2.1M", tag: "Anime" },
  { id: 2, name: "Detective Kane", desc: "Solve mysteries together", emoji: "🕵️", msgs: "980K", tag: "Mystery" },
  { id: 3, name: "Luna", desc: "Spooky paranormal guide", emoji: "🌙", msgs: "1.4M", tag: "Spooky" },
  { id: 4, name: "Coach Rex", desc: "Push your limits every day", emoji: "🏆", msgs: "670K", tag: "Sports" },
  { id: 5, name: "Zara", desc: "Galactic sci-fi traveller", emoji: "🤖", msgs: "530K", tag: "Sci-Fi" },
  { id: 6, name: "Merlin", desc: "Ancient wizard of wisdom", emoji: "🧙", msgs: "890K", tag: "Fantasy" },
];

// ── Chat View Logic ───────────────────────────────────────────────────────────
function ChatView({ botData, onBack }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(botData?.messages || []);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;

    const userTime = new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
    const userMsg = { from: "user", text: input, time: userTime };
    
    setMessages(p => [...p, userMsg]);
    setInput("");
    setTyping(true);

    try {
      // Gemini API কল
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: `You are ${botData.bot.name}, ${botData.bot.desc}. Respond in Bengali naturally. User message: ${input}` }] 
          }]
        })
      });

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "দুঃখিত, আমি উত্তর দিতে পারছি না।";
      const botTime = new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });

      setMessages(p => [...p, { from: "bot", text: botText, time: botTime }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(p => [...p, { from: "bot", text: "সার্ভারে সমস্যা হচ্ছে।", time: "এখন" }]);
    } finally {
      setTyping(false);
    }
  };

  // ... (বাকি UI কোড আগের মতোই থাকবে)
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#050505" }}>
        {/* Header, Messages Area, Input Area আগের মতো বসিয়ে দিন */}
    </div>
  );
}

// ── App Component ─────────────────────────────────────────────────────────────
export default function App() {
    // ... (আপনার মূল ফাইলের App লজিক)
}

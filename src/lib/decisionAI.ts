export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const BACKEND_URL = "http://localhost:8000";

const suggestions = [
  "Should I quit my job?",
  "How to prioritize my 5 urgent tasks?",
  "Do a SWOT analysis on moving to a new city.",
  "I'm feeling overwhelmed with work.",
  "Pros and cons of buying a house vs renting.",
];

export async function getAIResponse(input: string, history: Message[] = []): Promise<string> {
  try {
    const formattedHistory = history.map(m => ({ role: m.role, content: m.content }));
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, history: formattedHistory }),
    });

    if (!response.ok) throw new Error("Backend unavailable");
    
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("AI Fetch Error:", error);
    return "⚠️ **Connection Error.** Please make sure the backend is running on port 8000.";
  }
}

export function getSuggestions(): string[] {
  return suggestions.sort(() => Math.random() - 0.5).slice(0, 3);
}

export function createMessage(role: "user" | "assistant", content: string): Message {
  return { id: crypto.randomUUID(), role, content, timestamp: new Date() };
}

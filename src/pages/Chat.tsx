import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, RotateCcw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SuggestionChips } from "@/components/SuggestionChips";
import { streamChat, type Msg } from "@/lib/streamChat";
import { createMessage, type Message } from "@/lib/decisionAI";

const WELCOME: Message = createMessage(
  "assistant",
  "👋 **Welcome to AI Study Assistant!**\n\nI'm powered by **Google Gemini AI** and connected to real-world knowledge. Ask me anything — study questions, concept explanations, or even how you're feeling.\n\n*Try one of the suggestions below, or type your own!*"
);

const initialSuggestions = [
  "Explain quantum entanglement simply",
  "Help me study for a calculus exam",
  "What are the causes of World War I?",
  "Explain recursion in programming",
  "I'm feeling stressed about exams",
  "Tips for effective note-taking",
];

function getRandomSuggestions() {
  return [...initialSuggestions].sort(() => Math.random() - 0.5).slice(0, 3);
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(getRandomSuggestions);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg = createMessage("user", trimmed);
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      setSuggestions([]);

      // Build message history for AI
      const chatHistory: Msg[] = messages
        .filter((m) => m !== WELCOME)
        .map((m) => ({ role: m.role, content: m.content }));
      chatHistory.push({ role: "user", content: trimmed });

      let assistantSoFar = "";
      const assistantId = crypto.randomUUID();

      try {
        await streamChat({
          messages: chatHistory,
          onDelta: (chunk) => {
            assistantSoFar += chunk;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.id === assistantId) {
                return prev.map((m) => (m.id === assistantId ? { ...m, content: assistantSoFar } : m));
              }
              return [...prev, { id: assistantId, role: "assistant", content: assistantSoFar, timestamp: new Date() }];
            });
          },
          onDone: () => {
            setIsTyping(false);
            setSuggestions(getRandomSuggestions());
          },
          onError: (error) => {
            toast.error(error);
            setIsTyping(false);
            setSuggestions(getRandomSuggestions());
          },
        });
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong. Please try again.");
        setIsTyping(false);
        setSuggestions(getRandomSuggestions());
      }
    },
    [isTyping, messages]
  );

  const handleReset = () => {
    setMessages([WELCOME]);
    setSuggestions(getRandomSuggestions());
    setInput("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg h-[85vh] max-h-[700px] glass-strong rounded-3xl flex flex-col overflow-hidden glow-primary"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">AI Study Assistant</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Powered by Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Reset chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="mx-4 mt-3 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
          Tip: Ask follow-up questions like “explain simpler” or “give me a quiz question” for better study flow.
        </div>

        {/* Messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && messages[messages.length - 1]?.role !== "assistant" && <TypingIndicator />}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && !isTyping && (
          <div className="px-3 pb-2">
            <SuggestionChips suggestions={suggestions} onSelect={sendMessage} />
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-border/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              aria-label="Study question input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any study question..."
              className="flex-1 bg-muted/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-shadow font-body"
              maxLength={500}
              disabled={isTyping}
            />
            <button
              aria-label="Send message"
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
            <span>Press Enter to send</span>
            <span>{input.length}/500</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

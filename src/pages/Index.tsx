import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SuggestionChips } from "@/components/SuggestionChips";
import { getAIResponse, getSuggestions, createMessage, type Message } from "@/lib/decisionAI";

const WELCOME: Message = createMessage(
  "assistant",
  "👋 **Welcome to Decision AI!**\n\nI'm here to help you figure out what to do based on how you're feeling. Describe your current mood or situation, and I'll give you actionable advice.\n\n*Try one of the suggestions below, or type your own!*"
);

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(getSuggestions);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg = createMessage("user", trimmed);
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      setSuggestions([]);

      setTimeout(() => {
        const response = getAIResponse(trimmed);
        setMessages((prev) => [...prev, createMessage("assistant", response)]);
        setIsTyping(false);
        setSuggestions(getSuggestions());
      }, 800 + Math.random() * 600);
    },
    [isTyping]
  );

  const handleReset = () => {
    setMessages([WELCOME]);
    setSuggestions(getSuggestions());
    setInput("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg h-[85vh] max-h-[700px] glass-strong rounded-3xl flex flex-col overflow-hidden glow-primary"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">Decision AI</h1>
              <p className="text-xs text-muted-foreground">Your mood-based advisor</p>
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

        {/* Messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe how you're feeling..."
              className="flex-1 bg-muted/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-shadow font-body"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

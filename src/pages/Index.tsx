import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Send, Sparkles, RotateCcw, BrainCircuit } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SuggestionChips } from "@/components/SuggestionChips";
import { getAIResponse, getSuggestions, createMessage, type Message } from "@/lib/decisionAI";

const WELCOME: Message = createMessage(
  "assistant",
  "## Decision Intelligence\n\nI am your **ADK-powered Agent**. Describe your situation, and I will apply specialized decision frameworks (SWOT, Eisenhower, etc.) to help you move forward.\n\n*Select a prompt below to begin.*"
);

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(getSuggestions);
  const chatRef = useRef<HTMLDivElement>(null);

  // 3D Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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

      try {
        const response = await getAIResponse(trimmed, messages);
        setMessages((prev) => [...prev, createMessage("assistant", response)]);
      } finally {
        setIsTyping(false);
        setSuggestions(getSuggestions());
      }
    },
    [isTyping, messages]
  );

  const handleReset = () => {
    setMessages([WELCOME]);
    setSuggestions(getSuggestions());
    setInput("");
  };

  return (
    <div 
      className="min-h-screen bg-background flex items-center justify-center p-6 perspective-1000 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-2xl h-[85vh] bg-card border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-lg flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-primary text-primary-foreground flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Decision AI</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">ADK Agent Layer Active</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Reset session"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-thin">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 transition-all"
            >
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary animate-spin" />
              </div>
              <TypingIndicator />
            </motion.div>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-6 bg-card border-t border-border z-10">
          {suggestions.length > 0 && !isTyping && (
            <div className="mb-4">
              <SuggestionChips suggestions={suggestions} onSelect={sendMessage} />
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about a decision or analyze a situation..."
              className="flex-1 bg-muted/30 border border-border rounded-sm px-4 py-4 text-sm outline-none focus:border-primary transition-colors font-medium"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-6 rounded-sm bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 disabled:opacity-20 transition-all flex items-center gap-2 shadow-lg"
            >
              Analyze <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

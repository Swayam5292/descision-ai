import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, RotateCcw, ArrowLeft, LogOut, PanelLeftOpen, PanelLeftClose, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SuggestionChips } from "@/components/SuggestionChips";
import { ChatSidebar } from "@/components/ChatSidebar";
import { streamChat, type Msg } from "@/lib/streamChat";
import { createMessage, type Message } from "@/lib/decisionAI";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  fetchConversations,
  createConversation,
  deleteConversation,
  fetchMessages,
  saveMessage,
  type Conversation,
} from "@/lib/chatHistory";

const WELCOME: Message = createMessage(
  "assistant",
  "👋 **Welcome to Descision AI!**\n\nI'm your study assistant for concept learning, exam prep, and clear explanations. Ask anything and I'll respond with practical, easy-to-follow guidance."
);

const initialSuggestions = [
  "Explain quantum entanglement simply",
  "Help me study for a calculus exam",
  "What are the causes of World War I?",
  "Explain recursion in programming",
  "Tips for effective note-taking",
];

function getRandomSuggestions() {
  return [...initialSuggestions].sort(() => Math.random() - 0.5).slice(0, 3);
}

export default function Chat() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(getRandomSuggestions);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("descision-ai-theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("descision-ai-theme", theme);
  }, [theme]);

  // Auto-open sidebar on desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(true);
  }, [isMobile]);

  const scrollToBottom = useCallback(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    fetchConversations().then(setConversations).catch(console.error);
  }, []);

  const loadConversation = useCallback(async (convId: string) => {
    setActiveConvId(convId);
    if (isMobile) setSidebarOpen(false);
    try {
      const dbMsgs = await fetchMessages(convId);
      const loaded: Message[] = dbMsgs.map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant",
        content: m.content,
        timestamp: new Date(m.created_at),
      }));
      setMessages(loaded.length > 0 ? loaded : [WELCOME]);
      setSuggestions(getRandomSuggestions());
    } catch {
      toast.error("Failed to load conversation");
    }
  }, [isMobile]);

  const handleNewChat = useCallback(() => {
    setActiveConvId(null);
    setMessages([WELCOME]);
    setSuggestions(getRandomSuggestions());
    setInput("");
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const handleDeleteConv = useCallback(async (id: string) => {
    try {
      await deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConvId === id) handleNewChat();
      toast.success("Conversation deleted");
    } catch {
      toast.error("Failed to delete conversation");
    }
  }, [activeConvId, handleNewChat]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      let convId = activeConvId;

      if (!convId) {
        try {
          const conv = await createConversation(trimmed.slice(0, 50));
          convId = conv.id;
          setActiveConvId(convId);
          setConversations((prev) => [conv, ...prev]);
        } catch {
          toast.error("Failed to create conversation");
          return;
        }
      }

      const userMsg = createMessage("user", trimmed);
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      setSuggestions([]);

      saveMessage(convId, "user", trimmed).catch(console.error);

      const chatHistory: Msg[] = messages
        .filter((m) => m !== WELCOME)
        .map((m) => ({ role: m.role, content: m.content }));
      chatHistory.push({ role: "user", content: trimmed });

      let assistantSoFar = "";
      const assistantId = crypto.randomUUID();
      const finalConvId = convId;

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
            if (assistantSoFar) {
              saveMessage(finalConvId, "assistant", assistantSoFar).catch(console.error);
            }
          },
          onError: (error) => {
            toast.error(error);
            setIsTyping(false);
            setSuggestions(getRandomSuggestions());
          },
        });
      } catch {
        toast.error("Something went wrong. Please try again.");
        setIsTyping(false);
        setSuggestions(getRandomSuggestions());
      }
    },
    [isTyping, messages, activeConvId]
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl h-[95vh] sm:h-[90vh] max-h-[860px] rounded-2xl sm:rounded-3xl border border-border/20 bg-card/70 backdrop-blur-xl flex overflow-hidden"
      >
        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={isMobile ? "absolute left-0 top-0 bottom-0 z-30" : ""}>
          <ChatSidebar
            conversations={conversations}
            activeId={activeConvId}
            onSelect={loadConversation}
            onNew={handleNewChat}
            onDelete={handleDeleteConv}
            isOpen={sidebarOpen}
          />
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-border/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSidebarOpen((p) => !p)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-base sm:text-lg font-semibold text-foreground truncate">Descision AI</h1>
                <p className="text-[11px] text-muted-foreground hidden sm:block">Personal academic assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={handleNewChat} className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors" title="New chat">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={handleSignOut} className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors" title="Sign out">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tip - hide on small screens */}
          <div className="mx-3 sm:mx-4 mt-2 sm:mt-3 rounded-lg border border-primary/10 bg-primary/5 px-3 py-2 text-[11px] sm:text-xs text-muted-foreground hidden sm:block">
            Tip: Ask for summaries, quiz questions, or step-by-step breakdowns to improve retention.
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
                >
                  <ChatMessage message={msg} />
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && messages[messages.length - 1]?.role !== "assistant" && <TypingIndicator />}
          </div>

          {/* Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="px-3 pb-2"
              >
                <SuggestionChips suggestions={suggestions} onSelect={sendMessage} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="p-2 sm:p-3 border-t border-border/20">
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
                className="flex-1 bg-muted/30 text-foreground placeholder:text-muted-foreground rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow font-body"
                maxLength={500}
                disabled={isTyping}
              />
              <button
                aria-label="Send message"
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-opacity shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] sm:text-[11px] text-muted-foreground">
              <span>Press Enter to send</span>
              <span>{input.length}/500</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

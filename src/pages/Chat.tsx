import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, RotateCcw, ArrowLeft, LogOut, PanelLeftOpen, PanelLeftClose } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

  // Load conversations on mount
  useEffect(() => {
    fetchConversations().then(setConversations).catch(console.error);
  }, []);

  const loadConversation = useCallback(async (convId: string) => {
    setActiveConvId(convId);
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
    } catch (e) {
      console.error(e);
      toast.error("Failed to load conversation");
    }
  }, []);

  const handleNewChat = useCallback(() => {
    setActiveConvId(null);
    setMessages([WELCOME]);
    setSuggestions(getRandomSuggestions());
    setInput("");
  }, []);

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

      // Create conversation if needed
      if (!convId) {
        try {
          const conv = await createConversation(trimmed.slice(0, 50));
          convId = conv.id;
          setActiveConvId(convId);
          setConversations((prev) => [conv, ...prev]);
        } catch (e) {
          console.error(e);
          toast.error("Failed to create conversation");
          return;
        }
      }

      const userMsg = createMessage("user", trimmed);
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      setSuggestions([]);

      // Save user message
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
            // Save assistant message
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
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong. Please try again.");
        setIsTyping(false);
        setSuggestions(getRandomSuggestions());
      }
    },
    [isTyping, messages, activeConvId]
  );

  const handleReset = () => handleNewChat();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl h-[90vh] max-h-[860px] glass-strong rounded-3xl flex overflow-hidden glow-primary"
      >
        {/* Sidebar */}
        <ChatSidebar
          conversations={conversations}
          activeId={activeConvId}
          onSelect={loadConversation}
          onNew={handleNewChat}
          onDelete={handleDeleteConv}
          isOpen={sidebarOpen}
        />

        {/* Main Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-between px-5 py-4 border-b border-border/30"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((p) => !p)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                title="Toggle sidebar"
              >
                {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
              </button>
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
                <h1 className="font-display text-lg font-semibold text-foreground">Descision AI</h1>
                <p className="text-xs text-muted-foreground">Personal academic assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={handleReset} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" title="New chat">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={handleSignOut} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" title="Sign out">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Tip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mx-4 mt-3 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground"
          >
            Tip: Ask for summaries, quiz questions, or step-by-step breakdowns to improve retention.
          </motion.div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i === messages.length - 1 ? 0.05 : 0 }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="px-3 pb-2"
              >
                <SuggestionChips suggestions={suggestions} onSelect={sendMessage} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-3 border-t border-border/30"
          >
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
              <motion.button
                aria-label="Send message"
                type="submit"
                disabled={!input.trim() || isTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
            <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
              <span>Press Enter to send</span>
              <span>{input.length}/500</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

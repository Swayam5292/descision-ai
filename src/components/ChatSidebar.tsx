import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Trash2, Plus } from "lucide-react";
import type { Conversation } from "@/lib/chatHistory";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
}

export function ChatSidebar({ conversations, activeId, onSelect, onNew, onDelete, isOpen }: ChatSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full border-r border-border/30 flex flex-col overflow-hidden shrink-0"
        >
          <div className="p-3 border-b border-border/30">
            <button
              onClick={onNew}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary/15 text-primary px-3 py-2.5 text-sm font-medium hover:bg-primary/25 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
            <AnimatePresence>
              {conversations.map((conv) => (
                <motion.button
                  key={conv.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => onSelect(conv.id)}
                  className={`w-full group flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    activeId === conv.id
                      ? "bg-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate flex-1">{conv.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 shrink-0 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.button>
              ))}
            </AnimatePresence>

            {conversations.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-8">No conversations yet</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

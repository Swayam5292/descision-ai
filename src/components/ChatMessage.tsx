import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import type { Message } from "@/lib/decisionAI";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center border ${
          isUser ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[85%] rounded-sm px-5 py-4 border ${
          isUser
            ? "bg-muted/50 border-border text-foreground"
            : "bg-card border-border text-foreground shadow-sm"
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed 
             [&_strong]:text-foreground [&_strong]:font-bold
             [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mt-2
             [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded-sm">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}

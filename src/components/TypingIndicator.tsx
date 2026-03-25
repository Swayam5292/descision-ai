import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/20">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="glass rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary animate-typing-dot-1" />
        <span className="w-2 h-2 rounded-full bg-primary animate-typing-dot-2" />
        <span className="w-2 h-2 rounded-full bg-primary animate-typing-dot-3" />
      </div>
    </div>
  );
}

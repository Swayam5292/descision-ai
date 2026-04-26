import { motion } from "framer-motion";

interface Props {
  suggestions: string[];
  onSelect: (s: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 px-2">
      {suggestions.map((s, i) => (
        <motion.button
          key={s}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(s)}
          className="text-xs px-3 py-1.5 rounded-full glass hover:bg-primary/20 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {s}
        </motion.button>
      ))}
    </div>
  );
}

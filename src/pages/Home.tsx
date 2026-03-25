import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  Database,
  Globe,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Brain,
    title: "Real AI Intelligence",
    desc: "Powered by Google Gemini for contextual, high-quality explanations instead of scripted replies.",
  },
  {
    icon: Globe,
    title: "Real-World Knowledge",
    desc: "Connected to live data so learners get current, practical answers when concepts change over time.",
  },
  {
    icon: BookOpen,
    title: "Any Subject",
    desc: "Math, science, history, coding, and communication support in one study workspace.",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    desc: "Streaming answers reduce wait time and keep study momentum high.",
  },
  {
    icon: MessageSquare,
    title: "Conversation-First UX",
    desc: "Ask follow-ups naturally, refine confusion quickly, and stay in flow.",
  },
  {
    icon: Database,
    title: "Track 2 Aligned",
    desc: "Built for Google Gen AI Academy Track 2 requirements: AI agents + external knowledge.",
  },
];

const needChecks = [
  { icon: Clock3, label: "Need: Fast support", value: "Met via real-time streaming" },
  { icon: ShieldCheck, label: "Need: Reliable guidance", value: "Met via Gemini + contextual prompts" },
  { icon: Target, label: "Need: Practical outcomes", value: "Met via actionable explanations" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="glow-primary flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-lg font-semibold text-foreground">AI Study Assistant</span>
        </div>
        <button
          onClick={() => navigate("/chat")}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start Chatting
        </button>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Google Gen AI Academy · Track 2
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            AI Tutor that Connects to <span className="text-gradient">Real-World Data</span>
          </h1>

          <div className="glass mb-5 rounded-2xl p-5 text-left sm:p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Improved problem statement</p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Students often lose study momentum because help is either delayed, generic, or disconnected from current
              real-world context. They need fast, trustworthy, and personalized clarification while learning.
            </p>
          </div>

          <p className="mx-auto mb-8 max-w-3xl text-base text-muted-foreground">
            This project addresses that need by combining Gemini-powered conversational tutoring with live knowledge
            access, so learners can ask follow-up questions and get immediate, context-aware support.
          </p>

          <div className="mb-10 grid gap-3 sm:grid-cols-3">
            {needChecks.map((item) => (
              <div key={item.label} className="glass rounded-xl p-4 text-left">
                <item.icon className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/chat")}
              className="glow-primary inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageSquare className="h-5 w-5" />
              Try the AI Assistant
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-3 font-display text-2xl font-bold text-foreground sm:text-3xl">Why this topic is strong</h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            It has a clear user pain, measurable outcomes, and direct alignment with Google Gen AI Academy Track 2.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass group rounded-2xl p-6 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 transition-shadow group-hover:glow-primary">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-display font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24">
        <div className="glass rounded-2xl p-7 sm:p-8">
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Demo readiness checklist</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "Clear problem statement tied to learner pain points",
              "Live AI + real-world data integration for Track 2",
              "Interactive UI supporting iterative student learning",
              "Potential evaluation metrics: response time, satisfaction, learning confidence",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/20 py-8 text-center text-sm text-muted-foreground">
        <p>AI Study Assistant · Google Gen AI Academy Track 2</p>
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, BookOpen, MessageSquare, Sparkles, ArrowRight, Globe, Database } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Brain,
    title: "Real AI Intelligence",
    desc: "Powered by Google Gemini — not simulated. Get real, contextual answers to any study question.",
  },
  {
    icon: Globe,
    title: "Real-World Knowledge",
    desc: "Connected to live AI agents with access to real-world data for accurate, up-to-date responses.",
  },
  {
    icon: BookOpen,
    title: "Any Subject",
    desc: "Math, science, history, programming — ask anything and get clear explanations with examples.",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    desc: "Stream answers in real-time. No waiting, no loading screens — just instant study help.",
  },
  {
    icon: MessageSquare,
    title: "Chat Interface",
    desc: "Natural conversation flow. Follow up, dig deeper, and explore topics interactively.",
  },
  {
    icon: Database,
    title: "Track 2 Ready",
    desc: "Built for Google Gen AI Academy Track 2 — connecting AI agents to real-world data sources.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-lg font-semibold text-foreground">AI Study Assistant</span>
        </div>
        <button
          onClick={() => navigate("/chat")}
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Start Chatting
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Google Gen AI Academy · Track 2
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Connect AI Agents to{" "}
            <span className="text-gradient">Real-World Data</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            <strong className="text-foreground">Problem Statement:</strong> Students struggle to get instant, accurate study help connected to real-world knowledge. Traditional tools are slow, disconnected, and lack contextual understanding.
          </p>

          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10">
            Our AI Study Assistant solves this by connecting Google Gemini AI agents to real-world data, providing instant, contextual answers to any study question through a natural chat interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/chat")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity glow-primary"
            >
              <MessageSquare className="w-5 h-5" />
              Try the AI Assistant
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            What Makes This Different
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Track 2 upgrade — from simulated responses to real AI agents connected to live data.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Flow */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            How It Works
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
          {[
            { step: "1", label: "Ask a Question", sub: "Type anything" },
            { step: "2", label: "AI Agent Processes", sub: "Gemini analyzes" },
            { step: "3", label: "Real-World Data", sub: "Connected knowledge" },
            { step: "4", label: "Instant Answer", sub: "Streamed in real-time" },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2"
            >
              <div className="glass rounded-xl px-5 py-4 text-center min-w-[140px]">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 text-primary font-display font-bold text-sm">
                  {s.step}
                </div>
                <p className="font-display font-semibold text-foreground text-sm">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </div>
              {i < 3 && <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center"
        >
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Technologies Used</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Google Gemini AI", "Supabase Edge Functions", "SSE Streaming"].map(
              (tech) => (
                <span key={tech} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {tech}
                </span>
              )
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-muted-foreground text-sm border-t border-border/20">
        <p>AI Study Assistant · Google Gen AI Academy Track 2</p>
      </footer>
    </div>
  );
}

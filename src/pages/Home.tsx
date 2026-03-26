import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Database, Globe, MessageSquare, Server, ShieldCheck, Sparkles, Zap, Layers, Cpu, RefreshCw } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { AppleNavbar } from "@/components/AppleNavbar";

const features = [
  {
    icon: Brain,
    title: "Adaptive Intelligence",
    desc: "Context-aware tutoring powered by modern AI for clear and structured explanations.",
  },
  {
    icon: Globe,
    title: "Live Knowledge Access",
    desc: "Responses are grounded in current information for practical, real-world learning.",
  },
  {
    icon: BookOpen,
    title: "Multi-Subject Support",
    desc: "From science and mathematics to coding and communication, all in one assistant.",
  },
  {
    icon: Zap,
    title: "Real-Time Experience",
    desc: "Streaming responses keep learning fast and interactive.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Interface",
    desc: "A clean and focused UI designed for students, mentors, and presentations.",
  },
  {
    icon: Database,
    title: "Supabase Backend",
    desc: "Authentication and scalable data infrastructure for production readiness.",
  },
];

const quickStats = [
  { label: "Response style", value: "Real-time streaming" },
  { label: "Learning modes", value: "Explain · Quiz · Revise" },
  { label: "Coverage", value: "STEM + Humanities + Coding" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-14 pt-6 sm:px-6">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />

      <div className="relative z-10">
        <AppleNavbar />

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-2 pb-20 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-5xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Intelligent tutoring with secure authentication
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Learn Better, Faster with <span className="text-gradient">Descision AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mx-auto mb-8 max-w-4xl text-lg text-muted-foreground sm:text-xl"
            >
              Descision AI is a modern learning assistant designed for serious students. It combines conversational AI,
              real-world knowledge retrieval, and secure user accounts so you can study with confidence every day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mb-9 grid gap-4 sm:grid-cols-3"
            >
              {quickStats.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="glass rounded-2xl p-4 text-left"
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col justify-center gap-3 sm:flex-row"
            >
              <motion.button
                onClick={() => navigate("/chat")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:opacity-95"
              >
                <MessageSquare className="h-4 w-4" />
                Open Assistant
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.button
                onClick={() => navigate("/auth")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl border border-border bg-card px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-muted"
              >
                Login / Register
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-7xl px-2 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              What you can do with Descision AI
            </h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Use guided explanations, short summaries, practice questions, and revision plans tailored to your learning goals.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-7"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI-Ready Databases Section */}
        <section className="mx-auto max-w-7xl px-2 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary backdrop-blur-xl">
              <Database className="h-3.5 w-3.5" />
              Track 2 · Real-World Data
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Build &amp; Migrate Faster with{" "}
              <span className="text-gradient">AI-Ready Databases</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground sm:text-lg">
              Connect AI agents to real-world data sources. Descision AI uses live knowledge retrieval, 
              structured backends, and intelligent caching to deliver grounded, accurate responses at scale.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Server,
                title: "Cloud-Native Backend",
                desc: "Powered by scalable serverless infrastructure with edge functions for low-latency AI responses.",
              },
              {
                icon: Layers,
                title: "Structured Data Pipelines",
                desc: "Ingest, transform, and serve knowledge from multiple sources into a unified AI context.",
              },
              {
                icon: Cpu,
                title: "AI-Optimized Queries",
                desc: "Smart retrieval ensures the AI fetches only the most relevant data for each student query.",
              },
              {
                icon: RefreshCw,
                title: "Real-Time Sync",
                desc: "Live data updates keep responses current — no stale answers, always up-to-date knowledge.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Architecture diagram-style callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 glass rounded-2xl p-8 sm:p-10"
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
              <div className="flex shrink-0 items-center gap-3">
                {[Database, ArrowRight, Cpu, ArrowRight, MessageSquare].map((Icon, i) => (
                  <div key={i} className={Icon === ArrowRight ? "text-primary/50" : "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15"}>
                    <Icon className={Icon === ArrowRight ? "h-5 w-5" : "h-5 w-5 text-primary"} />
                  </div>
                ))}
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold text-foreground">End-to-End AI Pipeline</h3>
                <p className="text-sm text-muted-foreground">
                  Data flows from cloud databases through AI-optimized retrieval, processed by Gemini models, 
                  and streamed to students in real-time — all secured with authentication and edge functions.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

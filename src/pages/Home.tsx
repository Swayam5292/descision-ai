import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Database, Globe, MessageSquare, Server, ShieldCheck, Sparkles, Zap, Layers, Cpu, RefreshCw } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { AppleNavbar } from "@/components/AppleNavbar";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  { icon: Brain, title: "Adaptive Intelligence", desc: "Context-aware tutoring powered by modern AI for clear and structured explanations." },
  { icon: Globe, title: "Live Knowledge Access", desc: "Responses are grounded in current information for practical, real-world learning." },
  { icon: BookOpen, title: "Multi-Subject Support", desc: "From science and mathematics to coding and communication, all in one assistant." },
  { icon: Zap, title: "Real-Time Experience", desc: "Streaming responses keep learning fast and interactive." },
  { icon: ShieldCheck, title: "Professional Interface", desc: "A clean and focused UI designed for students, mentors, and presentations." },
  { icon: Database, title: "Cloud Backend", desc: "Authentication and scalable data infrastructure for production readiness." },
];

const quickStats = [
  { label: "Response style", value: "Real-time streaming" },
  { label: "Learning modes", value: "Explain · Quiz · Revise" },
  { label: "Coverage", value: "STEM + Humanities + Coding" },
];

const dbFeatures = [
  { icon: Server, title: "Cloud-Native Backend", desc: "Powered by scalable serverless infrastructure with edge functions for low-latency AI responses." },
  { icon: Layers, title: "Structured Data Pipelines", desc: "Ingest, transform, and serve knowledge from multiple sources into a unified AI context." },
  { icon: Cpu, title: "AI-Optimized Queries", desc: "Smart retrieval ensures the AI fetches only the most relevant data for each student query." },
  { icon: RefreshCw, title: "Real-Time Sync", desc: "Live data updates keep responses current — no stale answers, always up-to-date knowledge." },
];

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-14 pt-6 sm:px-6">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />

      <div className="relative z-10">
        <AppleNavbar />

        {/* Hero */}
        <section className="mx-auto max-w-5xl px-2 pb-16 pt-6 sm:pb-20 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Intelligent tutoring with secure authentication
            </div>

            <h1 className="mb-5 font-display text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn Better, Faster with{" "}
              <span className="text-gradient">Descision AI</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
              A modern learning assistant that combines conversational AI, real-world knowledge retrieval, and secure accounts for confident studying.
            </p>

            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {quickStats.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-border/30 bg-card/40 p-4 text-left backdrop-blur-sm"
                >
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <motion.button
                onClick={() => navigate("/auth")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <MessageSquare className="h-4 w-4" />
                Get Started
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.button
                onClick={() => navigate("/auth")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-border/40 bg-card/50 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
              >
                Login / Register
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-5xl px-2 pb-16 sm:pb-20">
          <RevealSection>
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              What you can do
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
              Guided explanations, practice questions, and revision plans tailored to your goals.
            </p>
          </RevealSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <RevealSection key={feature.title} delay={i * 80}>
                <div className="group rounded-xl border border-border/20 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:bg-card/60">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-1.5 font-display text-base font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* AI-Ready Databases */}
        <section className="mx-auto max-w-5xl px-2 pb-16 sm:pb-20">
          <RevealSection className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary">
              <Database className="h-3.5 w-3.5" />
              Track 2 · Real-World Data
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Build &amp; Migrate Faster with{" "}
              <span className="text-gradient">AI-Ready Databases</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Connect AI agents to real-world data sources with live retrieval, structured backends, and intelligent caching.
            </p>
          </RevealSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dbFeatures.map((item, i) => (
              <RevealSection key={item.title} delay={i * 100}>
                <div className="rounded-xl border border-border/20 bg-card/40 p-5 text-center backdrop-blur-sm transition-colors hover:bg-card/60">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-1.5 font-display text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200}>
            <div className="mt-8 rounded-xl border border-border/20 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
                <div className="flex shrink-0 items-center gap-2">
                  {[Database, ArrowRight, Cpu, ArrowRight, MessageSquare].map((Icon, i) => (
                    <div key={i} className={Icon === ArrowRight ? "text-muted-foreground/40" : "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"}>
                      <Icon className={Icon === ArrowRight ? "h-4 w-4" : "h-4 w-4 text-primary"} />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="mb-1 font-display text-base font-semibold text-foreground">End-to-End AI Pipeline</h3>
                  <p className="text-sm text-muted-foreground">
                    Data flows from cloud databases through AI-optimized retrieval, processed by Gemini, and streamed to students in real-time.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>
      </div>
    </div>
  );
}

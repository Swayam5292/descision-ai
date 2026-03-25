import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Database, Globe, MessageSquare, ShieldCheck, Sparkles, Zap } from "lucide-react";
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

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 pt-6 sm:px-6">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/95 to-background" />

      <div className="relative z-10">
        <AppleNavbar />

        <section className="mx-auto max-w-6xl px-2 pb-16 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Intelligent tutoring with secure authentication
            </div>

            <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn Faster with <span className="text-gradient">Descision AI</span>
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-base text-muted-foreground sm:text-lg">
              Descision AI delivers high-quality academic support through a professional chat experience, personalized
              guidance, and modern backend infrastructure built for reliability.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/chat")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <MessageSquare className="h-4 w-4" />
                Open Assistant
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-white/10"
              >
                Login / Register
              </button>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-2 pb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
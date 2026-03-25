
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";


import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";

import { FormEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import { AppleNavbar } from "@/components/AppleNavbar";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);


  const [showPassword, setShowPassword] = useState(false);


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/chat");
    });
  }, [navigate]);



  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    return score;
  }, [password]);

  const strengthLabel = ["Weak", "Basic", "Good", "Strong"][passwordStrength];


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back to Descision AI");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Registration successful. Check your email for verification.");
      }
      navigate("/chat");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 pt-6 sm:px-6">

      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/95 to-background" />

      <div className="relative z-10">
        <AppleNavbar />


      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/95 to-background" />

      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />


      <div className="relative z-10">
        <AppleNavbar />



        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-border bg-card/80 p-4 shadow-lg shadow-black/5 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {isLogin ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Sign in to continue your learning journey, save progress, and access your Descision AI assistant securely.
              </p>

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Secure authentication powered by Supabase
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Email verification support for new registrations
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Protected chat access and account session management
                </div>
              </div>
            </div>

            <div>
              <div className="mb-5 grid grid-cols-2 rounded-xl bg-muted/60 p-1">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    !isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Register
                </button>
              </div>

              <motion.form key={isLogin ? "login" : "register"} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground outline-none ring-primary/40 transition focus:ring"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-foreground outline-none ring-primary/40 transition focus:ring"
                      minLength={6}
                      placeholder="At least 6 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {!isLogin && (
                    <div className="mt-2">
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          animate={{ width: `${(passwordStrength / 3) * 100}%` }}
                          className="h-full bg-primary"
                          transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Password strength: {strengthLabel}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-all hover:scale-[1.01] hover:opacity-90 disabled:opacity-60"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
                </button>
              </motion.form>
            </div>
          </div>
        </motion.div>


        <div className="mx-auto mt-12 w-full max-w-md rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
          <h1 className="font-display text-3xl font-semibold text-foreground">{isLogin ? "Sign in" : "Create account"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Secure authentication powered by Supabase backend.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-foreground outline-none ring-primary/40 focus:ring"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-foreground outline-none ring-primary/40 focus:ring"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className="mt-4 text-sm text-primary transition-opacity hover:opacity-90"
          >
            {isLogin ? "New here? Create an account" : "Already registered? Sign in"}
          </button>
        </div>


      </div>
    </div>
  );
}

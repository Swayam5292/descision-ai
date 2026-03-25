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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/chat");
    });
  }, [navigate]);

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
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />

      <div className="relative z-10">
        <AppleNavbar />

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

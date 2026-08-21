import { useState } from "react";
import type { FormEvent } from "react";
import { HiArrowRightOnRectangle, HiEnvelope, HiLockClosed, HiUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/api/auth";
import FeedbackMessage from "@/components/FeedbackMessage";
import { useAuth } from "@/context/useAuth";

const tabs = [
  { label: "Sign in", value: "sign-in" },
  { label: "Sign up", value: "sign-up" },
] as const;

type AuthTab = (typeof tabs)[number]["value"];

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignIn = activeTab === "sign-in";

  const selectTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      if (isSignIn) {
        const { token } = await loginUser({ email, password });
        login(token);
        navigate("/");
      } else {
        await registerUser({ email, password });
        setPassword("");
        setActiveTab("sign-in");
        setMessage("Account created. You can now sign in.");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
      <div className="mb-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Authentication">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${activeTab === tab.value ? "bg-white text-brand-700 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}
            onClick={() => selectTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          {isSignIn ? "Welcome back" : "Join Evently"}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          {isSignIn ? "Sign in" : "Create your account"}
        </h1>
        <p className="mt-4 text-slate-600">
          {isSignIn ? "Enter your details to access your account." : "Create an account to publish and manage events."}
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <span className="relative mt-2 block">
              <HiEnvelope className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" aria-hidden="true" />
              <input
                type="email"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                value={email}
                autoComplete="email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <span className="relative mt-2 block">
              <HiLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" aria-hidden="true" />
              <input
                type="password"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                value={password}
                minLength={8}
                maxLength={50}
                autoComplete={isSignIn ? "current-password" : "new-password"}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </span>
          </label>
          {error && <FeedbackMessage>{error}</FeedbackMessage>}
          {message && <FeedbackMessage type="success">{message}</FeedbackMessage>}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSignIn ? <HiArrowRightOnRectangle className="text-lg" aria-hidden="true" /> : <HiUserPlus className="text-lg" aria-hidden="true" />}
            {isSubmitting ? "Please wait..." : isSignIn ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
}

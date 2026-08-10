import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const tabs = [
  { label: "Sign in", value: "sign-in" },
  { label: "Sign up", value: "sign-up" },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("sign-in");

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
      <div
        className="mb-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1"
        role="tablist"
        aria-label="Authentication"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${activeTab === tab.value ? "bg-white text-brand-700 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "sign-in" ? (
        <div role="tabpanel">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Welcome back
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Sign in
          </h1>
          <p className="mt-4 text-slate-600">
            The sign-in form and API integration will be implemented here.
          </p>
          <button
            type="button"
            className="mt-8 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
            onClick={handleLogin}
          >
            Demo login
          </button>
        </div>
      ) : (
        <div role="tabpanel">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Join Evently
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Create your account
          </h1>
          <p className="mt-4 text-slate-600">
            The registration form and API integration will be implemented here.
          </p>
        </div>
      )}
    </section>
  );
}

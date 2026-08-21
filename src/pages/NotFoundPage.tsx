import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="py-20 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you requested does not exist.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
      >
        Back to events
      </Link>
    </section>
  );
}

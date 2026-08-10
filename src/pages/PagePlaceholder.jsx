export default function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">{eyebrow}</p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
    </section>
  );
}

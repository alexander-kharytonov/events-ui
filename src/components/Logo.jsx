import { Link } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa6";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-950"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white">
        <FaCalendarCheck aria-hidden="true" />
      </span>
      <span>Evently</span>
    </Link>
  );
}

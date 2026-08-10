import { NavLink, useNavigate } from "react-router-dom";
import { HiArrowLeftOnRectangle, HiArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from "@/context/useAuth";

const getLinkClassName =
  (mobile) =>
  ({ isActive }) =>
    `block rounded-lg font-medium transition ${mobile ? "w-full px-4 py-3 text-base" : "px-3 py-2 text-sm"} ${
      isActive
        ? "bg-brand-50 text-brand-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

export default function Navigation({ mobile = false }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const linkClassName = getLinkClassName(mobile);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav aria-label="Main navigation">
      <ul className={`flex gap-2 ${mobile ? "flex-col" : "items-center"}`}>
        <li>
          <NavLink to="/" className={linkClassName}>
            Events
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/events/create" className={linkClassName}>
                Create event
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className={`inline-flex items-center gap-2 rounded-lg font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 ${mobile ? "w-full px-4 py-3 text-left text-base" : "px-3 py-2 text-sm"}`}
                onClick={handleLogout}
              >
                <HiArrowLeftOnRectangle className="text-lg" aria-hidden="true" />
                Log out
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/auth"
              className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 font-semibold text-white transition hover:bg-brand-700 ${mobile ? "w-full py-3 text-base" : "py-2 text-sm"}`}
            >
              <HiArrowRightOnRectangle className="text-lg" aria-hidden="true" />
              Sign in / Sign up
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

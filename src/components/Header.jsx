import { useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import MobileNavigation from "@/components/MobileNavigation";
import Navigation from "@/components/Navigation";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden md:block">
          <Navigation />
        </div>
        <MobileNavigation key={pathname} />
      </div>
    </header>
  );
}

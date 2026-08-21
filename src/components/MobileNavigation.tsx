import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="grid size-10 place-items-center rounded-lg text-2xl text-slate-700 transition hover:bg-slate-100 md:hidden"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <HiBars3 aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex min-h-screen flex-col bg-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-18 items-center justify-between px-4 sm:px-6">
            <Logo />
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg text-2xl text-slate-700 transition hover:bg-slate-100"
              aria-label="Close navigation"
              onClick={() => setIsOpen(false)}
            >
              <HiXMark aria-hidden="true" />
            </button>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <Navigation mobile />
          </div>
        </div>
      )}
    </>
  );
}

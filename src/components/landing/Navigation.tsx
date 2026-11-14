import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const Navigation = () => {
  const [scrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group select-none">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/35 transition-all">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-400 transform group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Meeting<span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Mind</span>
              </span>
              <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => sectionScroll("features")}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => sectionScroll("pricing")}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => sectionScroll("testimonial")}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Testimonials
            </button>
          </div>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="relative group cursor-pointer overflow-hidden rounded-xl p-[1px] font-semibold text-sm">
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-xl transition-all duration-300 group-hover:opacity-90" />
                  <span className="relative block px-5 py-2.5 rounded-[11px] bg-slate-950 font-bold text-emerald-300 group-hover:bg-transparent group-hover:text-slate-950 transition-all duration-200">
                    Get Started Free
                  </span>
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 px-4 py-2.5 rounded-xl transition-all"
              >
                Dashboard
              </Link>
              <UserButton />
            </Show>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-5 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => sectionScroll("features")}
                className="text-left text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
              >
                Features
              </button>
              <button
                onClick={() => sectionScroll("pricing")}
                className="text-left text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
              >
                Pricing
              </button>
              <button
                onClick={() => sectionScroll("testimonial")}
                className="text-left text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
              >
                Testimonials
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="w-full text-center py-2.5 rounded-xl border border-slate-700 text-slate-200 font-semibold text-sm">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full text-center py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm">
                    Get Started Free
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Link
                  to="/dashboard"
                  className="w-full text-center py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm"
                >
                  Go to Dashboard
                </Link>
              </Show>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
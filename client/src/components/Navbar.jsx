import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rankings", path: "/leaderboard" },
    { name: "Institutions", path: "/institutions" },
    { name: "News", path: "/news" },
    { name: "About", path: "/about" },
  ];

  const activeClass = (path) =>
    location.pathname === path
      ? "text-orange-600 font-semibold"
      : "text-gray-700 hover:text-orange-600";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 hover:opacity-90 transition"
        >
          <img
            src="/logo.png"
            alt="First Rank India"
            className="h-9 sm:h-10 w-auto"
          />

          <div className="leading-none">
            <p className="font-black text-xs sm:text-sm text-orange-600 tracking-wide">
              FIRST RANK
            </p>
            <p className="font-black text-[11px] sm:text-xs text-orange-600 tracking-wide">
              INDIA
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition ${activeClass(item.path)}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login">
            <Button variant="secondary" size="sm">
              Sign In
            </Button>
          </Link>

          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-5 py-5 bg-white flex flex-col gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-3 rounded-xl text-sm transition ${activeClass(
                item.path
              )} hover:bg-orange-50`}
            >
              {item.name}
            </Link>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <Link to="/login">
              <Button variant="secondary" fullWidth>
                Sign In
              </Button>
            </Link>

            <Link to="/register">
              <Button fullWidth>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
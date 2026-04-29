import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import {
  BookOpen,
  LayoutDashboard,
  Moon,
  Sun,
  Sparkles,
  UserCircle2,
  Settings,
  LogOut,
  FileText,
  ClipboardList,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, [token]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  const activeClass = (path) =>
    location.pathname === path || location.hash === `#${path.split("#")[1]}`
      ? "text-orange-600 dark:text-orange-400 font-semibold"
      : "text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-300";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleStartTest = () => {
    if (token) {
      navigate("/exam");
    } else {
      navigate("/login");
    }
  };

  const userInitial =
    storedUser?.name?.charAt(0)?.toUpperCase() ||
    storedUser?.email?.charAt(0)?.toUpperCase() ||
    "U";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };






  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="w-full px-3 sm:px-4 lg:px-6 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 hover:opacity-90 transition">
          <img src="/logo.png" alt="First Rank India" className="h-12 md:h-14 lg:h-16 w-auto" />

          <div className="leading-none">
            <p className="font-black text-xs sm:text-sm text-orange-600 tracking-wide">India's First</p>
            <p className="font-black text-xs sm:text-sm text-orange-600 tracking-wide">Smart Education Platform</p>
          </div>
        </Link>

      
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {token ? (
            <>
              <Link key="home" to="/" className={`transition-colors duration-300 ${activeClass("/")}`}>
                Home
              </Link>
              <Link key="dashboard" to="/dashboard" className={`transition-colors duration-300 ${activeClass("/dashboard")}`}>
                Dashboard
              </Link>
              <Link key="exam" to="/exam" className={`transition-colors duration-300 ${activeClass("/exam")}`}>
                Exam
              </Link>
              <Link key="result" to="/result" className={`transition-colors duration-300 ${activeClass("/result")}`}>
                Results
              </Link>
              <Link key="reports" to="/reports" className={`transition-colors duration-300 ${activeClass("/reports")}`}>
                Reports
              </Link>
            </>
          ) : (
            navLinks.map((item) => (
              <Link key={item.path} to={item.path} className={`transition-colors duration-300 ${activeClass(item.path)}`}>
                {item.name}
              </Link>
            ))
          )}
        </div>
      

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {token ? (
            <div className="relative flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Button>
              </Link>

              <Button size="sm" onClick={handleStartTest} className="flex items-center gap-2">
                <BookOpen size={16} />
                Exam
              </Button>

              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="w-11 h-11 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center border border-orange-200 hover:shadow-md transition-all duration-300"
                aria-label="Open user menu"
              >
                {userInitial}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-14 w-56 rounded-2xl bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{storedUser?.name || "My Account"}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{storedUser?.email || "Signed in user"}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10 transition-colors duration-300"
                  >
                    <UserCircle2 size={16} />
                    My Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10 transition-colors duration-300"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-300"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/register">
                <Button size="sm" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Get Started
                </Button>
              </Link>

              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
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
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-5 py-5 bg-white dark:bg-slate-950 flex flex-col gap-1 transition-colors duration-300">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-3 rounded-xl text-sm transition-colors duration-300 ${activeClass(
                item.path
              )} hover:bg-orange-50 dark:hover:bg-white/10`}
            >
              {item.name}
            </Link>
          ))}

          <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800 mt-4">
            {token ? (
              <>
                <Link to="/">
                  <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                    Home
                  </Button>
                </Link>

                <Link to="/dashboard">
                  <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Button>
                </Link>

                <Link to="/exam">
                  <Button fullWidth className="flex items-center justify-center gap-2">
                    <BookOpen size={16} />
                    Exam
                  </Button>
                </Link>

                <Link to="/result">
                  <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                    <FileText size={16} />
                    Results
                  </Button>
                </Link>

                <Link to="/reports">
                  <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                    <ClipboardList size={16} />
                    Reports
                  </Button>
                </Link>

                <Link to="/profile">
                  <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                    <UserCircle2 size={16} />
                    My Profile
                  </Button>
                </Link>

                <Link to="/settings">
                  <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                    <Settings size={16} />
                    Settings
                  </Button>
                </Link>

                <div className="pt-2">
                  <Button fullWidth onClick={handleLogout} variant="ghost">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button fullWidth className="flex items-center justify-center gap-2">
                    <BookOpen size={16} />
                    Get Started
                  </Button>
                </Link>

                <Link to="/login">
                  <Button variant="secondary" fullWidth>
                    Login
                  </Button>
                </Link>
              </>
            )}

            <div className="pt-3">
              <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <Sparkles size={18} className="mt-0.5" />
                  <div>
                    <p className="font-bold">Demo ready</p>
                    <p className="text-sm text-white/90">Smooth animations, theme toggle and polished UI are enabled.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
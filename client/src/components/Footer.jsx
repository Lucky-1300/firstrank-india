import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const productLinks = [
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Exams", path: "/exam" },
    { name: "Results", path: "/result" },
  ];

  const companyLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "News", path: "/news" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookies", path: "/cookies" },
  ];

  const socials = ["📘", "📷", "▶️", "𝕏"];

  return (
    <footer className="bg-gray-950 dark:bg-slate-950 text-white mt-16 sm:mt-24 transition-colors duration-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/logo.png"
                alt="First Rank India"
                className="h-10 w-auto"
              />

              <div className="leading-none">
                <p className="font-black text-sm text-orange-400">
                  FIRST RANK
                </p>
                <p className="font-black text-xs text-orange-400">
                  INDIA
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm text-gray-400 leading-7 max-w-xs">
              Discover your true potential beyond marks through skill-based
              assessments, rankings and career guidance.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map((icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-orange-500 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-orange-400 mb-5">
              Product
            </h4>

            <div className="space-y-3 text-sm">
              {productLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-orange-400 mb-5">
              Company
            </h4>

            <div className="space-y-3 text-sm">
              {companyLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-orange-400 mb-5">
              Legal
            </h4>

            <div className="space-y-3 text-sm">
              {legalLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 justify-between items-center text-sm text-gray-500 text-center sm:text-left">
          <p>
            © {year} First Rank India. All rights reserved.
          </p>

          <p>
            Made with ❤️ for ambitious Indian students
          </p>
        </div>
      </div>
    </footer>
  );
}
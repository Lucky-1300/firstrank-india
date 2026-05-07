import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const contactLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com",
      icon: FaLinkedin,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: FaTwitter,
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: FaInstagram,
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: FaGithub,
    },
  ];

  const productLinks = [
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Exams", path: "/exam" },
    { name: "Results", path: "/result" },
  ];

  const companyLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookies", path: "/cookies" },
  ];

  return (
    <footer className="bg-gray-950 dark:bg-slate-950 text-white mt-16 sm:mt-24 transition-colors duration-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/logo.png"
                alt="First Rank India"
                className="h-15 md:h-16 lg:h-17 w-auto"
              />

              <div className="leading-none">
                <p className="font-black text-lg lg:text-xl md:text-lg text-orange-600 tracking-wide">India's First</p>
                <p className="font-black text-xs lg:text-sm md:text-xs text-orange-600 tracking-wide">Smart Education Platform</p>
              </div>
            </Link>

            <p className="mt-5 text-sm text-gray-400 leading-7 max-w-xs">
              Discover your true potential beyond marks through skill-based
              assessments, rankings and career guidance.
            </p>
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

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1 lg:justify-self-end">
            <h4 className="font-bold text-orange-400 mb-5">
              Contact
            </h4>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:tlnexoratechnologies@gmail.com"
                className="block text-gray-400 hover:text-white transition-colors duration-300 break-all"
              >
                firstrankindia.test@gmail.com
              </a>

              <a
                href="tel:+919320050310"
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                +91 9320050310
              </a>

              <p className="text-gray-400">India</p>

              <div className="flex gap-3 pt-2">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="text-gray-400 transition-colors text-xl hover:text-white dark:hover:text-blue-400"
                  >
                    <item.icon />
                  </a>
                ))}
              </div>
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
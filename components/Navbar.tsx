"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Edward
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-purple-600 dark:hover:text-purple-400 ${
                  scrolled
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
            {/* Dark Mode Toggle - Desktop */}
            <div className="hidden md:block">
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button and Dark Mode Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle - Mobile */}
            <div className="md:hidden">
              <DarkModeToggle />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-md transition-colors ${
                scrolled
                  ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 transition-all duration-300 ease-in-out overflow-y-auto ${
              scrolled
                ? "bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700"
                : "bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    scrolled
                      ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              {/* Dark Mode Toggle in Mobile Menu */}
              <div className="px-4 py-3">
                <div
                  className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                    scrolled
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-white/10"
                  }`}
                >
                  <span
                    className={`text-base font-medium ${
                      scrolled
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-white"
                    }`}
                  >
                    Dark Mode
                  </span>
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30 top-16"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
}

"use client";

import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: Linkedin,
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="text-sm sm:text-base">
              © {currentYear} Edward. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4 order-1 md:order-2">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${link.name} profile`}
                  className={`group relative text-gray-400 transition-all duration-300 transform hover:scale-125 ${link.color} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-3 hover:bg-gray-800/50`}
                >
                  <IconComponent className="w-5 h-5" aria-hidden="true" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded pointer-events-none">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}


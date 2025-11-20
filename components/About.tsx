"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const [ref, isVisible] = useScrollAnimation();
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Tailwind CSS",
    "Git",
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with a love for creating
              elegant solutions to complex problems. With expertise in modern
              web technologies, I bring ideas to life through clean code and
              intuitive design.
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-2 mb-8 md:mb-0">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 max-w-xs mx-auto md:max-w-none">
              <div className="w-full h-full rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center p-4 sm:p-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white">
                    You
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Your Photo Here
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements - hidden on mobile */}
            <div className="hidden md:block absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="hidden md:block absolute -top-6 -left-6 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

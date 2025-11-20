"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  projectUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with payment integration, user authentication, and admin dashboard. Built with modern web technologies for a seamless shopping experience.",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    image: "https://via.placeholder.com/600x400/6366f1/ffffff?text=E-Commerce",
    projectUrl: "https://demo.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team collaboration features. Stay organized and productive with intuitive project management tools.",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    image: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Task+Manager",
    projectUrl: "https://demo.com",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A beautiful weather dashboard with location-based forecasts and interactive weather maps. Get accurate weather information with a modern, user-friendly interface.",
    technologies: ["React", "API Integration", "Chart.js", "Tailwind CSS"],
    image: "https://via.placeholder.com/600x400/06b6d4/ffffff?text=Weather+App",
    projectUrl: "https://demo.com",
  },
];

export default function Projects() {
  const [ref, isVisible] = useScrollAnimation();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      projects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 150);
      });
    } else {
      setVisibleCards([]);
    }
  }, [isVisible]);

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            A collection of projects I've worked on, showcasing my skills and
            passion for development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 w-full overflow-hidden">
                {/* Gradient background fallback */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white opacity-20">
                    {project.id}
                  </div>
                </div>
                {/* Project image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 z-10"
                  onError={(e) => {
                    // Hide image if it fails to load, showing gradient fallback
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {project.description}
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

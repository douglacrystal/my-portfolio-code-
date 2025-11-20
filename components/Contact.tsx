"use client";

import { useState, FormEvent } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "Name is required";
        }
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          return "Email is required";
        }
        if (!validateEmail(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "message":
        if (!value.trim()) {
          return "Message is required";
        }
        if (value.trim().length < 10) {
          return "Message must be at least 10 characters";
        }
        if (value.length > 1000) {
          return "Message must be less than 1000 characters";
        }
        break;
      default:
        break;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      message: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:your.email@example.com",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900 text-white"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Name <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={touched.name && errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 ${
                    touched.name && errors.name
                      ? "border-red-400 focus:ring-red-400"
                      : touched.name && !errors.name
                      ? "border-green-400 focus:ring-green-400"
                      : "border-white/20 focus:ring-pink-500"
                  }`}
                  placeholder="Your Name"
                />
                {touched.name && errors.name && (
                  <p
                    id="name-error"
                    className="mt-1 text-sm text-red-300 flex items-center gap-1"
                    role="alert"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Email <span className="text-pink-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={touched.email && errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 ${
                    touched.email && errors.email
                      ? "border-red-400 focus:ring-red-400"
                      : touched.email && !errors.email
                      ? "border-green-400 focus:ring-green-400"
                      : "border-white/20 focus:ring-pink-500"
                  }`}
                  placeholder="your.email@example.com"
                />
                {touched.email && errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-sm text-red-300 flex items-center gap-1"
                    role="alert"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Message <span className="text-pink-400">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      formData.message.length > 1000
                        ? "text-red-300"
                        : formData.message.length > 800
                        ? "text-yellow-300"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.message.length}/1000
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={6}
                  maxLength={1000}
                  aria-invalid={touched.message && errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-200 ${
                    touched.message && errors.message
                      ? "border-red-400 focus:ring-red-400"
                      : touched.message && !errors.message
                      ? "border-green-400 focus:ring-green-400"
                      : "border-white/20 focus:ring-pink-500"
                  }`}
                  placeholder="Your message here..."
                />
                {touched.message && errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 text-sm text-red-300 flex items-center gap-1"
                    role="alert"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/20 text-green-200"
                      : "bg-red-500/20 text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's connect</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to reach out
                through any of the channels below.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Follow me</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-6 border border-white/20"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

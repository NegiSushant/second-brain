import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
// import { CheckIcon, StarIcon } from "@heroicons/react/24/solid";
import {
  LightBulbIcon,
  Squares2X2Icon,
  FunnelIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import Testimonials from "../components/Testimonial";

// TypeScript Interfaces
interface Feature {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
}


interface PricingPlan {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  highlighted?: boolean;
  disabled?: boolean;
}

// Hook for dynamic page title
const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const Home = () => {
  usePageTitle("MindVault – Your Infinite Memory Palace | Boost Productivity");

  // Pricing toggle state
  const [annual, setAnnual] = useState(false);
  // Features data
  const features: Feature[] = [
    {
      title: "Harvest",
      description: "Capture fleeting thoughts effortlessly",
      benefits: ["Quick note capture", "Web clipping", "Voice memos"],
      icon: <LightBulbIcon className="w-10 h-10 text-purple-600" />,
    },
    {
      title: "Weave",
      description: "Organize your ideas into meaningful structures",
      benefits: ["Tagging & linking", "Folder hierarchy", "Searchable vault"],
      icon: <Squares2X2Icon className="w-10 h-10 text-purple-600" />,
    },
    {
      title: "Refine",
      description: "Distill knowledge into actionable wisdom",
      benefits: ["Highlight & annotate", "Summarize notes", "AI suggestions"],
      icon: <FunnelIcon className="w-10 h-10 text-purple-600" />,
    },
    {
      title: "Amplify",
      description: "Express ideas with clarity and share easily",
      benefits: ["Export & share", "Presentations", "Collaborate with team"],
      icon: <MegaphoneIcon className="w-10 h-10 text-purple-600" />,
    },
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Free",
      monthly: 0,
      annual: 0,
      features: ["Up to 3 vaults", "Basic search", "Community support"],
    },
    {
      name: "Pro",
      monthly: 19,
      annual: 182, // 20% discount
      features: [
        "Unlimited vaults",
        "Advanced search",
        "Priority support",
        "Custom themes",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      monthly: 0,
      annual: 0,
      features: ["Custom integrations", "Dedicated support", "SLAs"],
      disabled: true,
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center text-center lg:text-left bg-gradient-to-br from-purple-600 to-indigo-600 text-white px-4">
        <motion.div
          className="lg:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Unlock Your Infinite Memory Palace
          </h1>
          <p className="text-lg md:text-2xl">
            Capture fleeting thoughts, weave them into actionable wisdom, and
            express ideas that change the world – all in one intuitive vault.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/signup"
              className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded font-semibold transition"
            >
              Launch Your Vault
            </a>
            <a
              href="#demo"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-purple-600 transition"
            >
              Watch Demo Video
            </a>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2 mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Placeholder abstract graphic */}
          <div className="w-full h-64 lg:h-96 bg-purple-200 rounded-3xl animate-pulse">
            
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How MindVault Supercharges Your Productivity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:shadow-lg transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 mb-2">{f.description}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {f.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="relative flex flex-col md:flex-row items-center md:justify-between">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className="flex flex-col items-center text-center md:text-center mb-10 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step * 0.2 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-xl mb-4">
                  {step}
                </div>
                <p className="max-w-xs">
                  Step {step} description goes here with abstract illustrations.
                </p>
              </motion.div>
            ))}
            {/* Progress bar */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-purple-200 -z-10"></div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 border ${
                !annual ? "bg-purple-100 border-purple-500" : "bg-white"
              } rounded-l transition`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 border ${
                annual ? "bg-purple-100 border-purple-500" : "bg-white"
              } rounded-r transition`}
            >
              Annual
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                className={`p-6 rounded-xl shadow text-center ${
                  plan.highlighted
                    ? "border-2 border-purple-600"
                    : "border border-gray-200"
                } ${plan.disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">
                  ${annual ? plan.annual : plan.monthly}
                  <span className="text-base font-normal">/mo</span>
                </p>
                <ul className="mb-4 space-y-1">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckIcon className="w-5 h-5 text-purple-600" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  disabled={plan.disabled}
                  className={`px-4 py-2 rounded ${
                    plan.disabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700 transition"
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-400 text-white">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Get Early Access</h2>
          <form
            className="flex flex-col sm:flex-row gap-4 justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Submitted!");
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              required
              className="px-4 py-2 rounded text-gray-800 flex-1"
            />
            <button className="px-6 py-2 rounded bg-purple-600 hover:bg-purple-700 transition">
              Submit
            </button>
          </form>
          <p className="text-sm">We respect your data – no spam, ever.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-2">Product</h4>
            <ul className="space-y-1">
              <li>Features</li>
              <li>Pricing</li>
              <li>Demo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>GDPR</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2025 MindVault Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

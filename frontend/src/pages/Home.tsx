import React from "react";
import { motion } from "framer-motion";
import {
  LightBulbIcon,
  Squares2X2Icon,
  FunnelIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import Testimonials from "../components/Testimonial";
import Footer from "../components/Footer";
import Working from "../components/Working";

interface Feature {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
}

export const Home = () => {
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
            <img src="brain.png" alt="Brian Image" />
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
      <Working />
      
      {/*Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
};

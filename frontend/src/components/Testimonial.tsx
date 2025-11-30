import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    quote:
      "MindVault transformed my productivity and how I organize my team’s workflow!",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Developer",
    quote:
      "Loved the simplicity and design — it’s everything I wanted in a productivity tool.",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 5,
  },
  {
    name: "Daniel Lee",
    role: "Consultant",
    quote:
      "An intuitive and powerful tool that helps me stay on top of my consulting biz!",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 4,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>

        <div className="relative h-64 flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="absolute flex flex-col items-center w-full"
            >
              <img
                src={testimonials[index].avatar}
                alt={testimonials[index].name}
                className="w-20 h-20 rounded-full mb-4 shadow-lg"
              />
              <p className="italic text-gray-700 mb-4 max-w-xl">
                “{testimonials[index].quote}”
              </p>
              <p className="font-semibold text-gray-900">
                {testimonials[index].name}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {testimonials[index].role}
              </p>
              <div className="flex justify-center space-x-1">
                {Array.from({ length: testimonials[index].rating }).map(
                  (_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  )
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-gray-800 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

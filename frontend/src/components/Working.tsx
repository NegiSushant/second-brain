import { motion } from "framer-motion";

const working = [
  "Capture knowledge: Search, read, or input any content and add it to your personal mind vault for storage.",
  "Organize insights: Filter, tag, link, and categorize content to build interconnected notes and relationships.",
  "Query your brain: Ask natural language questions to retrieve, summarize, or generate insights from your vault.",
  "Collaborate and refine: Share queries with the community for peer answers, vote on best responses, and update your vault—like Brainly's Q&A model.",
];

export default function Working() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="relative flex flex-col md:flex-row items-center md:justify-between">
          {working.map((step, index) => {
            const stepNumber = index + 1;
            const [title, description] = step.split(":").map((s) => s.trim());
            return (
              <motion.div
                key={stepNumber}
                className="flex flex-col items-center text-center md:text-center mb-10 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stepNumber * 0.2 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-xl mb-4">
                  {stepNumber}
                </div>
                <div className="max-w-xs space-y-2">
                  <p className="font-bold text-base">{title}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </motion.div>
            );
          })}
          {/* Progress bar */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-purple-200 -z-10"></div>
        </div>
      </div>
    </section>
  );
}

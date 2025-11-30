import { motion } from "framer-motion";
import { WrenchIcon, HammerIcon, AlertTriangleIcon } from "lucide-react";

export default function UnderDevelopment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center space-y-4"
      >
        {/* Animated icons */}
        <div className="flex space-x-3 text-yellow-500">
          <motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <WrenchIcon className="w-10 h-10" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -20, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <HammerIcon className="w-10 h-10" />
          </motion.div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-gray-800">
          🚧 Page Under Development
        </h1>
        <p className="text-gray-600 max-w-md">
          We're currently working hard to bring you this feature. Please check
          back soon!
        </p>

        {/* Optional hint */}
        <div className="flex items-center mt-6 text-sm text-gray-500">
          <AlertTriangleIcon className="w-4 h-4 mr-2 text-yellow-500" />
          <span>
            Last updated:{" "}
            {new Date().toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

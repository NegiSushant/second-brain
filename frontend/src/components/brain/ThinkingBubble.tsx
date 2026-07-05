import { motion } from "motion/react";
import { IconBrain } from "@tabler/icons-react";

export default function ThinkingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3 rounded-2xl rounded-bl-md bg-neutral-100 px-4 py-3 shadow-sm dark:bg-neutral-800">
        <div className="flex gap-1">
          <IconBrain size={18} className="text-neutral-500" />
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="h-2 w-2 rounded-full bg-neutral-400"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: dot * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

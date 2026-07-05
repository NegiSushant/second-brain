import {
  IconCopy,
  IconRefresh,
  IconThumbDown,
  IconThumbUp,
  IconCheck,
} from "@tabler/icons-react";
import { useState } from "react";

interface MessageToolbarProps {
  content: string;
}

export default function MessageToolbar({ content }: MessageToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-2 flex items-center gap-3 text-neutral-500">
      {/* Copy */}
      <button
        onClick={handleCopy}
        className="transition hover:text-black dark:hover:text-white"
        title="Copy response"
      >
        {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
      </button>

      {/* Regenerate */}
      <button
        disabled
        className="cursor-not-allowed opacity-40"
        title="Coming soon"
      >
        <IconRefresh size={18} />
      </button>

      {/* Like */}
      <button
        disabled
        className="cursor-not-allowed opacity-40"
        title="Coming soon"
      >
        <IconThumbUp size={18} />
      </button>

      {/* Dislike */}
      <button
        disabled
        className="cursor-not-allowed opacity-40"
        title="Coming soon"
      >
        <IconThumbDown size={18} />
      </button>
    </div>
  );
}

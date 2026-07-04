import { useEffect, useRef, useState } from "react";
// import { IconArrowUp } from "@tabler/icons-react";
// import { FaArrowUp } from "react-icons/fa";
import { IconArrowUp, IconLoader2 } from "@tabler/icons-react";

interface ChatInputProps {
  loading: boolean;
  placeholder?: string;
  onSend: (message: string) => Promise<void>;
}

export default function ChatInput({
  loading,
  placeholder = "Ask your brain anything...",
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  /**
   * Auto resize textarea
   */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = Math.min(scrollHeight, 180) + "px";
  }, [message]);

  /**
   * Send Message
   */
  const send = async () => {
    const query = message.trim();
    if (!query || loading) return;

    // await onSend(query);

    // setMessage("");
    // textareaRef.current!.style.height = "auto";
    // textareaRef.current?.focus();

    setMessage("");
    textareaRef.current?.style.setProperty("height", "auto");
    textareaRef.current?.focus();
    await onSend(query);
  };

  /**
   * Enter -> Send
   * Shift + Enter -> New Line
   */
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;
    e.preventDefault();
    await send();
  };

  return (
    <div className="border-t bg-white px-6 py-5 dark:bg-neutral-900">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end rounded-3xl border border-neutral-200 bg-white px-4 py-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <textarea
            ref={textareaRef}
            rows={1}
            disabled={loading}
            value={message}
            // placeholder={placeholder}
            placeholder={loading ? "Thinking..." : placeholder}
            maxLength={4000}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="max-h-[180px] min-h-[28px] flex-1 resize-none overflow-y-auto bg-transparent text-[15px] leading-6 outline-none placeholder:text-neutral-400"
          />

          <button
            type="button"
            disabled={loading || !message.trim()}
            onClick={send}
            className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-105 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:hover:scale-100"
          >
            {/* <IconArrowUp size={18} /> */}
            {/* <FaArrowUp size={18} /> */}
            {loading ? (
              <IconLoader2 size={18} className="animate-spin" />
            ) : (
              <IconArrowUp size={18} />
            )}
          </button>
        </div>

        <p className="mt-2 text-center text-xs text-neutral-400">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

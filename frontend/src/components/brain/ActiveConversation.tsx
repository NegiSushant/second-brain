// import { useState } from "react";
import type { ChatMessage } from "../../types/chat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

interface ActiveConversationProps {
  messages: ChatMessage[];
  loading: boolean;
  onSend: (message: string) => Promise<void>;
}

export default function ActiveConversation({
  messages,
  loading,
  onSend,
}: ActiveConversationProps) {
  //   const [input, setInput] = useState("");

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     const query = input.trim();

  //     if (!query) return;

  //     await onSend(query);

  //     setInput("");
  //   };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Messages */}

      <div className="flex-1 overflow-y-auto">
        {/* <MessageList messages={messages} loading={loading} /> */}
        <MessageList messages={messages} showThinking={loading} />
      </div>

      {/* Chat Input */}
      <ChatInput loading={loading} onSend={onSend} />

      {/* <form onSubmit={handleSubmit} className="border-t bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            disabled={loading}
            placeholder="Ask your brain anything..."
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form> */}
    </div>
  );
}

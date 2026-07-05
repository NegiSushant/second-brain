import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble";
import ThinkingBubble from "./ThinkingBubble";
import MessageSources from "./MessageSources";
import MessageToolbar from "./MessageToolbar";

interface MessageListProps {
  messages: ChatMessage[];
  showThinking?: boolean;
}

export default function MessageList({
  messages,
  showThinking = false,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, showThinking]);

  return (
    <div className="flex flex-col gap-4 px-6 py-6">
      {messages.map((message) => (
        <div className="space-y-2">
          <MessageBubble message={message} />

          {message.role === "assistant" &&
            message.sources &&
            message.sources.length > 0 && (
              <MessageSources sources={message.sources} />
            )}

          {message.role === "assistant" && (
            <MessageToolbar content={message.content} />
          )}
        </div>
      ))}
      {showThinking && <ThinkingBubble />}
      <div ref={bottomRef} />
    </div>
  );
}

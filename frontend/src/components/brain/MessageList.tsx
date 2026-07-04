import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble";
import ThinkingBubble from "./ThinkingBubble";

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
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* <div ref={bottomRef} /> */}
      {showThinking && <ThinkingBubble />}

      <div ref={bottomRef} />
    </div>
  );
}

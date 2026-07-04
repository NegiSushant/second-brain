import type { ChatMessage } from "../../types/chat";
import { cn } from "../../lib/utils";
import MarkdownRenderer from "./MarkdownRenderer";
// import MessageSources from "./MessageSources";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
          isUser
            ? "bg-black text-white rounded-br-md"
            : "bg-neutral-100 text-neutral-900 rounded-bl-md dark:bg-neutral-800 dark:text-white",
        )}
      >
        {/* <p className="whitespace-pre-wrap break-words">{message.content}</p> */}
        {/* <MarkdownRenderer content={message.content} />
        {!isUser && message.sources && (
          <MessageSources sources={message.sources} />
        )} */}
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}
      </div>
    </div>
  );
}

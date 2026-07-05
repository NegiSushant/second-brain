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
  return (
    <div className="flex h-full w-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} showThinking={loading} />
      </div>

      {/* Chat Input */}
      <ChatInput loading={loading} onSend={onSend} />
    </div>
  );
}

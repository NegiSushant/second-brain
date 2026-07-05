import { useState, useEffect } from "react";
import askBrain from "../context/brainApi";
import type { ChatMessage } from "../types/chat";
import {
  loadConversation,
  clearConversation,
  saveConversation,
} from "../context/conversationStorage";

export default function useBrainChat() {
  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const conversation = loadConversation();
    return conversation?.messages ?? [];
  });

  useEffect(() => {
    if (messages.length === 0) {
      clearConversation();
      return;
    }

    const existing = loadConversation();

    saveConversation({
      id: existing?.id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages,
    });
  }, [messages]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;
    setError("");

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: query,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await askBrain({ query });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        createdAt: new Date(),
        sources: response.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, something went wrong.",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    clearConversation();

    setMessages([]);
    setError("");
    setLoading(false);
  };

  const hasConversation = messages.length > 0;

  return {
    messages,
    loading,
    error,
    sendMessage,
    hasConversation,
    newChat,
  };
}

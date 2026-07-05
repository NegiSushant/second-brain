import type { ChatMessage } from "../types/chat";

const STORAGE_KEY = "second-brain.active-conversation";

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

interface ExportOptions {
  conversation: Conversation;
  format: "txt";
}

//Load conversation from localStorage
export function loadConversation(): Conversation | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return null;

    return JSON.parse(data) as Conversation;
  } catch (error) {
    console.error("Failed to load conversation:", error);
    return null;
  }
}

//Save conversation to localStorage
export function saveConversation(conversation: Conversation) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversation));
  } catch (error) {
    console.error("Failed to save conversation:", error);
  }
}

// Remove conversation
export function clearConversation() {
  localStorage.removeItem(STORAGE_KEY);
}

// download conversation as txt
export function downloadConversation({ conversation, format }: ExportOptions) {
  switch (format) {
    case "txt":
      exportAsText(conversation);
      break;
  }
}

// export as text
function exportAsText(conversation: Conversation) {
  const text = buildConversationText(conversation);

  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `brain-chat-${new Date().toISOString()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// conversation format building
function buildConversationText(conversation: Conversation) {
  const lines: string[] = [];

  lines.push("-----------------------------------------");
  lines.push("            ASK YOUR BRAIN");
  lines.push("-----------------------------------------");
  lines.push("");

  lines.push(`Conversation Id : ${conversation.id}`);
  lines.push(`Created At      : ${conversation.createdAt}`);
  lines.push(`Updated At      : ${conversation.updatedAt}`);

  lines.push("");
  lines.push("-------------------------------------------");
  lines.push("");

  conversation.messages.forEach((message) => {
    lines.push(message.role === "user" ? "👤 USER" : "🧠 ASSISTANT");
    lines.push("");
    lines.push(message.content);
    lines.push("");

    if (
      message.role === "assistant" &&
      message.sources &&
      message.sources.length > 0
    ) {
      lines.push("Sources:");
      message.sources.forEach((source) => {
        lines.push(`• ${source}`);
      });
      lines.push("");
    }
    lines.push("-----------------------------------------");
    lines.push("");
  });
  return lines.join("\n");
}

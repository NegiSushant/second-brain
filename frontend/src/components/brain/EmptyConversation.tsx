// import { useState } from "react";
import { Brain } from "lucide-react";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

interface EmptyConversationProps {
  loading: boolean;
  onSend: (message: string) => Promise<void>;
}

const placeholders = [
  "Search your second brain...",
  "Summarize my uploaded document...",
  "Find notes from last week...",
  "Explain this code...",
  "Search across my bookmarks...",
  "Ask anything...",
];

export default function EmptyConversation({
  loading,
  onSend,
}: EmptyConversationProps) {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    value: string,
  ) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;
    await onSend(query);
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full border p-4">
            <Brain className="h-8 w-8" />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">Ask Your Brain</h1>

            <p className="text-muted-foreground text-lg">
              Search across your memories, documents, notes and saved links.
            </p>
          </div>
        </div>

        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          disabled={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

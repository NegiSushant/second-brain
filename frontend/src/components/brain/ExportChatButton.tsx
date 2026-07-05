import { IconDownload } from "@tabler/icons-react";
import { loadConversation } from "../../context/conversationStorage";
import { downloadConversation } from "../../context/conversationStorage";

export default function ExportChatButton() {
  const handleExport = () => {
    const conversation = loadConversation();
    if (!conversation) return;
    downloadConversation({ conversation, format: "txt" });
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      <IconDownload size={18} />
      Export
    </button>
  );
}

import useBrainChat from "../../hooks/useBrainChat";
import EmptyConversation from "../../components/brain/EmptyConversation";
import ActiveConversation from "../../components/brain/ActiveConversation";
import ExportChatButton from "../../components/brain/ExportChatButton";

export const ChatWithBrain = () => {
  const { messages, loading, sendMessage, hasConversation, newChat } =
    useBrainChat();
  if (messages.length === 0) {
    return <EmptyConversation loading={loading} onSend={sendMessage} />;
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-end gap-3">
        {hasConversation && (
          <>
            <ExportChatButton />
            <button
              onClick={newChat}
              className="rounded-lg border px-4 py-2 text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              New Chat
            </button>
          </>
        )}
      </div>

      {/* Conversation */}
      <div className="min-h-0 flex-1">
        <ActiveConversation
          messages={messages}
          loading={loading}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
};

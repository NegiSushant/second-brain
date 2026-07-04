import useBrainChat from "../../hooks/useBrainChat";
import EmptyConversation from "../../components/brain/EmptyConversation";
import ActiveConversation from "../../components/brain/ActiveConversation";

export const ChatWithBrain = () => {
  const { messages, loading, sendMessage } = useBrainChat();

  console.log(messages);

  if (messages.length === 0) {
    return <EmptyConversation loading={loading} onSend={sendMessage} />;
  }

  return (
    <ActiveConversation
      messages={messages}
      loading={loading}
      onSend={sendMessage}
    />
  );

  // return (
  //   <div className="flex h-full w-full">
  //     <EmptyConversation loading={loading} onSend={sendMessage} />
  //   </div>
  // );
};

// import { useEffect } from "react";
// import useBrainChat from "../../hooks/useBrainChat";

// export const ChatWithBrain = () => {
//   const { messages, loading, error, sendMessage } = useBrainChat();

//   useEffect(() => {
//     sendMessage("hello");
//   }, []);

//   return (
//     <div className="p-4">
//       <h1>Testing Brain Chat</h1>

//       {loading && <p>Loading...</p>}

//       {error && <p>{error}</p>}

//       <pre>{JSON.stringify(messages, null, 2)}</pre>
//     </div>
//   );
// };

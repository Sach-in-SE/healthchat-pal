
import MainLayout from "@/components/layouts/MainLayout";
import ChatContainer from "@/components/chat/ChatContainer";
import ChatProvider from "@/components/chat/ChatService";

const Chat = () => {
  return (
    <MainLayout>
      <ChatProvider>
        <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
          <ChatContainer />
        </div>
      </ChatProvider>
    </MainLayout>
  );
};

export default Chat;

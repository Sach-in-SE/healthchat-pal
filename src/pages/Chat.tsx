
import MainLayout from "@/components/layouts/MainLayout";
import ChatContainer from "@/components/chat/ChatContainer";

const Chat = () => {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
        <ChatContainer />
      </div>
    </MainLayout>
  );
};

export default Chat;

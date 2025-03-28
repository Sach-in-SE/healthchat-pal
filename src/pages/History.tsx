
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  
  // Mock chat history data
  const chatHistory = [
    {
      id: "1",
      date: "Today",
      title: "Headache and fever concerns",
      preview: "I've been having headaches and a slight fever for the past two days...",
      time: "12:30 PM"
    },
    {
      id: "2",
      date: "Yesterday",
      title: "Diet recommendations",
      preview: "What's a good diet for someone with high cholesterol?",
      time: "3:45 PM"
    },
    {
      id: "3",
      date: "Oct 15, 2023",
      title: "Exercise routine question",
      preview: "Can you suggest some low-impact exercises for joint pain?",
      time: "9:20 AM"
    },
    {
      id: "4",
      date: "Oct 12, 2023",
      title: "Sleep improvement tips",
      preview: "I've been having trouble sleeping lately. Any suggestions?",
      time: "10:15 PM"
    },
  ];

  const handleViewChat = (id: string) => {
    // In a real implementation, this would navigate to the specific chat
    navigate(`/chat?id=${id}`);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Chat History</h1>
          <Button onClick={() => navigate('/chat')}>New Chat</Button>
        </div>

        {chatHistory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You don't have any chat history yet.</p>
            <Button onClick={() => navigate('/chat')}>Start a New Chat</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((chat) => (
              <Card key={chat.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleViewChat(chat.id)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{chat.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">{chat.time}</span>
                  </div>
                  <CardDescription>{chat.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm truncate">{chat.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default History;

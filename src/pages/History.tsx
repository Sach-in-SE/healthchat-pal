
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";

// Types for chat history
interface ChatHistoryItem {
  id: string;
  date: Date;
  title: string;
  preview: string;
  userId: string;
}

const History = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const chatsRef = collection(db, "chatHistory");
        const q = query(
          chatsRef,
          where("userId", "==", currentUser.uid),
          orderBy("date", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const histories: ChatHistoryItem[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<ChatHistoryItem, "id"> & { date: any };
          histories.push({
            id: doc.id,
            date: data.date.toDate(),
            title: data.title,
            preview: data.preview,
            userId: data.userId
          });
        });
        
        setChatHistory(histories);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChatHistory();
  }, [currentUser]);

  const formatChatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d, yyyy");
    }
  };

  const formatChatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const handleViewChat = (id: string) => {
    navigate(`/chat?id=${id}`);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Chat History</h1>
          <Button onClick={() => navigate('/chat')}>New Chat</Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-health-primary border-t-transparent"></div>
          </div>
        ) : chatHistory.length === 0 ? (
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
                    <span className="text-sm text-muted-foreground">{formatChatTime(chat.date)}</span>
                  </div>
                  <CardDescription>{formatChatDate(chat.date)}</CardDescription>
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

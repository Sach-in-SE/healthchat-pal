
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { sendChatMessage } from '@/lib/chat-service';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

interface ChatContextProps {
  messages: Message[];
  sending: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract chat ID from URL if present
  useEffect(() => {
    const fetchChatHistory = async () => {
      const params = new URLSearchParams(location.search);
      const chatId = params.get('id');
      
      if (chatId && currentUser) {
        try {
          const chatDoc = await getDoc(doc(db, "chatHistory", chatId));
          
          if (chatDoc.exists()) {
            const data = chatDoc.data();
            
            // Ensure this chat belongs to the current user
            if (data.userId === currentUser.uid) {
              // Create message history from the saved chat
              const newMessages: Message[] = [
                {
                  id: `user-${Date.now()}-1`,
                  content: data.userMessage,
                  role: 'user',
                  timestamp: new Date(data.date.toDate())
                },
                {
                  id: `assistant-${Date.now()}-2`,
                  content: data.assistantResponse,
                  role: 'assistant',
                  timestamp: new Date(data.date.toDate())
                }
              ];
              
              setMessages(newMessages);
            } else {
              // If chat doesn't belong to user, redirect to new chat
              navigate('/chat');
              toast({
                variant: "destructive",
                title: "Access denied",
                description: "You don't have permission to view this chat."
              });
            }
          }
        } catch (error) {
          console.error("Error fetching chat:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load chat history."
          });
        }
      }
    };
    
    fetchChatHistory();
  }, [location, currentUser, navigate]);
  
  const sendMessage = async (content: string) => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to use the chat"
      });
      navigate('/login');
      return;
    }
    
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setSending(true);
    
    try {
      // Convert messages to the format expected by the API
      const messageHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const response = await sendChatMessage({
        userId: currentUser.uid,
        messages: messageHistory
      });
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    } finally {
      setSending(false);
    }
  };
  
  const clearChat = () => {
    setMessages([]);
    // Clear URL parameters if any
    if (location.search) {
      navigate('/chat');
    }
  };
  
  return (
    <ChatContext.Provider value={{ messages, sending, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

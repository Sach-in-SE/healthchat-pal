
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongMessage = message.content.length > 300;
  const displayContent = isLongMessage && !isExpanded 
    ? `${message.content.substring(0, 300)}...` 
    : message.content;

  return (
    <div className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {message.role === 'assistant' && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-health-primary text-white">
            <Bot size={16} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`${
        message.role === 'user' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted'
        } p-3 rounded-lg max-w-[80%]`}
      >
        <div className="whitespace-pre-wrap">{displayContent}</div>
        
        {isLongMessage && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs mt-2 underline"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
        
        <div className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {message.role === 'user' && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-health-secondary text-white">
            <User size={16} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;

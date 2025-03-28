
import { useState, FormEvent } from 'react';
import { Send, Mic, PaperclipIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput = ({ onSendMessage, isProcessing }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-background">
      <div className="relative">
        <Textarea
          placeholder="Type your health question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none pr-24"
          rows={2}
          disabled={isProcessing}
        />
        <div className="absolute right-2 bottom-2 flex space-x-1">
          <Button
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            disabled={isProcessing}
          >
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            disabled={isProcessing}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button 
            type="submit" 
            size="icon" 
            className="h-8 w-8" 
            disabled={!message.trim() || isProcessing}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isProcessing && (
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <div className="typing-indicator">
            <span className="typing-dot" style={{ animationDelay: "0ms" }}></span>
            <span className="typing-dot" style={{ animationDelay: "200ms" }}></span>
            <span className="typing-dot" style={{ animationDelay: "400ms" }}></span>
          </div>
          <span className="ml-2">HealthChat is thinking...</span>
        </div>
      )}
    </form>
  );
};

export default ChatInput;

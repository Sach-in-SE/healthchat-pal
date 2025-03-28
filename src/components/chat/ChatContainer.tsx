
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from './ChatService';

const ChatContainer = () => {
  const { messages, sending, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="bg-health-primary text-white p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
                <circle cx="12" cy="10" r="3"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to HealthChat</h2>
            <p className="text-muted-foreground mb-6">
              Your AI-powered health assistant. Ask me anything about your health, symptoms, or wellness concerns.
            </p>
            <div className="grid gap-2 max-w-md mx-auto w-full">
              {[
                "What symptoms indicate a common cold vs. flu?",
                "Can you suggest a balanced diet for someone with Type 2 diabetes?",
                "I've been feeling anxious lately. What can I do?",
                "What are the best exercises for lower back pain?"
              ].map((suggestion, i) => (
                <button
                  key={i}
                  className="text-left p-3 border rounded-lg hover:bg-muted transition-colors text-sm"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={sendMessage} isProcessing={sending} />
    </div>
  );
};

export default ChatContainer;

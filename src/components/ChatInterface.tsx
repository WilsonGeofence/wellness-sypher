
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './chat/ChatHeader';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import ChatSuggestions from './chat/ChatSuggestions';
import { Message } from '../types/chat';

type ChatInterfaceProps = {
  onSendMessage?: (message: string) => Promise<string>;
  suggestions?: string[];
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onSendMessage,
  suggestions = [
    "How can I improve my sleep quality?",
    "What are good stress reduction techniques?",
    "Give me a quick 10-minute workout",
    "Tips for healthy eating habits"
  ]
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Sypher!\nyour AI personal health assistant",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let aiResponse = "I'm processing your request. Give me a moment...";
      
      if (onSendMessage) {
        aiResponse = await onSendMessage(inputValue);
      }

      // Simulate typing delay even when function returns immediately
      await new Promise(resolve => setTimeout(resolve, 500));

      const aiMessage: Message = {
        id: generateId(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: generateId(),
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden bg-sypher-gray-light shadow-sm">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-sypher-black rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] animate-pulse">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 bg-sypher-blue-accent/50 rounded-full animate-bounce"></div>
                  <div className="h-3 w-3 bg-sypher-blue-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-3 w-3 bg-sypher-blue-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {suggestions && suggestions.length > 0 && messages.length < 3 && (
        <ChatSuggestions 
          suggestions={suggestions} 
          onSuggestionClick={handleSuggestionClick} 
        />
      )}

      <ChatInput 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatInterface;


import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, CornerDownLeft, RotateCcw } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

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
      text: "Hi there! I'm your personal health assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

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

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden glass-card animate-fade-in">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-sypher-blue-accent text-white rounded-tr-none'
                    : 'bg-sypher-gray-light text-sypher-black rounded-tl-none'
                } animate-fade-in-up shadow-sm`}
              >
                <div className="prose prose-sm">
                  {message.text.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
                  ))}
                </div>
                <div className={`text-xs mt-1 text-right ${
                  message.sender === 'user' ? 'text-white/70' : 'text-sypher-gray-dark/50'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-sypher-gray-light text-sypher-black rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] animate-pulse">
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
        <div className="px-4 py-3 bg-white border-t border-sypher-gray-light/50">
          <p className="text-xs text-sypher-gray-dark/70 mb-2">Try asking about:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm bg-sypher-blue px-3 py-1.5 rounded-full text-sypher-blue-dark hover:bg-sypher-blue-accent hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-sypher-gray-light/50 p-4 bg-white">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full border border-sypher-gray-light rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50 resize-none min-h-[44px] max-h-[120px]"
              rows={1}
            />
            <button
              className="absolute right-3 bottom-3 text-sypher-gray-dark hover:text-sypher-blue-accent transition-colors"
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <RotateCcw size={18} className="animate-spin" />
              ) : (
                inputValue.trim() ? (
                  <CornerDownLeft size={18} />
                ) : (
                  <Plus size={18} />
                )
              )}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="neo-button h-11 w-11 flex-shrink-0 flex items-center justify-center disabled:opacity-60"
          >
            <Send size={18} className={inputValue.trim() ? 'text-sypher-blue-accent' : 'text-sypher-gray-dark/70'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;


import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft, RotateCcw } from 'lucide-react';

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
      text: "Hi! I'm Sypher!\nyour AI personal health assistant",
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

  const renderMessageContent = (text: string) => {
    // Check if the message contains a meal plan
    if (text.includes('Breakfast') && text.includes('Lunch') && text.includes('Dinner')) {
      const sections = text.split('\n\n').filter(section => section.trim());
      
      return (
        <div className="space-y-4">
          {sections.map((section, index) => {
            // Parse meal sections
            if (section.startsWith('Breakfast') || section.startsWith('Lunch') || section.startsWith('Dinner')) {
              const [title, calories, imagePlaceholder, ...rest] = section.split('\n');
              
              return (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="font-medium">{title}</div>
                  <div className="text-sm text-gray-500">{calories}</div>
                  {imagePlaceholder.includes('[Image') && (
                    <div className="bg-gray-200 h-32 rounded-lg mt-2 flex items-center justify-center">
                      {rest[0] && <p className="text-center px-2">{rest[0]}</p>}
                    </div>
                  )}
                </div>
              );
            }
            
            // Render the total calories or other text
            return (
              <div key={index} className="text-sm">
                {section}
              </div>
            );
          })}
          <div className="mt-2 flex justify-end">
            <button className="bg-sypher-blue-accent text-white rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        </div>
      );
    }
    
    // Regular message rendering
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
    ));
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden bg-sypher-gray-light shadow-sm">
      {/* Chat header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
        <div className="h-8 w-8 rounded-full bg-sypher-blue-accent/20 flex items-center justify-center text-sypher-blue-accent">
          <span className="text-lg">G</span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">Sypher AI Health Assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-black text-white rounded-tr-none'
                    : 'bg-white text-sypher-black rounded-tl-none'
                } animate-fade-in-up shadow-sm`}
              >
                <div className="prose prose-sm">
                  {renderMessageContent(message.text)}
                </div>
              </div>
            </div>
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
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm bg-sypher-gray-light px-3 py-1.5 rounded-full text-sypher-gray-dark hover:bg-sypher-blue hover:text-sypher-blue-dark transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative bg-sypher-gray-light rounded-full">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask Sypher a question..."
              className="w-full border-none bg-transparent rounded-full pl-4 pr-10 py-2 focus:outline-none resize-none min-h-[44px] max-h-[120px]"
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
                inputValue.trim() && <CornerDownLeft size={18} />
              )}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-sypher-blue-accent h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-white disabled:opacity-60"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;


import React from 'react';
import { Message } from '../../types/chat';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
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
    <div
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
  );
};

export default ChatMessage;

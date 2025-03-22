
import React from 'react';

type ChatSuggestionsProps = {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
};

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ 
  suggestions, 
  onSuggestionClick 
}) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-sm bg-sypher-gray-light px-3 py-1.5 rounded-full text-sypher-gray-dark hover:bg-sypher-blue hover:text-sypher-blue-dark transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;

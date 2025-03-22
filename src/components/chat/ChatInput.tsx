
import React, { useRef } from 'react';
import { Send, CornerDownLeft, RotateCcw } from 'lucide-react';

type ChatInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isLoading
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
  );
};

export default ChatInput;

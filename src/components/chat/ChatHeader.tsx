
import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
      <div className="h-8 w-8 rounded-full bg-sypher-blue-accent/20 flex items-center justify-center text-sypher-blue-accent">
        <span className="text-lg">G</span>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium">Sypher AI Health Assistant</p>
      </div>
    </div>
  );
};

export default ChatHeader;


import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 rounded-full bg-sypher-blue animate-pulse-soft"></div>
        <p className="mt-4 text-sypher-gray-dark">Loading your health data...</p>
      </div>
    </div>
  );
};

export default LoadingState;

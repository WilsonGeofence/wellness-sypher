
import React from 'react';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex border-t border-sypher-gray-light">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 ${
            i + 1 <= currentStep ? 'bg-sypher-blue-accent' : 'bg-sypher-gray-light'
          } transition-all duration-300`}
        ></div>
      ))}
    </div>
  );
};

export default StepIndicator;

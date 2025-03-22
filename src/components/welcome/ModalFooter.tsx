
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type ModalFooterProps = {
  step: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  isNextDisabled: boolean;
};

const ModalFooter: React.FC<ModalFooterProps> = ({ 
  step, 
  totalSteps, 
  handleBack, 
  handleNext,
  isNextDisabled
}) => {
  return (
    <div className="flex justify-between mt-8">
      {step > 1 ? (
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-sypher-gray-dark hover:bg-sypher-gray-light rounded-lg transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </button>
      ) : (
        <div></div>
      )}
      
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="flex items-center px-5 py-2.5 bg-sypher-blue-accent text-white font-medium rounded-lg hover:bg-sypher-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {step === totalSteps ? 'Complete' : 'Next'}
        {step !== totalSteps && <ChevronRight size={20} className="ml-1" />}
      </button>
    </div>
  );
};

export default ModalFooter;

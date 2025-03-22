
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { UserData } from '../types/chat';
import Step1Profile from './welcome/Step1Profile';
import Step2Goals from './welcome/Step2Goals';
import Step3Targets from './welcome/Step3Targets';
import StepIndicator from './welcome/StepIndicator';
import ModalFooter from './welcome/ModalFooter';

type WelcomeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (userData: UserData) => void;
};

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 30,
    gender: '',
    height: 170,
    weight: 70,
    primaryGoal: '',
    sleepGoal: 8,
    activityGoal: 30,
  });

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: ['age', 'height', 'weight', 'sleepGoal', 'activityGoal'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      onComplete(userData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const isNextDisabled = (
    (step === 1 && !userData.name) ||
    (step === 2 && !userData.primaryGoal)
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1Profile userData={userData} handleChange={handleChange} />;
      case 2:
        return <Step2Goals userData={userData} setUserData={setUserData} />;
      case 3:
        return <Step3Targets userData={userData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-sypher-gray-light transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          {renderStepContent()}
          
          <ModalFooter
            step={step}
            totalSteps={totalSteps}
            handleBack={handleBack}
            handleNext={handleNext}
            isNextDisabled={isNextDisabled}
          />
        </div>
        
        <StepIndicator currentStep={step} totalSteps={totalSteps} />
      </div>
    </div>
  );
};

export default WelcomeModal;

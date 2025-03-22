import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { UserData } from '../types/chat';

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

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-sypher-black">Welcome to Sypher</h2>
            <p className="text-sypher-gray-dark">
              Let's set up your profile to personalize your experience.
            </p>
            
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-sypher-gray-dark mb-1.5">
                  What's your name?
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-sypher-gray-light shadow-sm focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sypher-gray-dark mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={userData.age}
                    onChange={handleChange}
                    min={1}
                    max={120}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-sypher-gray-light shadow-sm focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sypher-gray-dark mb-1.5">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-sypher-gray-light shadow-sm focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sypher-gray-dark mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={userData.height}
                    onChange={handleChange}
                    min={50}
                    max={250}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-sypher-gray-light shadow-sm focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sypher-gray-dark mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={userData.weight}
                    onChange={handleChange}
                    min={1}
                    max={300}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-sypher-gray-light shadow-sm focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-sypher-black">What's your primary goal?</h2>
            <p className="text-sypher-gray-dark">
              Select a focus area so we can personalize your experience.
            </p>
            
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                { id: 'improve-sleep', label: 'Improve Sleep Quality' },
                { id: 'reduce-stress', label: 'Reduce Stress' },
                { id: 'increase-activity', label: 'Increase Physical Activity' },
                { id: 'better-nutrition', label: 'Better Nutrition' },
                { id: 'overall-wellness', label: 'Overall Wellness' },
              ].map(goal => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setUserData({ ...userData, primaryGoal: goal.id })}
                  className={`text-left px-5 py-4 rounded-xl transition-all duration-200 ${
                    userData.primaryGoal === goal.id
                      ? 'bg-sypher-blue shadow-neo border border-sypher-blue-accent/20'
                      : 'bg-white hover:bg-sypher-gray-light border border-sypher-gray-light'
                  }`}
                >
                  <span className={userData.primaryGoal === goal.id ? 'font-medium text-sypher-blue-dark' : ''}>
                    {goal.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-sypher-black">Set your daily targets</h2>
            <p className="text-sypher-gray-dark">
              These targets will help us track your progress and provide personalized insights.
            </p>
            
            <div className="space-y-6 pt-2">
              <div>
                <label className="block text-base font-medium text-sypher-gray-dark mb-2">
                  Sleep Goal (hours per night)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="sleepGoal"
                    value={userData.sleepGoal}
                    onChange={handleChange}
                    min={4}
                    max={12}
                    step={0.5}
                    className="w-full h-2 bg-sypher-gray-light rounded-lg appearance-none cursor-pointer accent-sypher-blue-accent"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-sypher-gray-dark/70">4h</span>
                  <span className="text-base font-medium">{userData.sleepGoal}h</span>
                  <span className="text-sm text-sypher-gray-dark/70">12h</span>
                </div>
              </div>
              
              <div>
                <label className="block text-base font-medium text-sypher-gray-dark mb-2">
                  Activity Goal (minutes per day)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="activityGoal"
                    value={userData.activityGoal}
                    onChange={handleChange}
                    min={10}
                    max={120}
                    step={5}
                    className="w-full h-2 bg-sypher-gray-light rounded-lg appearance-none cursor-pointer accent-sypher-blue-accent"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-sypher-gray-dark/70">10m</span>
                  <span className="text-base font-medium">{userData.activityGoal}m</span>
                  <span className="text-sm text-sypher-gray-dark/70">120m</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-sypher-gray-dark/70">
                You can always adjust these goals later in your profile settings.
              </p>
            </div>
          </div>
        );
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
          {getStepContent()}
          
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
              disabled={
                (step === 1 && !userData.name) ||
                (step === 2 && !userData.primaryGoal)
              }
              className="flex items-center px-5 py-2.5 bg-sypher-blue-accent text-white font-medium rounded-lg hover:bg-sypher-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {step === totalSteps ? 'Complete' : 'Next'}
              {step !== totalSteps && <ChevronRight size={20} className="ml-1" />}
            </button>
          </div>
        </div>
        
        <div className="flex border-t border-sypher-gray-light">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 ${
                i + 1 <= step ? 'bg-sypher-blue-accent' : 'bg-sypher-gray-light'
              } transition-all duration-300`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;

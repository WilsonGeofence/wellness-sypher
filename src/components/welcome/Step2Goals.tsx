
import React from 'react';
import { UserData } from '../../types/chat';

type Step2GoalsProps = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

const Step2Goals: React.FC<Step2GoalsProps> = ({ userData, setUserData }) => {
  const goals = [
    { id: 'improve-sleep', label: 'Improve Sleep Quality', icon: '😴' },
    { id: 'reduce-stress', label: 'Reduce Stress', icon: '🧘' },
    { id: 'increase-activity', label: 'Increase Physical Activity', icon: '🏃' },
    { id: 'better-nutrition', label: 'Better Nutrition', icon: '🥗' },
    { id: 'overall-wellness', label: 'Overall Wellness', icon: '🌱' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-sypher-black">What's your primary goal?</h2>
      <p className="text-sypher-gray-dark">
        Select a focus area so we can personalize your experience.
      </p>
      
      <div className="grid grid-cols-1 gap-3 pt-2">
        {goals.map(goal => (
          <button
            key={goal.id}
            type="button"
            onClick={() => setUserData({ ...userData, primaryGoal: goal.id })}
            className={`text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center ${
              userData.primaryGoal === goal.id
                ? 'bg-sypher-blue shadow-neo border border-sypher-blue-accent/20'
                : 'bg-white hover:bg-sypher-gray-light border border-sypher-gray-light'
            }`}
          >
            <span className="mr-3 text-xl">{goal.icon}</span>
            <span className={userData.primaryGoal === goal.id ? 'font-medium text-sypher-blue-dark' : ''}>
              {goal.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step2Goals;

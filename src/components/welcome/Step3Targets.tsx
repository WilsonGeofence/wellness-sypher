
import React from 'react';
import { UserData } from '../../types/chat';

type Step3TargetsProps = {
  userData: UserData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const Step3Targets: React.FC<Step3TargetsProps> = ({ userData, handleChange }) => {
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
};

export default Step3Targets;

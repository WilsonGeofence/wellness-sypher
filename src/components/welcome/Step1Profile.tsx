
import React from 'react';
import { UserData } from '../../types/chat';

type Step1ProfileProps = {
  userData: UserData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const Step1Profile: React.FC<Step1ProfileProps> = ({ userData, handleChange }) => {
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
};

export default Step1Profile;

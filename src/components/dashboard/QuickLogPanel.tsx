
import React from 'react';
import { Activity, Moon, Utensils, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickLogPanel: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="md:col-span-2 glass-card p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <h2 className="text-xl font-semibold text-sypher-black mb-4">Today's Quick Log</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/insights')}
          className="flex flex-col items-center justify-center p-4 rounded-xl neo-button"
        >
          <Activity size={24} className="mb-2 text-sypher-blue-accent" />
          <span className="text-sm text-sypher-gray-dark">Activity</span>
        </button>
        <button
          onClick={() => navigate('/insights')}
          className="flex flex-col items-center justify-center p-4 rounded-xl neo-button"
        >
          <Moon size={24} className="mb-2 text-sypher-blue-accent" />
          <span className="text-sm text-sypher-gray-dark">Sleep</span>
        </button>
        <button
          onClick={() => navigate('/insights')}
          className="flex flex-col items-center justify-center p-4 rounded-xl neo-button"
        >
          <Utensils size={24} className="mb-2 text-sypher-blue-accent" />
          <span className="text-sm text-sypher-gray-dark">Diet</span>
        </button>
        <button
          onClick={() => navigate('/insights')}
          className="flex flex-col items-center justify-center p-4 rounded-xl neo-button"
        >
          <Heart size={24} className="mb-2 text-sypher-blue-accent" />
          <span className="text-sm text-sypher-gray-dark">Stress</span>
        </button>
      </div>
    </div>
  );
};

export default QuickLogPanel;

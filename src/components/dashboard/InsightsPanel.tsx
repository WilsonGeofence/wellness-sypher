
import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InsightCard from '../InsightCard';

interface InsightsPanelProps {
  insights: any[];
  user: any;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights, user }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex justify-between items-center mb-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <h2 className="text-xl font-semibold text-sypher-black">Your AI Insights</h2>
        <button 
          onClick={() => navigate('/insights')}
          className="text-sm flex items-center text-sypher-blue-dark hover:text-sypher-blue-accent transition-colors"
        >
          View All 
          <Plus size={16} className="ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {insights.slice(0, 2).map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            type={insight.type}
            actionText="Learn More"
            onAction={() => navigate('/insights')}
          />
        ))}
        
        {(!insights || insights.length === 0) && user && (
          <div className="col-span-full text-center py-6 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sypher-gray-dark">Start tracking your health metrics to receive AI insights</p>
          </div>
        )}
      </div>
    </>
  );
};

export default InsightsPanel;

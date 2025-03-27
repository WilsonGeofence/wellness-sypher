
import React from 'react';
import HealthScore from '../HealthScore';

interface HealthSummaryProps {
  healthScore: number;
}

const HealthSummary: React.FC<HealthSummaryProps> = ({ healthScore }) => {
  return (
    <div className="md:col-span-1 flex justify-center glass-card p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <HealthScore score={healthScore} size="lg" />
    </div>
  );
};

export default HealthSummary;

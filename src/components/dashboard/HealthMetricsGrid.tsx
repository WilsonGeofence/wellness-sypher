
import React from 'react';
import HealthMetricCard from '../HealthMetricCard';
import { Moon, Activity, Heart, Clock } from 'lucide-react';
import { HealthData } from '@/utils/healthUtils';

interface HealthMetricsGridProps {
  onMetricUpdate: (category: keyof HealthData, value: number | string, field: string) => Promise<void>;
}

const HealthMetricsGrid: React.FC<HealthMetricsGridProps> = ({ onMetricUpdate }) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-sypher-black mb-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        Today's Health Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <HealthMetricCard
          title="Sleep Duration"
          description="Hours of sleep last night"
          icon={<Moon size={24} />}
          value={7.5}
          unit="hrs"
          min={0}
          max={12}
          step={0.5}
          type="slider"
          onChange={(value) => onMetricUpdate('sleep', value as number, 'hours')}
        />
        <HealthMetricCard
          title="Physical Activity"
          description="Minutes of activity today"
          icon={<Activity size={24} />}
          value={30}
          unit="min"
          min={0}
          max={180}
          step={5}
          type="counter"
          onChange={(value) => onMetricUpdate('activity', value as number, 'minutes')}
        />
        <HealthMetricCard
          title="Stress Level"
          description="Rate your stress today"
          icon={<Heart size={24} />}
          value={4}
          min={1}
          max={10}
          type="slider"
          onChange={(value) => onMetricUpdate('stress', value as number, 'level')}
        />
        <HealthMetricCard
          title="Water Intake"
          description="Glasses of water today"
          icon={<Clock size={24} />}
          value={3}
          unit="glasses"
          min={0}
          max={12}
          type="counter"
          onChange={(value) => onMetricUpdate('diet', value as number, 'water')}
        />
      </div>
    </>
  );
};

export default HealthMetricsGrid;

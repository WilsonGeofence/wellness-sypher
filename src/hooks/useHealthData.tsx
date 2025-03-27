
import { useState, useEffect } from 'react';
import { 
  calculateHealthScore, 
  generateInsights, 
  type HealthData 
} from '../utils/healthUtils';
import { fetchUserHealthData, addHealthMetric } from '../utils/supabaseHealthUtils';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useHealthData = (user: any) => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [healthScore, setHealthScore] = useState(0);
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load health data from Supabase
  useEffect(() => {
    const loadHealthData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchUserHealthData();
        if (data) {
          setHealthData(data);
          
          // Calculate health score
          const score = calculateHealthScore(data);
          setHealthScore(score);
          
          // Generate insights
          const generatedInsights = generateInsights(data);
          setInsights(generatedInsights);
        }
      } catch (err) {
        console.error('Error loading health data:', err);
        setError("Failed to load health data. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load your health data",
          variant: "destructive"
        });
      } finally {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    };

    loadHealthData();
  }, [user, toast]);

  const handleMetricUpdate = async (category: keyof HealthData, value: number | string, field: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to track your health metrics",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    let success = false;

    if (category === 'sleep' && field === 'hours') {
      success = await addHealthMetric('sleep', {
        hours: value as number,
        quality: 7, // Default quality
        time: new Date()
      });
    } else if (category === 'activity' && field === 'minutes') {
      success = await addHealthMetric('activity', {
        minutes: value as number,
        intensity: 7, // Default intensity
        type: 'walking', // Default type
        time: new Date()
      });
    } else if (category === 'stress' && field === 'level') {
      success = await addHealthMetric('stress', {
        level: value as number,
        notes: '',
        time: new Date()
      });
    } else if (category === 'diet' && field === 'water') {
      success = await addHealthMetric('diet', {
        meal_name: null,
        quality: null,
        water: value as number,
        time: new Date()
      });
    }

    if (success) {
      toast({
        title: "Metric Updated",
        description: "Your health data has been saved",
      });
      
      // Refresh health data
      const newData = await fetchUserHealthData();
      if (newData) {
        setHealthData(newData);
        setHealthScore(calculateHealthScore(newData));
        setInsights(generateInsights(newData));
      }
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to save your health data",
        variant: "destructive"
      });
    }
  };

  return {
    healthData,
    healthScore,
    insights,
    isLoading, 
    error,
    handleMetricUpdate
  };
};

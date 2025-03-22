import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HealthMetricCard from '../components/HealthMetricCard';
import HealthScore from '../components/HealthScore';
import InsightCard from '../components/InsightCard';
import WelcomeModal from '../components/WelcomeModal';
import { Button } from '@/components/ui/button';
import { 
  Moon, 
  Activity, 
  Heart,  
  Utensils, 
  Clock,
  Plus
} from 'lucide-react';
import { 
  generateMockHealthData, 
  calculateHealthScore, 
  generateInsights, 
  formatDate,
  type HealthData
} from '../utils/healthUtils';
import { UserData } from '../types/chat';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [healthScore, setHealthScore] = useState(0);
  const [insights, setInsights] = useState<any[]>([]);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const today = new Date();
  const formattedDate = formatDate(today, 'long');

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Check if we have user data stored
    const savedUserData = localStorage.getItem('userData');
    if (!savedUserData && user) {
      // If we have a logged in user but no user data, show the welcome modal
      setShowWelcomeModal(true);
    } else if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    const savedHealthData = localStorage.getItem('healthData');
    if (savedHealthData) {
      const parsedData = JSON.parse(savedHealthData, (key, value) => {
        if (key === 'time' && typeof value === 'string') {
          return new Date(value);
        }
        return value;
      });
      setHealthData(parsedData);
    } else {
      const mockData = generateMockHealthData();
      setHealthData(mockData);
      localStorage.setItem('healthData', JSON.stringify(mockData));
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => subscription.unsubscribe();
  }, [user]);

  useEffect(() => {
    if (healthData) {
      const score = calculateHealthScore(healthData);
      setHealthScore(score);
      
      const generatedInsights = generateInsights(healthData);
      setInsights(generatedInsights);
    }
  }, [healthData]);

  const handleOnboardingComplete = (userData: UserData) => {
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    setShowWelcomeModal(false);
  };

  const handleMetricUpdate = (category: keyof HealthData, value: number | string, field: string) => {
    if (!healthData) return;

    const newHealthData = { ...healthData };

    if (category === 'diet' && field === 'water') {
      const todayEntry = newHealthData.diet.find(
        item => formatDate(item.time, 'short') === formatDate(new Date(), 'short')
      );

      if (todayEntry) {
        todayEntry.water = value as number;
      } else {
        newHealthData.diet.push({
          meals: [],
          water: value as number,
          time: new Date()
        });
      }
    } else if (category === 'diet' && field === 'mealQuality') {
      const todayEntry = newHealthData.diet.find(
        item => formatDate(item.time, 'short') === formatDate(new Date(), 'short')
      );

      if (todayEntry) {
        todayEntry.meals.push({
          name: 'Meal',
          quality: value as number,
          time: new Date()
        });
      } else {
        newHealthData.diet.push({
          meals: [{
            name: 'Meal',
            quality: value as number,
            time: new Date()
          }],
          water: 0,
          time: new Date()
        });
      }
    } else {
      const entry = {
        value: value as number,
        time: new Date(),
      };
      
      newHealthData[category].push(entry as any);
    }

    setHealthData(newHealthData);
    localStorage.setItem('healthData', JSON.stringify(newHealthData));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-sypher-blue animate-pulse-soft"></div>
            <p className="mt-4 text-sypher-gray-dark">Loading your health data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sypher-black animate-fade-in-up">
            {userData ? `Hello, ${userData.name}` : user ? 'Welcome to Sypher' : 'Welcome to Sypher'}
          </h1>
          <p className="text-sypher-gray-dark mt-1 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {formattedDate}
          </p>
          {!user && (
            <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Button 
                variant="default" 
                onClick={() => navigate('/auth')}
                className="bg-sypher-blue text-white"
              >
                Sign in to track your health
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 flex justify-center glass-card p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <HealthScore score={healthScore} size="lg" />
          </div>

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
        </div>

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
            onChange={(value) => handleMetricUpdate('sleep', value as number, 'hours')}
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
            onChange={(value) => handleMetricUpdate('activity', value as number, 'minutes')}
          />
          <HealthMetricCard
            title="Stress Level"
            description="Rate your stress today"
            icon={<Heart size={24} />}
            value={4}
            min={1}
            max={10}
            type="slider"
            onChange={(value) => handleMetricUpdate('stress', value as number, 'level')}
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
            onChange={(value) => handleMetricUpdate('diet', value as number, 'water')}
          />
        </div>

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
        </div>
      </div>

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onComplete={handleOnboardingComplete}
      />
    </Layout>
  );
};

export default Index;

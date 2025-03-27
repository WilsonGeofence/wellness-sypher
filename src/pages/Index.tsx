
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
  Plus,
  AlertCircle
} from 'lucide-react';
import { 
  calculateHealthScore, 
  generateInsights, 
  formatDate,
  type HealthData 
} from '../utils/healthUtils';
import { fetchUserHealthData, addHealthMetric } from '../utils/supabaseHealthUtils';
import { UserData } from '../types/chat';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [healthScore, setHealthScore] = useState(0);
  const [insights, setInsights] = useState<any[]>([]);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

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

    return () => subscription.unsubscribe();
  }, [user]);

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

  const handleOnboardingComplete = (userData: UserData) => {
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    setShowWelcomeModal(false);
  };

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

        {error && (
          <Alert variant="destructive" className="mb-6 animate-fade-in-up">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
          
          {(!insights || insights.length === 0) && user && (
            <div className="col-span-full text-center py-6 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sypher-gray-dark">Start tracking your health metrics to receive AI insights</p>
            </div>
          )}
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


import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { formatDate } from '../utils/healthUtils';
import { UserData } from '../types/chat';
import { supabase } from '@/integrations/supabase/client';
import WelcomeModal from '../components/WelcomeModal';
import { useHealthData } from '@/hooks/useHealthData';

// Dashboard Components
import LoadingState from '@/components/dashboard/LoadingState';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import ErrorAlert from '@/components/dashboard/ErrorAlert';
import HealthSummary from '@/components/dashboard/HealthSummary';
import QuickLogPanel from '@/components/dashboard/QuickLogPanel';
import HealthMetricsGrid from '@/components/dashboard/HealthMetricsGrid';
import InsightsPanel from '@/components/dashboard/InsightsPanel';

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<any>(null);

  const today = new Date();
  const formattedDate = formatDate(today, 'long');

  // Use our custom hook to handle health data
  const { 
    healthScore, 
    insights, 
    isLoading, 
    error, 
    handleMetricUpdate 
  } = useHealthData(user);

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

  const handleOnboardingComplete = (userData: UserData) => {
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    setShowWelcomeModal(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <WelcomeHeader 
          userData={userData} 
          user={user} 
          formattedDate={formattedDate} 
        />

        <ErrorAlert error={error} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <HealthSummary healthScore={healthScore} />
          <QuickLogPanel />
        </div>

        <HealthMetricsGrid onMetricUpdate={handleMetricUpdate} />
        
        <InsightsPanel insights={insights} user={user} />
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

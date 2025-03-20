
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TrendChart from '../components/TrendChart';
import InsightCard from '../components/InsightCard';
import { 
  Moon, 
  Activity, 
  Heart, 
  Calendar, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import { 
  generateMockHealthData, 
  generateInsights, 
  prepareChartData,
  type HealthData 
} from '../utils/healthUtils';

const Insights = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'sleep' | 'activity' | 'diet' | 'stress'>('overview');
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');
  
  const tabOptions = [
    { id: 'overview', label: 'Overview', icon: <Calendar size={18} /> },
    { id: 'sleep', label: 'Sleep', icon: <Moon size={18} /> },
    { id: 'activity', label: 'Activity', icon: <Activity size={18} /> },
    { id: 'stress', label: 'Stress', icon: <Heart size={18} /> },
  ];

  // Load health data
  useEffect(() => {
    const savedHealthData = localStorage.getItem('healthData');
    if (savedHealthData) {
      const parsedData = JSON.parse(savedHealthData, (key, value) => {
        // Convert date strings back to Date objects
        if (key === 'time' && typeof value === 'string') {
          return new Date(value);
        }
        return value;
      });
      setHealthData(parsedData);
    } else {
      // Generate mock data for first-time users
      const mockData = generateMockHealthData();
      setHealthData(mockData);
      localStorage.setItem('healthData', JSON.stringify(mockData));
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Generate insights when health data changes
  useEffect(() => {
    if (healthData) {
      const generatedInsights = generateInsights(healthData);
      setInsights(generatedInsights);
    }
  }, [healthData]);

  // Prepare chart data
  const sleepChartData = healthData 
    ? prepareChartData(healthData.sleep, 'time', 'hours', timeframe === 'week' ? 7 : 30)
    : [];

  const activityChartData = healthData 
    ? prepareChartData(healthData.activity, 'time', 'minutes', timeframe === 'week' ? 7 : 30)
    : [];

  const stressChartData = healthData 
    ? prepareChartData(healthData.stress, 'time', 'level', timeframe === 'week' ? 7 : 30)
    : [];

  // Animation delay calculation
  const getAnimationDelay = (index: number) => {
    return { animationDelay: `${100 + (index * 100)}ms` };
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-sypher-blue animate-pulse-soft"></div>
            <p className="mt-4 text-sypher-gray-dark">Analyzing your health data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-sypher-black">Your Health Insights</h1>
          <p className="text-sypher-gray-dark mt-1">
            Trends, patterns, and recommendations based on your data
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 animate-fade-in-up" style={getAnimationDelay(1)}>
          <div className="flex space-x-2">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-sypher-blue shadow-neo border border-sypher-blue-accent/20 text-sypher-blue-dark font-medium'
                    : 'bg-white hover:bg-sypher-gray-light border border-sypher-gray-light'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selector */}
        <div className="flex justify-between items-center mb-6 animate-fade-in-up" style={getAnimationDelay(2)}>
          <h2 className="text-xl font-semibold text-sypher-black">
            {activeTab === 'overview' ? 'Key Metrics Overview' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Trends`}
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                timeframe === 'week'
                  ? 'bg-sypher-blue text-sypher-blue-dark font-medium'
                  : 'hover:bg-sypher-gray-light'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                timeframe === 'month'
                  ? 'bg-sypher-blue text-sypher-blue-dark font-medium'
                  : 'hover:bg-sypher-gray-light'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Charts Section */}
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="animate-fade-in-up" style={getAnimationDelay(3)}>
              <TrendChart 
                data={sleepChartData} 
                title="Sleep Duration" 
                unit="hrs"
                color="#64B5F6"
              />
            </div>
            <div className="animate-fade-in-up" style={getAnimationDelay(4)}>
              <TrendChart 
                data={activityChartData} 
                title="Activity Minutes" 
                unit="min"
                color="#4CAF50"
              />
            </div>
            <div className="animate-fade-in-up" style={getAnimationDelay(5)}>
              <TrendChart 
                data={stressChartData} 
                title="Stress Level" 
                unit=""
                color="#FF7043"
              />
            </div>
          </div>
        ) : activeTab === 'sleep' ? (
          <div className="mb-8 animate-fade-in-up" style={getAnimationDelay(3)}>
            <TrendChart 
              data={sleepChartData} 
              title="Sleep Duration" 
              unit="hrs"
              color="#64B5F6"
            />
          </div>
        ) : activeTab === 'activity' ? (
          <div className="mb-8 animate-fade-in-up" style={getAnimationDelay(3)}>
            <TrendChart 
              data={activityChartData} 
              title="Activity Minutes" 
              unit="min"
              color="#4CAF50"
            />
          </div>
        ) : (
          <div className="mb-8 animate-fade-in-up" style={getAnimationDelay(3)}>
            <TrendChart 
              data={stressChartData} 
              title="Stress Level" 
              unit=""
              color="#FF7043"
            />
          </div>
        )}

        {/* Insights Section */}
        <h2 className="text-xl font-semibold text-sypher-black mb-4 animate-fade-in-up" style={getAnimationDelay(6)}>
          Your AI-Generated Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {insights.map((insight, index) => (
            <div className="animate-fade-in-up" style={getAnimationDelay(7 + index)} key={index}>
              <InsightCard
                title={insight.title}
                description={insight.description}
                type={insight.type}
                actionText={insight.type === 'warning' ? "Learn How to Improve" : "Learn More"}
                onAction={() => {
                  // Navigate to chat with a pre-filled question
                  const queryString = new URLSearchParams({
                    topic: insight.title.toLowerCase().includes('sleep') 
                      ? 'sleep' 
                      : insight.title.toLowerCase().includes('stress')
                      ? 'stress'
                      : insight.title.toLowerCase().includes('activity')
                      ? 'activity'
                      : 'general'
                  }).toString();
                  window.location.href = `/chat?${queryString}`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mt-12 animate-fade-in-up" style={getAnimationDelay(10)}>
          <button
            onClick={() => {
              const currentIndex = tabOptions.findIndex(tab => tab.id === activeTab);
              const prevIndex = (currentIndex - 1 + tabOptions.length) % tabOptions.length;
              setActiveTab(tabOptions[prevIndex].id as any);
            }}
            className="flex items-center px-4 py-2 rounded-lg hover:bg-sypher-gray-light transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Previous
          </button>
          <button
            onClick={() => {
              const currentIndex = tabOptions.findIndex(tab => tab.id === activeTab);
              const nextIndex = (currentIndex + 1) % tabOptions.length;
              setActiveTab(tabOptions[nextIndex].id as any);
            }}
            className="flex items-center px-4 py-2 rounded-lg hover:bg-sypher-gray-light transition-colors"
          >
            Next
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Insights;

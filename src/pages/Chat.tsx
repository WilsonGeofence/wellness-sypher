
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatInterface from '../components/ChatInterface';
import { useLocation } from 'react-router-dom';
import { Sparkles, Lightbulb, Moon, Heart, Activity, Utensils } from 'lucide-react';

const Chat = () => {
  const location = useLocation();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Parse query parameters to check if a topic was passed
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topic = params.get('topic');
    if (topic) {
      setSelectedTopic(topic);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  // Mock chat suggestions based on topics
  const topicSuggestions: Record<string, string[]> = {
    sleep: [
      "How can I improve my sleep quality?",
      "What's the optimal amount of sleep for someone my age?",
      "Why do I wake up feeling tired?",
      "What habits help with better sleep?"
    ],
    stress: [
      "What are effective stress management techniques?",
      "How does stress affect my health?",
      "Quick ways to reduce stress at work?",
      "Can meditation help with my stress levels?"
    ],
    activity: [
      "What's a good workout routine for beginners?",
      "How can I stay motivated to exercise?",
      "What's the best type of exercise for weight management?",
      "How many minutes of activity should I aim for daily?"
    ],
    diet: [
      "What foods help improve energy levels?",
      "How much water should I drink each day?",
      "What's a balanced meal plan look like?",
      "How can I reduce sugar cravings?"
    ],
    general: [
      "How can I improve my overall wellness?",
      "What lifestyle changes would have the biggest impact?",
      "How do sleep, diet, and exercise affect each other?",
      "Tips for building healthy habits"
    ]
  };

  // Mock chat response handler
  const handleSendMessage = async (message: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Basic keyword matching for demo purposes
    if (message.toLowerCase().includes('sleep')) {
      return "Good sleep is essential for overall health. For better sleep quality, try to maintain a consistent sleep schedule, keep your bedroom cool and dark, avoid screens 1 hour before bedtime, and limit caffeine in the afternoon. Most adults need 7-9 hours of quality sleep per night.";
    } else if (message.toLowerCase().includes('stress')) {
      return "Managing stress is key to both mental and physical health. Try incorporating deep breathing exercises, regular physical activity, and mindfulness meditation into your routine. Even just 5 minutes of focused breathing can help reduce acute stress. Remember that adequate sleep and proper nutrition also play important roles in stress management.";
    } else if (message.toLowerCase().includes('exercise') || message.toLowerCase().includes('activity')) {
      return "Regular physical activity has countless benefits for your health. Even moderate activity like a 30-minute daily walk can significantly improve your health outcomes. Try to include both cardiovascular exercise and strength training in your routine. Start slow and gradually build up intensity and duration.";
    } else if (message.toLowerCase().includes('diet') || message.toLowerCase().includes('food')) {
      return "A balanced diet is crucial for maintaining good health. Focus on whole foods, plenty of vegetables and fruits, lean proteins, and healthy fats. Stay hydrated by drinking water throughout the day. Consider eating smaller, more frequent meals to maintain steady energy levels.";
    }
    
    return "I'm here to help you achieve your health and wellness goals. Feel free to ask specific questions about sleep, stress, physical activity, diet, or any other health-related topics. I can provide personalized recommendations based on your needs and circumstances.";
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-sypher-blue animate-pulse-soft"></div>
            <p className="mt-4 text-sypher-gray-dark">Initializing AI assistant...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {/* Page Header */}
          <div className="mb-6 animate-fade-in-up">
            <div className="flex items-center">
              <Sparkles size={24} className="text-sypher-blue-accent mr-3" />
              <h1 className="text-3xl font-bold text-sypher-black">AI Health Assistant</h1>
            </div>
            <p className="text-sypher-gray-dark mt-1 ml-9">
              Ask me anything about your health and wellness journey
            </p>
          </div>

          {/* Topic Selection */}
          {!selectedTopic && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {[
                { id: 'general', label: 'General Wellness', icon: <Lightbulb /> },
                { id: 'sleep', label: 'Sleep', icon: <Moon /> },
                { id: 'stress', label: 'Stress', icon: <Heart /> },
                { id: 'activity', label: 'Physical Activity', icon: <Activity /> },
                { id: 'diet', label: 'Diet & Nutrition', icon: <Utensils /> },
              ].map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`flex items-center p-4 rounded-xl neo-button space-x-3 ${
                    selectedTopic === topic.id ? 'bg-sypher-blue text-sypher-blue-dark' : ''
                  }`}
                >
                  <span className="text-sypher-blue-accent">{topic.icon}</span>
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Chat Interface */}
          <div className="flex-1 animate-fade-in-up">
            <ChatInterface 
              onSendMessage={handleSendMessage}
              suggestions={selectedTopic ? topicSuggestions[selectedTopic] : topicSuggestions.general}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

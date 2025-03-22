
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatInterface from '../components/ChatInterface';
import { useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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
      "Can you help me generate a meal plan?",
      "What foods help improve energy levels?",
      "How much water should I drink each day?",
      "How can I reduce sugar cravings?"
    ],
    general: [
      "How can I improve my overall wellness?",
      "I am diabetic. I need advice on how to manage daily issues",
      "How do sleep, diet, and exercise affect each other?",
      "Tips for building healthy habits"
    ]
  };

  // Mock chat response handler
  const handleSendMessage = async (message: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Mock meal plan response
    if (message.toLowerCase().includes('meal plan') || message.toLowerCase().includes('generate a meal')) {
      return `
Breakfast
300 Calories
[Image of a breakfast with yogurt and berries]

Lunch
300 Calories
[Image of a salad with fresh vegetables]

Dinner
350 Calories
Chicken stir fry
[Image of a chicken stir fry with vegetables]

Total intake of calorie per day is 1050. Would you like me to adjust any meals or snacks?
      `;
    }
    
    // Mock diabetes response
    if (message.toLowerCase().includes('diabetic')) {
      return `
Managing diabetes requires a balanced approach to nutrition and exercise. Focus on eating whole, unprocessed foods with a good mix of fiber, healthy fats, and lean protein to help regulate blood sugar. Avoid refined carbs and sugary foods that can cause spikes.

For exercise, regular movement is key—aim for a mix of strength training and light cardio, like walking, to improve insulin sensitivity. Managing stress and getting enough sleep also play a big role in blood sugar control.

Would you like recommendations based on your lifestyle and daily routine?
      `;
    }
    
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
    
    return "Hi! I'm Sypher, your AI personal health assistant. I'm here to help you achieve your health and wellness goals. Feel free to ask specific questions about sleep, stress, physical activity, diet, or any other health-related topics. I can provide personalized recommendations based on your needs and circumstances.";
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
      <div className="p-4 max-w-md mx-auto h-[calc(100vh-4rem)]">
        <div className="flex flex-col h-full">
          {/* Chat Interface */}
          <div className="flex-1">
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

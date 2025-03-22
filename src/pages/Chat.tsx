
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatInterface from '../components/ChatInterface';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Chat = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Chat suggestions based on topics
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

  // Real LLM chat response handler
  const handleSendMessage = async (message: string): Promise<string> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log('Sending message to AI:', message);
      
      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { message },
      });

      if (error) {
        console.error('Error calling AI function:', error);
        setError('Failed to get a response. Please try again.');
        toast({
          title: "Error",
          description: "Failed to get a response from the AI assistant.",
          variant: "destructive"
        });
        return "I'm sorry, I encountered an error processing your request. Please try again later.";
      }

      console.log('Received AI response:', data);
      
      if (!data || !data.response) {
        setError('Received an invalid response format.');
        return "I apologize, but I received an unexpected response format. Please try again.";
      }

      return data.response;
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setError('An unexpected error occurred.');
      return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    } finally {
      setIsProcessing(false);
    }
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
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
              <button 
                className="ml-2 underline" 
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}
          
          {/* Chat Interface */}
          <div className="flex-1">
            <ChatInterface 
              onSendMessage={handleSendMessage}
              suggestions={selectedTopic ? topicSuggestions[selectedTopic] : topicSuggestions.general}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

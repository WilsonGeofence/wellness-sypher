
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatInterface from '../components/ChatInterface';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Chat = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [testingApiKey, setTestingApiKey] = useState(false);

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

  // Function to test if the OpenAI API key is working
  const testApiKey = async () => {
    setTestingApiKey(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { test: true },
      });

      if (error) {
        console.error('Error calling test function:', error);
        toast({
          title: "Test Error",
          description: "Failed to test the API key.",
          variant: "destructive"
        });
        setError('Failed to test the API key. Check the Supabase function logs for details.');
        return;
      }

      console.log('API key test result:', data);
      
      if (data.status === 'success') {
        toast({
          title: "Success",
          description: "OpenAI API key is valid and working!",
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "API key test failed",
          variant: "destructive"
        });
        setError(data.message || "API key test failed");
      }
    } catch (error) {
      console.error('Error in testApiKey:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while testing the API key.",
        variant: "destructive"
      });
      setError('An unexpected error occurred while testing the API key.');
    } finally {
      setTestingApiKey(false);
    }
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
      
      if (!data || (!data.response && !data.message)) {
        setError('Received an invalid response format.');
        return "I apologize, but I received an unexpected response format. Please try again.";
      }

      // Check if there was an error returned with a 200 status
      if (data.status === 'error') {
        setError(data.message || 'An error occurred with the AI service.');
        // Still return the response if provided
        if (data.response) {
          return data.response;
        }
        return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
      }

      // Reset retry count on successful response
      setRetryCount(0);
      return data.response;
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
      
      if (retryCount >= 2) {
        // After 2 retries, provide a more specific message
        setError('Service is currently unavailable. Please try again later.');
        toast({
          title: "Service Unavailable",
          description: "Our AI assistant is experiencing high demand. Please try again later.",
          variant: "destructive"
        });
      } else {
        setError('An unexpected error occurred.');
      }
      
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
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setError(null)}
                  className="ml-2 mt-2"
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {/* API Key Test Button */}
          <div className="mb-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={testApiKey}
              disabled={testingApiKey}
              className="text-xs"
            >
              {testingApiKey ? "Testing..." : "Test OpenAI API Key"}
            </Button>
          </div>
          
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

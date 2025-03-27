
import React from 'react';
import { Sparkles } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Powerful Features for Your Wellness Journey
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Everything you need to track, analyze, and improve your health metrics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI-Powered Insights',
              description: 'Get personalized recommendations based on your health data and patterns.'
            },
            {
              title: 'Comprehensive Tracking',
              description: 'Monitor sleep, activity, nutrition, and stress levels all in one place.'
            },
            {
              title: 'Goal Setting',
              description: 'Set achievable health goals and track your progress over time.'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-sypher-blue flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

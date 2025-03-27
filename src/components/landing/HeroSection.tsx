
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
  goToAISupport: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures, goToAISupport }) => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div 
            className="inline-flex items-center justify-center rounded-full bg-sypher-blue px-3 py-1 text-sm leading-6 text-sypher-blue-dark mb-6 cursor-pointer hover:bg-sypher-blue/80 transition-colors"
            onClick={goToAISupport}
          >
            <span className="flex items-center">
              <Sparkles className="mr-1 h-3 w-3" /> 
              Introducing AI Support
              <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Deciphering Wellness Tracking
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 mb-12">
            We've reimagined how you track your health, bringing AI-powered insights to help you understand your wellness journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-sypher-blue-dark hover:bg-sypher-blue-accent text-white text-lg px-8 py-6 h-auto"
              onClick={() => navigate('/auth')}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-6 h-auto"
              onClick={scrollToFeatures}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-xl font-semibold text-sypher-blue-dark">Sypher</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#solution" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Solution</a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-gray-900"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
          <Button 
            className="bg-sypher-blue-dark hover:bg-sypher-blue-accent text-white transition-colors"
            onClick={() => navigate('/auth')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;

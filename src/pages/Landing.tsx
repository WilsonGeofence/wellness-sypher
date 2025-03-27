
import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import UIPreviewSection from '@/components/landing/UIPreviewSection';
import TrustedBySection from '@/components/landing/TrustedBySection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import LandingFooter from '@/components/landing/LandingFooter';

const Landing = () => {
  // Function to scroll to the features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to open AI Support section
  const goToAISupport = () => {
    scrollToFeatures();
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection scrollToFeatures={scrollToFeatures} goToAISupport={goToAISupport} />
      <UIPreviewSection />
      <TrustedBySection />
      <FeaturesSection />
      <LandingFooter />
    </div>
  );
};

export default Landing;

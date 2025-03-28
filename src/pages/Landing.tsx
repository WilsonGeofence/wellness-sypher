
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2,
  ChevronRight,
  Quote
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-semibold text-sypher-blue-dark">Sypher</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About Us</a>
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#benefits" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Benefits</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
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

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Revolutionizing <span className="text-sypher-blue-accent">Health Management</span> with AI Powered Innovation
              </h1>
              <p className="text-gray-600 mb-8">
                From daily activity monitoring to personalized insights, our AI platform helps you make informed decisions about your health journey with precision and ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white"
                  onClick={() => navigate('/auth')}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={() => navigate('#how-it-works')}
                >
                  How It Works
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Join 10,000+ users</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="rounded-full overflow-hidden w-[450px] h-[450px]">
                  <img 
                    src="/lovable-uploads/b1da3956-17c8-4667-bc2b-2ce18f3a629f.png" 
                    alt="Person exercising" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-700">The world's best companies trust Sypher</h2>
          </div>
          
          <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Microsoft', 'Google', 'Fitbit & Wearables', 'SmartHealth'].map((logo, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="text-gray-400 font-semibold text-lg opacity-70 flex items-center">
                  {i === 0 && <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>}
                  {i === 1 && <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>}
                  {i === 2 && <div className="w-6 h-6 bg-gray-300 rounded-md mr-2"></div>}
                  {i === 3 && <div className="w-6 h-6 bg-gray-300 rounded-md mr-2"></div>}
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Health Companion Section */}
      <section className="py-16 md:py-24" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <p className="text-sypher-blue-accent font-medium">ABOUT US</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:w-1/2">
              Your <span className="text-sypher-blue-accent">AI-Powered Health</span> Companion
            </h2>
            <div className="md:w-1/3">
              <Button 
                className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white"
                onClick={() => navigate('/auth')}
              >
                Start Your Free Trial
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db" 
                alt="AI Health Dashboard" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-sypher-blue-accent text-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Our Vision</h3>
              <p className="mb-8">
                We're revolutionizing health tracking by making AI-powered insights accessible to everyone. Our platform analyzes your data to provide personalized recommendations that help you achieve your wellness goals with greater efficiency.
              </p>
              <p className="mb-8">
                With Sypher, you're not just tracking numbers—you're gaining a deeper understanding of your health patterns and receiving actionable insights designed specifically for your unique needs.
              </p>
              <p>
                Join thousands of users who have transformed their wellness journey with our innovative AI health companion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <p className="text-sypher-blue-accent font-medium">FEATURES</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Revolutionizing <span className="text-sypher-blue-accent">Health with AI</span>: Discover Sypher's Key Features & Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">AI-Driven Health Recommendations & Insights</h3>
                    <ChevronRight />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Comprehensive Health Tracking</h3>
                    <ChevronRight />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Personalized Goal Setting</h3>
                    <ChevronRight />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Advanced Analytics</h3>
                    <ChevronRight />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061" 
                alt="Health Analytics" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-24" id="benefits">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <p className="text-sypher-blue-accent font-medium">BENEFITS</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:w-1/2">
              Why Choose Sypher for Your <span className="text-sypher-blue-accent">Health Journey</span>?
            </h2>
            <p className="text-gray-600 md:w-1/3">
              Our platform combines cutting-edge AI technology with user-friendly design to deliver a health tracking experience unlike any other.
            </p>
          </div>
          
          <div className="mb-8">
            <Button 
              className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
          </div>
          
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352" 
              alt="Healthy lifestyle" 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">
              Success Stories from Our App Users
            </h2>
            <Button 
              variant="outline" 
              className="border-sypher-blue-accent text-sypher-blue-accent"
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500">Health Enthusiast</p>
                  </div>
                </div>
                <Quote className="text-sypher-blue-accent mb-2" />
                <p className="text-gray-600">
                  The AI-powered insights have transformed my approach to fitness. I've lost 15 pounds and my energy levels have never been higher. Sypher made the difference when other apps couldn't.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 md:py-24 bg-sypher-blue-accent text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Available to Download</h2>
              <div className="flex space-x-4">
                <div className="bg-black rounded-lg px-4 py-2 flex items-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="white">
                    <path d="M17.5 12.5c0-0.76 0.43-1.42 1.06-1.76-0.38-0.58-0.93-1.06-1.57-1.38-0.61-0.32-1.24-0.36-1.76-0.36-0.76 0-1.5 0.17-1.98 0.49-0.49 0.32-0.91 0.91-1.25 1.76-0.34-0.85-0.76-1.44-1.25-1.76-0.48-0.32-1.22-0.49-1.98-0.49-0.52 0-1.15 0.04-1.76 0.36-0.64 0.32-1.19 0.8-1.57 1.38 0.63 0.34 1.06 1 1.06 1.76s-0.43 1.42-1.06 1.76c0.38 0.58 0.93 1.06 1.57 1.38 0.61 0.32 1.24 0.36 1.76 0.36 0.76 0 1.5-0.17 1.98-0.49 0.49-0.32 0.91-0.91 1.25-1.76 0.34 0.85 0.76 1.44 1.25 1.76 0.48 0.32 1.22 0.49 1.98 0.49 0.52 0 1.15-0.04 1.76-0.36 0.64-0.32 1.19-0.8 1.57-1.38-0.63-0.34-1.06-1-1.06-1.76z"></path>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </div>
                <div className="bg-black rounded-lg px-4 py-2 flex items-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53-1.71-2.52-3.03-7.02-1.27-10.08.88-1.52 2.45-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83"></path>
                    <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"></path>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="relative -right-5 top-10 transform -rotate-6">
                  <div className="w-48 h-96 bg-black rounded-3xl shadow-lg"></div>
                </div>
                <div className="absolute top-0 w-48 h-96 bg-black rounded-3xl shadow-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-sypher-blue-accent">Sypher</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Our Story</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Team</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">AI Insights</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Health Tracking</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Goal Setting</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2024 Sypher Health. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

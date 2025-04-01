
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  ArrowRightCircle,
  Play,
  Heart,
  Activity,
  Brain,
  Apple,
  ChevronDown,
  Fingerprint,
  ShieldCheck,
  LineChart 
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-semibold text-sypher-blue">Sypher</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About Us</a>
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Revolutionizing <span className="text-sypher-blue-accent">Health Management</span> with AI Powered Innovation
              </h1>
              
              <p className="text-gray-600 text-lg">
                From the ground up, we've built the future of health management. Using advanced AI to deliver personalized insights and actionable advice for better living.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white px-6 py-5 h-auto"
                  onClick={() => navigate('/auth')}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 px-6 py-5 h-auto"
                  onClick={() => navigate('/auth')}
                >
                  Book a Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-2 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Join thousands of satisfied users</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/lovable-uploads/864b36b0-de43-488e-83e6-feb1ca694e8b.png" 
                  alt="Person working out with Sypher" 
                  className="w-full object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-600">The world's best companies trust Sypher</h2>
          </div>
          
          <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Active Life', 'Health Hub', 'FitnessCo', 'VitalCare'].map((logo, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="h-8 text-gray-400 font-semibold text-lg opacity-80">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Health Companion Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sypher-blue-accent font-medium text-sm uppercase tracking-wide">What We Do</span>
            <h2 className="text-3xl font-bold mt-2">
              Your <span className="text-sypher-blue-accent">AI-Powered Health</span> Companion
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="AI Health Dashboard" 
                className="w-full object-cover"
              />
            </div>
            
            <div className="bg-sypher-blue rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="mb-6">
                Sypher uses advanced algorithms to analyze your health data and provide personalized recommendations. Our AI learns your patterns, preferences, and goals to deliver insights that matter to you.
              </p>
              <p className="mb-8">
                We're committed to making health tracking simple, intuitive, and actionable. No more guesswork - just clear guidance for your wellness journey.
              </p>
              <Button 
                className="bg-white text-sypher-blue hover:bg-gray-100"
                onClick={() => navigate('/auth')}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:text-left">
            <span className="text-sypher-blue-accent font-medium text-sm uppercase tracking-wide">Features</span>
            <h2 className="text-3xl font-bold mt-2">
              Revolutionizing <span className="text-sypher-blue-accent">Health with AI</span>: Discover Sypher's Key Features & Benefits
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold flex items-center">
                  <Heart className="mr-2 text-sypher-blue-accent" size={20} />
                  Smart Health Monitoring & Analytics
                </h3>
                <p className="mt-2 text-gray-600">
                  Comprehensive tracking of vitals and health metrics with AI-powered trend analysis and predictions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold flex items-center">
                  <Activity className="mr-2 text-sypher-blue-accent" size={20} />
                  Personalized Health Recommendations
                </h3>
                <p className="mt-2 text-gray-600">
                  Get custom advice based on your data, goals, and progress patterns for optimal results.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold flex items-center">
                  <Brain className="mr-2 text-sypher-blue-accent" size={20} />
                  AI-Powered Insights
                </h3>
                <p className="mt-2 text-gray-600">
                  Advanced algorithms analyze your data to identify patterns and provide actionable insights.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold flex items-center">
                  <Apple className="mr-2 text-sypher-blue-accent" size={20} />
                  Nutritional Analysis
                </h3>
                <p className="mt-2 text-gray-600">
                  Track meals and get personalized nutritional guidance based on your health goals.
                </p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                alt="Health dashboard analytics" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-sypher-blue-accent font-medium text-sm uppercase tracking-wide">Why Sypher</span>
              <h2 className="text-3xl font-bold mt-2">
                Why Choose Sypher for Your <span className="text-sypher-blue-accent">Health Journey</span>?
              </h2>
              <p className="mt-4 text-gray-600 mb-6">
                We combine cutting-edge AI technology with intuitive design to create a health management experience that's both powerful and easy to use.
              </p>
              <Button 
                className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061" 
                alt="Healthy lifestyle with Sypher" 
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold">
                Success Stories from Our App Users
              </h2>
            </div>
            <Button variant="outline" className="hidden md:flex">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Fitness Enthusiast",
                quote: "The personalized insights have completely transformed my workout routine. I've seen more progress in 3 months than I did in the past year."
              },
              {
                name: "Michael Chen",
                role: "Busy Professional",
                quote: "As someone with a hectic schedule, Sypher makes it easy to stay on top of my health goals without feeling overwhelmed."
              },
              {
                name: "Emma Rodriguez",
                role: "Health Coach",
                quote: "I recommend Sypher to all my clients. The AI recommendations are spot-on and the interface is intuitive even for beginners."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-gray-600">
                  <span className="text-4xl text-sypher-blue-accent">"</span>
                  <p className="mt-2">{testimonial.quote}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline">
              View All
            </Button>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-sypher-blue">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">
                Available to Download
              </h2>
              <p className="mb-8">
                Get Sypher on your mobile device for health tracking on the go. Available on iOS and Android.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="bg-black text-white border-black hover:bg-black/80">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 384 512">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                  </svg>
                  App Store
                </Button>
                <Button variant="outline" className="bg-black text-white border-black hover:bg-black/80">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
            
            <div className="relative text-center">
              <div className="w-3/4 mx-auto relative" style={{ transform: "rotate(-5deg)" }}>
                <img 
                  src="https://cdn.pixabay.com/photo/2017/01/13/11/44/mockup-1977040_1280.png" 
                  alt="Sypher mobile app" 
                  className="w-full"
                />
              </div>
              <div className="w-3/4 mx-auto absolute top-0 right-0" style={{ transform: "rotate(5deg)" }}>
                <img 
                  src="https://cdn.pixabay.com/photo/2017/01/13/11/44/mockup-1977041_1280.png" 
                  alt="Sypher mobile app" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-sypher-blue mb-4">Sypher</h2>
              <p className="text-gray-500 max-w-xs">
                Revolutionizing health management with AI-powered insights and tracking.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">About Us</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Mission</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Team</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Health Tracking</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">AI Insights</a></li>
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
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2023 Sypher Health. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
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


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  MessageCircle, 
  Target, 
  User,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/insights', label: 'Insights', icon: <BarChart2 className="h-5 w-5" /> },
    { path: '/chat', label: 'Chat', icon: <MessageCircle className="h-5 w-5" /> },
    { path: '/goals', label: 'Goals', icon: <Target className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-background ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full z-30 glass-backdrop border-b border-border/50 h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-sypher-blue-accent rounded-full h-8 w-8 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-xl text-sypher-black">Sypher</span>
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="neo-button h-10 w-10 flex items-center justify-center"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-64 bg-sypher-white shadow-xl transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-20 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-sypher-blue text-sypher-blue-dark font-medium shadow-neo' 
                    : 'hover:bg-sypher-gray-light'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed w-64 h-full border-r border-border/50 bg-sypher-white z-10">
        <div className="w-full flex flex-col p-6">
          <Link to="/" className="flex items-center space-x-3 mb-8">
            <div className="bg-sypher-blue-accent rounded-full h-10 w-10 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-2xl text-sypher-black">Sypher</span>
          </Link>

          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-sypher-blue text-sypher-blue-dark font-medium shadow-neo' 
                    : 'hover:bg-sypher-gray-light'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`flex-1 lg:ml-64 pt-16 lg:pt-0 transition-all duration-200 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

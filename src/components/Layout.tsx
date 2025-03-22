import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlignRight, X, Home, MessageSquare, PieChart, Target, LogIn, LogOut } from 'lucide-react';
import { useMobile } from '../hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
      active
        ? 'bg-sypher-blue-light text-sypher-blue-accent'
        : 'hover:bg-sypher-gray-light text-sypher-gray-dark'
    }`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  setIsOpen: (open: boolean) => void;
  active: boolean;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, setIsOpen, active, children }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors w-full ${
      active
        ? 'bg-sypher-blue-light text-sypher-blue-accent'
        : 'hover:bg-sypher-gray-light text-sypher-gray-dark'
    }`}
    onClick={() => setIsOpen(false)}
  >
    {children}
  </Link>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = window.location.pathname;
  const isMobile = useMobile();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current auth status
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-sypher-light">
      <header className="relative z-10 backdrop-blur-md sticky top-0 w-full bg-white/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div 
              className="w-9 h-9 bg-sypher-blue rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-5 h-5 bg-white rounded-full"></div>
            </div>
            <h1 
              className="text-xl font-bold text-sypher-blue cursor-pointer"
              onClick={() => navigate('/')}
            >
              Sypher
            </h1>
          </div>
          
          <div className="md:hidden flex items-center z-20">
            <button
              className="p-2 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-sypher-blue" />
              ) : (
                <AlignRight className="h-6 w-6 text-sypher-blue" />
              )}
            </button>
          </div>
          
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink to="/" active={pathname === '/'}>
                <Home size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink to="/chat" active={pathname === '/chat'}>
                <MessageSquare size={20} />
                <span>Chat</span>
              </NavLink>
              <NavLink to="/insights" active={pathname === '/insights'}>
                <PieChart size={20} />
                <span>Insights</span>
              </NavLink>
              <NavLink to="/goals" active={pathname === '/goals'}>
                <Target size={20} />
                <span>Goals</span>
              </NavLink>
              
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className="ml-4 px-4 py-2 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </button>
              ) : (
                <NavLink to="/auth" active={pathname === '/auth'}>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </NavLink>
              )}
            </nav>
          )}
          
          {/* Mobile Menu */}
          <div className={`fixed inset-0 bg-white z-10 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex flex-col h-full pt-16 px-4">
              <MobileNavLink to="/" setIsOpen={setIsOpen} active={pathname === '/'}>
                <Home size={20} />
                <span>Home</span>
              </MobileNavLink>
              <MobileNavLink to="/chat" setIsOpen={setIsOpen} active={pathname === '/chat'}>
                <MessageSquare size={20} />
                <span>Chat</span>
              </MobileNavLink>
              <MobileNavLink to="/insights" setIsOpen={setIsOpen} active={pathname === '/insights'}>
                <PieChart size={20} />
                <span>Insights</span>
              </MobileNavLink>
              <MobileNavLink to="/goals" setIsOpen={setIsOpen} active={pathname === '/goals'}>
                <Target size={20} />
                <span>Goals</span>
              </MobileNavLink>
              
              {user ? (
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="mt-4 px-4 py-3 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </button>
              ) : (
                <MobileNavLink to="/auth" setIsOpen={setIsOpen} active={pathname === '/auth'}>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </MobileNavLink>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 relative z-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;


import React from 'react';
import MobileNavLink from './MobileNavLink';
import { Home, MessageSquare, PieChart, Target, LogIn, LogOut, UserCircle } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen, pathname, user, handleSignOut }) => {
  return (
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
          <>
            <MobileNavLink to="/profile" setIsOpen={setIsOpen} active={pathname === '/profile'}>
              <UserCircle size={20} />
              <span>Profile</span>
            </MobileNavLink>
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
          </>
        ) : (
          <MobileNavLink to="/auth" setIsOpen={setIsOpen} active={pathname === '/auth'}>
            <LogIn size={20} />
            <span>Sign In</span>
          </MobileNavLink>
        )}
      </div>
    </div>
  );
};

export default MobileNav;

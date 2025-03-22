
import React from 'react';
import NavLink from './NavLink';
import { Home, MessageSquare, PieChart, Target, LogIn, LogOut, UserCircle } from 'lucide-react';

interface DesktopNavProps {
  pathname: string;
  user: any;
  handleSignOut: () => Promise<void>;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ pathname, user, handleSignOut }) => {
  return (
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
        <>
          <NavLink to="/profile" active={pathname === '/profile'}>
            <UserCircle size={20} />
            <span>Profile</span>
          </NavLink>
          <button 
            onClick={handleSignOut}
            className="ml-4 px-4 py-2 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
          >
            <LogOut size={16} className="mr-1" />
            Sign Out
          </button>
        </>
      ) : (
        <NavLink to="/auth" active={pathname === '/auth'}>
          <LogIn size={20} />
          <span>Sign In</span>
        </NavLink>
      )}
    </nav>
  );
};

export default DesktopNav;

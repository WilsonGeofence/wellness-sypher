
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './navigation/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-sypher-light">
      <Header pathname={location.pathname} user={user} handleSignOut={handleSignOut} />
      <main className="flex-1 relative z-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;

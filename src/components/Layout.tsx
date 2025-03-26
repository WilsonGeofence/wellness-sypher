
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './navigation/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useIsMobile();
  const { user, signOut, loading } = useAuth();
  
  // Use auth redirect hook to handle token in URL hash
  useAuthRedirect();

  return (
    <div className="min-h-screen bg-sypher-light">
      <Header pathname={pathname} user={user} handleSignOut={signOut} />
      <main className="flex-1 relative z-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;

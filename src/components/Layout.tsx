
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from './navigation/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { user, loading, session } = useAuth();
  
  useEffect(() => {
    // Handle hash fragment with access_token (common with OAuth redirects)
    if (location.hash && location.hash.includes('access_token')) {
      console.log("Detected access_token in URL hash, processing authentication...");
      
      // The session will be automatically set by Supabase's internal handlers
      // We just need to clean up the URL to remove the hash fragment
      const cleanUrl = window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
      
      // Set a flag in session storage to indicate we're processing an OAuth flow
      sessionStorage.setItem('processingOAuth', 'true');
      
      // Clear the flag after 3 seconds
      setTimeout(() => {
        sessionStorage.removeItem('processingOAuth');
      }, 3000);
    }
  }, [location]);
  
  // Debug auth state in Layout
  useEffect(() => {
    console.log("Layout auth state:", { 
      user: user?.email, 
      sessionExists: !!session, 
      loading,
      pathname
    });
  }, [user, session, loading, pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  // Don't show the header on the landing page
  if (pathname === '/') {
    return (
      <div className="min-h-screen bg-white">
        <main className="flex-1 relative z-0">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sypher-light">
      <Header pathname={pathname} user={user} handleSignOut={handleSignOut} />
      <main className="flex-1 relative z-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;

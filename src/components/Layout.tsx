
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from './navigation/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Handle hash fragment with access_token (common with OAuth redirects)
    if (location.hash && location.hash.includes('access_token')) {
      console.log("Detected access_token in URL hash, processing authentication...");
      
      // The session will be automatically set by Supabase's internal handlers
      // We just need to clean up the URL to remove the hash fragment
      const cleanUrl = window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    }

    // Check current auth status
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to Sypher!"
          });
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [location, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

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


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from './navigation/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Process access token in URL hash if present
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      console.log("Detected access token in URL hash, processing authentication");
      // Clear the URL hash without refreshing the page
      window.history.replaceState(null, document.title, window.location.pathname);
    }

    // Check current auth status
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: `Welcome${session?.user?.user_metadata?.full_name ? ' ' + session.user.user_metadata.full_name : ''}!`
          });
          
          // If on the auth page when signing in, redirect to dashboard
          if (pathname === '/auth') {
            navigate('/dashboard', { replace: true });
          }
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully"
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
  }, [pathname, navigate, toast]);

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

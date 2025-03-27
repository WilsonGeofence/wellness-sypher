
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthRedirect = (loading: boolean) => {
  const { toast } = useToast();
  const location = useLocation();

  // Handle redirect with hash parameters after OAuth sign in
  useEffect(() => {
    const handleHashParams = async () => {
      // Check if we have a hash in the URL (from OAuth)
      if (location.hash && location.hash.includes('access_token')) {
        try {
          // Let Supabase handle the hash params to set the session
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error processing auth redirect:", error);
            toast({
              title: "Authentication error",
              description: error.message || "There was a problem with authentication",
              variant: "destructive"
            });
          } else if (data?.session) {
            // Clean up the URL by removing the hash fragment
            window.history.replaceState({}, document.title, location.pathname);
            
            // User is signed in, show toast notification
            toast({
              title: "Signed in successfully",
              description: `Welcome${data.session?.user?.email ? ' ' + data.session.user.email : ''}!`
            });

            // We don't navigate here since we're already on the dashboard page
          }
        } catch (error: any) {
          console.error("Failed to process authentication redirect:", error);
        }
      }
    };

    if (!loading) {
      handleHashParams();
    }
  }, [location.hash, loading, toast]);
};

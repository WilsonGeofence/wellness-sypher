
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook to handle authentication redirects with URL hash fragments
 * Detects access_token in URL hash and processes authentication
 */
export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      // Check if URL contains access token in hash
      if (window.location.hash && window.location.hash.includes('access_token')) {
        console.log('Detected access token in URL hash, processing authentication');
        
        try {
          // Clean up URL immediately to prevent issues with refreshes
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
          
          // Using the session directly from the hash without additional call
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            console.log('User authenticated successfully:', session.user.email);
            
            // Redirect to dashboard directly without showing toast
            // This speeds up the process by eliminating an extra render cycle
            navigate('/dashboard', { replace: true });
          }
        } catch (error) {
          console.error('Error processing auth redirect:', error);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your sign in",
            variant: "destructive"
          });
        }
      }
    };

    // Execute the auth handling immediately
    handleAuthRedirect();
  }, [navigate, toast]);
};

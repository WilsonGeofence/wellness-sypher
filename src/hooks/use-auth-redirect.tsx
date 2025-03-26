
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook to handle authentication redirects
 * Redirects users based on authentication state and current location
 */
export const useAuthRedirect = (
  user: any, 
  loading: boolean, 
  pathname: string = window.location.pathname
) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Skip redirects when still loading
    if (loading) return;

    // If we have a session/user and we're on the auth page, redirect to dashboard
    if (user && pathname === '/auth') {
      console.log("User is authenticated and on auth page, redirecting to dashboard");
      navigate('/dashboard');
      return;
    }
    
    // Check for hash fragment indicating auth redirect with access token
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      console.log("Detected auth redirect with access token");
      
      // The hash fragment needs to be processed by Supabase
      // which will update the auth state automatically
      // We need to redirect to dashboard to clean up the URL
      if (user) {
        console.log("User authenticated, redirecting to clean dashboard URL");
        
        // Use replace to avoid adding a history entry
        navigate('/dashboard', { replace: true });
        
        // Show welcome toast
        toast({
          title: "Authentication successful!",
          description: `Welcome${user.user_metadata?.full_name ? ' ' + user.user_metadata.full_name : ''}!`
        });
      } else {
        console.log("Access token in URL but user not yet available, waiting for auth state to update");
      }
    }
  }, [user, loading, pathname, navigate, toast]);
};

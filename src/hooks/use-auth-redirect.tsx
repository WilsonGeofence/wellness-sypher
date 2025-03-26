
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    // Skip redirects when still loading
    if (loading) return;

    // If we have a session/user and we're on the auth page, redirect to dashboard
    if (user && pathname === '/auth') {
      console.log("User is authenticated and on auth page, redirecting to dashboard");
      navigate('/dashboard');
    }
    
    // Check for hash fragment indicating auth redirect with access token
    const hash = window.location.hash;
    if (hash && hash.includes('access_token') && user) {
      // If we have a hash with access_token and we're authenticated, redirect to dashboard
      console.log("Detected auth redirect with access token, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [user, loading, pathname, navigate]);
};

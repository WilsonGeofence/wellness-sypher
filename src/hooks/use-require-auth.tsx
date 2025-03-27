
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useRequireAuth = (redirectTo = '/auth') => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isCheckingToken, setIsCheckingToken] = useState(false);
  
  useEffect(() => {
    // Check if URL contains access_token (from OAuth redirects)
    const hasAccessToken = location.hash && location.hash.includes('access_token');
    
    if (hasAccessToken) {
      console.log("Access token detected in URL, waiting for auth system to process");
      setIsCheckingToken(true);
      // Give sufficient time for Supabase auth to process the token (increased from 2s to 3s)
      const tokenTimer = setTimeout(() => {
        setIsCheckingToken(false);
      }, 3000);
      return () => clearTimeout(tokenTimer);
    }
    
    // Important: Don't redirect during loading or if checking token
    if (loading || isCheckingToken) {
      console.log("Auth state is loading or processing token, waiting...");
      return;
    }
    
    console.log("Auth check - User:", user?.email, "Session:", !!session);
    
    // Only redirect if not authenticated and not in the process of authenticating
    if (!user && !session) {
      // Don't redirect if already on the auth page
      if (location.pathname === redirectTo) {
        return;
      }
      
      console.log("User not authenticated, redirecting to auth page");
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page.",
        variant: "destructive"
      });
      
      const currentPath = location.pathname;
      if (currentPath !== '/' && currentPath !== '/auth') {
        sessionStorage.setItem('authRedirectPath', currentPath);
      }
      
      navigate(redirectTo);
    } else if (user && session) {
      console.log("User authenticated:", user.email);
      const savedPath = sessionStorage.getItem('authRedirectPath');
      if (savedPath && location.pathname === '/auth') {
        sessionStorage.removeItem('authRedirectPath');
        navigate(savedPath);
      }
    }
  }, [user, session, loading, navigate, redirectTo, toast, location, isCheckingToken]);
  
  return { user, loading: loading || isCheckingToken, session };
};

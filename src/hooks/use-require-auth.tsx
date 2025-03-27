
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useRequireAuth = (redirectTo = '/auth') => {
  const { user, loading } = useAuth();
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
      // Give time for Supabase auth to process the token
      const tokenTimer = setTimeout(() => {
        setIsCheckingToken(false);
      }, 2000);
      return () => clearTimeout(tokenTimer);
    }
    
    // Don't redirect during loading or if checking token
    if (loading || isCheckingToken) {
      console.log("Auth state is loading or processing token, waiting...");
      return;
    }
    
    // Only redirect if not authenticated and not in the process of authenticating
    if (!user) {
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
    } else if (user) {
      console.log("User authenticated:", user.email);
      const savedPath = sessionStorage.getItem('authRedirectPath');
      if (savedPath && location.pathname === '/auth') {
        sessionStorage.removeItem('authRedirectPath');
        navigate(savedPath);
      }
    }
  }, [user, loading, navigate, redirectTo, toast, location, isCheckingToken]);
  
  return { user, loading: loading || isCheckingToken };
};

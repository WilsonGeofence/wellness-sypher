
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useRequireAuth = (redirectTo = '/auth') => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  
  useEffect(() => {
    // Check if we're on an OAuth callback route
    const isOAuthCallback = location.pathname === '/dashboard' && 
                            (location.hash.includes('access_token') || 
                             sessionStorage.getItem('processingOAuth') === 'true');
    
    if (isOAuthCallback) {
      console.log("OAuth callback detected, setting processing state");
      sessionStorage.setItem('processingOAuth', 'true');
      setIsProcessingAuth(true);
      
      // Give auth system time to process the token
      const tokenTimer = setTimeout(() => {
        console.log("OAuth processing complete");
        sessionStorage.removeItem('processingOAuth');
        setIsProcessingAuth(false);
      }, 3000);
      
      return () => clearTimeout(tokenTimer);
    }
    
    console.log("Auth check - Loading:", loading, "Processing:", isProcessingAuth, "User:", user?.email, "Session:", !!session);
    
    // Don't redirect if we're still loading or processing OAuth
    if (loading || isProcessingAuth) {
      console.log("Still loading or processing auth, waiting...");
      return;
    }
    
    // Only check auth after loading is complete
    if (!user && !session) {
      // Don't redirect if already on the auth page
      if (location.pathname === redirectTo) {
        console.log("Already on auth page, not redirecting");
        return;
      }
      
      console.log("User not authenticated, redirecting to auth page");
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive"
      });
      
      // Save current path for redirect after login
      const currentPath = location.pathname;
      if (currentPath !== '/' && currentPath !== '/auth') {
        sessionStorage.setItem('authRedirectPath', currentPath);
        console.log("Saved redirect path:", currentPath);
      }
      
      navigate(redirectTo);
    } else if (user && session) {
      console.log("User authenticated:", user.email);
      
      // Check if we need to redirect to a saved path
      const savedPath = sessionStorage.getItem('authRedirectPath');
      if (savedPath && location.pathname === '/auth') {
        console.log("Redirecting to saved path:", savedPath);
        sessionStorage.removeItem('authRedirectPath');
        navigate(savedPath);
      }
    }
  }, [user, session, loading, isProcessingAuth, navigate, redirectTo, toast, location]);
  
  return { user, loading: loading || isProcessingAuth, session };
};

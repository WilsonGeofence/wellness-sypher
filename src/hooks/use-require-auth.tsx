import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useRequireAuth = (redirectTo = '/auth') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    if (location.hash && location.hash.includes('access_token')) {
      console.log("Access token detected in URL, waiting for auth system to process");
      return;
    }
    
    if (!loading && !user) {
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
    } else if (!loading && user) {
      const savedPath = sessionStorage.getItem('authRedirectPath');
      if (savedPath && location.pathname === '/auth') {
        sessionStorage.removeItem('authRedirectPath');
        navigate(savedPath);
      }
    }
  }, [user, loading, navigate, redirectTo, toast, location]);
  
  return { user, loading };
};

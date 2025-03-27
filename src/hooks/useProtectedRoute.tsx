
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type ProtectedRouteOptions = {
  redirectTo?: string;
  requireAuth?: boolean;
  onlyPublic?: boolean;
};

/**
 * Hook that combines authentication state with route protection
 * 
 * @param options Configuration options
 * @param options.redirectTo - Where to redirect if auth conditions aren't met (default: '/auth')
 * @param options.requireAuth - Whether the route requires authentication (default: true)
 * @param options.onlyPublic - Whether the route is only for non-authenticated users (default: false)
 * 
 * @returns Auth state (user, session, loading) and a pathIsRestricted flag
 */
export const useProtectedRoute = ({
  redirectTo = '/auth',
  requireAuth = true,
  onlyPublic = false
}: ProtectedRouteOptions = {}) => {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const pathIsRestricted = Boolean(
    (requireAuth && !user) || 
    (onlyPublic && user)
  );

  useEffect(() => {
    // Don't redirect while auth state is still loading
    if (loading) return;

    // Handle protected routes (require authentication)
    if (requireAuth && !user) {
      console.log("Auth required, redirecting to:", redirectTo);
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page.",
        variant: "destructive"
      });
      
      // Store the attempted location for redirecting back after login
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // Handle public-only routes (like auth pages)
    if (onlyPublic && user) {
      console.log("Already authenticated, redirecting to dashboard");
      navigate('/dashboard');
      return;
    }
  }, [user, loading, requireAuth, onlyPublic, navigate, redirectTo, location, toast]);

  return { 
    user, 
    session,
    loading,
    pathIsRestricted
  };
};

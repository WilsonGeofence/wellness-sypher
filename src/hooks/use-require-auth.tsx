
import { useProtectedRoute } from './useProtectedRoute';

export const useRequireAuth = (redirectTo = '/auth') => {
  // Use our new combined hook but with default settings (requireAuth = true)
  const { user, loading } = useProtectedRoute({ redirectTo });
  
  return { user, loading };
};

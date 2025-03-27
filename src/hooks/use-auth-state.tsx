
import { useSessionState } from './useSessionState';
import { useAuthMethods } from './useAuthMethods';
import { useAuthRedirect } from './useAuthRedirect';

export const useAuthState = () => {
  const { session, user, loading } = useSessionState();
  const { signOut, signUpWithEmail, signInWithEmail } = useAuthMethods();
  
  // Handle OAuth redirects
  useAuthRedirect(loading);

  return {
    session,
    user,
    loading,
    signOut,
    signUpWithEmail,
    signInWithEmail
  };
};

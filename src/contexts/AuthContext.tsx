
import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthState } from '@/hooks/use-auth-state';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: any | null; data: any | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any | null; data: any | null }>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  signUpWithEmail: async () => ({ error: null, data: null }),
  signInWithEmail: async () => ({ error: null, data: null }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hooks for auth state and operations
  const { session, user, loading } = useAuthState();
  const { signOut, signUpWithEmail, signInWithEmail } = useAuthOperations();
  
  // Handle redirects based on auth state
  useAuthRedirect(user, loading);

  // Combine values from hooks to provide through context
  const value = {
    session,
    user,
    loading,
    signOut,
    signUpWithEmail,
    signInWithEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

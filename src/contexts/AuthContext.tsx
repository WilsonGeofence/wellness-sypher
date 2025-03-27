
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    let mounted = true;
    
    // Set up auth state listener FIRST - this is critical for proper auth handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        if (mounted) {
          // Update state based on auth events
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Only show toasts after initial loading is complete
          if (!loading) {
            if (event === 'SIGNED_IN') {
              toast({
                title: "Signed in successfully",
                description: `Welcome${currentSession?.user?.email ? ' ' + currentSession.user.email : ''}!`
              });
            } else if (event === 'SIGNED_OUT') {
              toast({
                title: "Signed out",
                description: "You have been signed out successfully"
              });
            }
          }
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Initial session check:", data.session?.user?.email);
        
        if (mounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting session:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      console.log("Cleaning up auth subscription");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast, loading]);

  const signOut = async () => {
    console.log("Signing out");
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: error.message || "There was a problem signing out",
        variant: "destructive"
      });
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign up with email:", email);
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      
      console.log("Sign up result:", result);
      
      if (result.error) {
        console.error("Sign up error:", result.error);
        toast({
          title: "Sign up failed",
          description: result.error.message || "There was a problem creating your account",
          variant: "destructive"
        });
      } else if (result.data?.user) {
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account."
        });
      }
      
      return result;
    } catch (error: any) {
      console.error("Exception during sign up:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "There was a problem creating your account",
        variant: "destructive"
      });
      return { error, data: null };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      const result = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log("Sign in result:", result);
      
      if (result.error) {
        console.error("Sign in error:", result.error);
        toast({
          title: "Sign in failed",
          description: result.error.message || "Invalid email or password",
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error: any) {
      console.error("Exception during sign in:", error);
      toast({
        title: "Sign in failed",
        description: error.message || "There was a problem signing in",
        variant: "destructive"
      });
      return { error, data: null };
    }
  };

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

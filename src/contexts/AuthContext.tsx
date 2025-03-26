
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
    
    // Set up auth state listener FIRST - this is critical for proper auth handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        // Update state based on auth events
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Show toast messages for auth events
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: `Welcome${session?.user?.email ? ' ' + session.user.email : ''}!`
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully"
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [toast]);

  const signOut = async () => {
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
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      
      if (result.error) {
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
      const result = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (result.error) {
        toast({
          title: "Sign in failed",
          description: result.error.message || "Invalid email or password",
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error: any) {
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


import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirect with hash parameters after OAuth sign in
  useEffect(() => {
    const handleHashParams = async () => {
      // Check if we have a hash in the URL (from OAuth)
      if (location.hash && location.hash.includes('access_token')) {
        try {
          // Let Supabase handle the hash params to set the session
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error processing auth redirect:", error);
            toast({
              title: "Authentication error",
              description: error.message || "There was a problem with authentication",
              variant: "destructive"
            });
          } else if (data?.session) {
            // Clean up the URL by removing the hash fragment
            window.history.replaceState(null, '', window.location.pathname);
            
            // User is signed in, show toast notification
            toast({
              title: "Signed in successfully",
              description: `Welcome${data.session?.user?.email ? ' ' + data.session.user.email : ''}!`
            });
          }
        } catch (error: any) {
          console.error("Failed to process authentication redirect:", error);
        }
      }
    };

    if (!loading) {
      handleHashParams();
    }
  }, [location.hash, loading, toast, navigate]);

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set up auth state listener FIRST - this is critical for proper auth handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log("User successfully signed in:", session.user.email);
          
          // Update state based on auth events
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          
          // Show toast message for sign in
          toast({
            title: "Signed in successfully",
            description: `Welcome${session?.user?.email ? ' ' + session.user.email : ''}!`
          });
          
          // Schedule navigation after state updates (to avoid race conditions)
          if (location.pathname === '/auth') {
            setTimeout(() => {
              navigate('/dashboard');
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          
          // Update state based on auth events
          setSession(null);
          setUser(null);
          setLoading(false);
          
          // Show toast message for sign out
          toast({
            title: "Signed out",
            description: "You have been signed out successfully"
          });
        } else if (event === 'TOKEN_REFRESHED') {
          console.log("Auth token refreshed");
          setSession(session);
          setUser(session?.user ?? null);
        } else if (event === 'USER_UPDATED') {
          console.log("User information updated");
          setSession(session);
          setUser(session?.user ?? null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
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
  }, [toast, navigate, location.pathname]);

  const signOut = async () => {
    console.log("Signing out");
    try {
      await supabase.auth.signOut();
      navigate('/auth');
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
      } else {
        // On successful sign in, navigate to dashboard
        navigate('/dashboard');
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

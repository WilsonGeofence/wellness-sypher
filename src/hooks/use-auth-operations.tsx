
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook to handle authentication operations
 * Provides methods for sign in, sign up, and sign out
 */
export const useAuthOperations = () => {
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signOut = async () => {
    console.log("Signing out");
    try {
      await supabase.auth.signOut();
      // Navigation will be handled by the auth state listener
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
    setIsOperationLoading(true);
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
      
      setIsOperationLoading(false);
      return result;
    } catch (error: any) {
      console.error("Exception during sign up:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "There was a problem creating your account",
        variant: "destructive"
      });
      setIsOperationLoading(false);
      return { error, data: null };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setIsOperationLoading(true);
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
      
      setIsOperationLoading(false);
      return result;
    } catch (error: any) {
      console.error("Exception during sign in:", error);
      toast({
        title: "Sign in failed",
        description: error.message || "There was a problem signing in",
        variant: "destructive"
      });
      setIsOperationLoading(false);
      return { error, data: null };
    }
  };

  return {
    signOut,
    signUpWithEmail,
    signInWithEmail,
    isOperationLoading
  };
};

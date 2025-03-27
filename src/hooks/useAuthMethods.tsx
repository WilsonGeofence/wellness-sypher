
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthMethods = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signOut = async () => {
    console.log("Signing out");
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out."
      });
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
      setLoading(true);
      
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
        if (result.data.user.identities?.length === 0) {
          // User already exists
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please try signing in instead.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to confirm your account."
          });
        }
      }
      
      setLoading(false);
      return result;
    } catch (error: any) {
      console.error("Exception during sign up:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "There was a problem creating your account",
        variant: "destructive"
      });
      setLoading(false);
      return { error, data: null };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      setLoading(true);
      
      const result = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log("Sign in result:", result);
      
      if (result.error) {
        console.error("Sign in error:", result.error);
        
        let errorDescription = "Invalid email or password";
        
        // Provide more specific error messages based on error code
        if (result.error.message.includes("Email not confirmed")) {
          errorDescription = "Please check your email and confirm your account before signing in.";
        } else if (result.error.message.includes("Invalid login credentials")) {
          errorDescription = "The email or password you entered is incorrect.";
        } else if (result.error.message.includes("rate limited")) {
          errorDescription = "Too many sign-in attempts. Please try again later.";
        } else if (result.error.message) {
          errorDescription = result.error.message;
        }
        
        toast({
          title: "Sign in failed",
          description: errorDescription,
          variant: "destructive"
        });
      } else {
        // On successful sign in, show success message and navigate to dashboard
        toast({
          title: "Signed in successfully",
          description: `Welcome back${result.data?.user?.email ? ' ' + result.data.user.email : ''}!`
        });
        navigate('/dashboard');
      }
      
      setLoading(false);
      return result;
    } catch (error: any) {
      console.error("Exception during sign in:", error);
      toast({
        title: "Sign in failed",
        description: error.message || "There was a problem signing in",
        variant: "destructive"
      });
      setLoading(false);
      return { error, data: null };
    }
  };

  return {
    loading,
    signOut,
    signUpWithEmail,
    signInWithEmail
  };
};

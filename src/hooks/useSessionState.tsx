
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSessionState = () => {
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
        
        if (event === 'SIGNED_IN') {
          console.log("User successfully signed in:", session?.user?.email);
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setLoading(false);
          toast({
            title: "Signed out",
            description: "You have been signed out successfully."
          });
        } else if (event === 'TOKEN_REFRESHED') {
          console.log("Auth token refreshed");
        } else if (event === 'USER_UPDATED') {
          console.log("User information updated");
          toast({
            title: "Profile updated",
            description: "Your profile information has been updated."
          });
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log("Password recovery event detected");
          toast({
            title: "Password recovery",
            description: "Please check your email to reset your password."
          });
        // Fix the TypeScript error by using a different check format
        } else if (event === 'USER_DELETED') {
          console.log("User account deleted");
          toast({
            title: "Account deleted",
            description: "Your account has been deleted successfully."
          });
        } else {
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log("Initial session check:", session?.user?.email);
      
      if (error) {
        console.error("Error fetching session:", error);
        toast({
          title: "Authentication error",
          description: "There was a problem retrieving your session. Please try signing in again.",
          variant: "destructive"
        });
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [toast]);

  return { session, user, loading };
};

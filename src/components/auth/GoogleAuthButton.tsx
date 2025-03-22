
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GoogleAuthButtonProps {
  disabled?: boolean;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      // Get the current URL for the redirect
      const redirectUrl = window.location.origin;
      console.log("Starting Google sign-in with redirectTo:", redirectUrl);
      
      // Use signInWithOAuth with Google provider
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            // Force account selection to prevent automatic sign-in with the last used account
            prompt: 'select_account',
          }
        }
      });

      if (error) {
        console.error("Google sign-in error:", error);
        toast({
          title: "Sign in failed",
          description: error.message || "There was a problem signing in with Google",
          variant: "destructive"
        });
        throw error;
      }
      
      console.log("Google sign-in initiated successfully", data);
      // The redirect will happen automatically, handled by Supabase
    } catch (error: any) {
      console.error("Failed to initiate Google sign-in:", error);
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during Google authentication",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button 
        onClick={handleGoogleSignIn}
        variant="outline" 
        className="w-full"
        disabled={disabled || loading}
      >
        {loading ? (
          <span className="mr-2">Loading...</span>
        ) : (
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="mr-2 h-5 w-5" 
          />
        )}
        {loading ? "Please wait..." : "Continue with Google"}
      </Button>
    </div>
  );
};

export default GoogleAuthButton;

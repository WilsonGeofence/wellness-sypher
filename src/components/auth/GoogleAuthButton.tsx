
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface GoogleAuthButtonProps {
  disabled?: boolean;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      // Get the current origin for the redirect URL
      const redirectUrl = `${window.location.origin}/`;
      console.log("Starting Google sign-in with redirectTo:", redirectUrl);
      
      // Initialize Google OAuth sign-in
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
          }
        }
      });

      if (error) {
        console.error("Google sign-in error:", error);
        throw error;
      }
      
      console.log("Google sign-in initiated successfully", data);
      // Note: No need to navigate here as OAuth will handle the redirect
    } catch (error: any) {
      console.error("Failed to initiate Google sign-in:", error);
      setErrorMessage(error.message || "An error occurred during Google authentication");
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
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          alt="Google" 
          className="mr-2 h-5 w-5" 
        />
        Continue with Google
      </Button>
      {errorMessage && (
        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default GoogleAuthButton;

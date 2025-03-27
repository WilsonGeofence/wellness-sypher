
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface GoogleAuthButtonProps {
  disabled?: boolean;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      // Get the current window location origin
      const origin = window.location.origin;
      const redirectUrl = `${origin}/dashboard`;
      console.log("Starting Google sign-in with redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            prompt: 'consent', // Always show consent screen to avoid issues
            access_type: 'offline', // Request a refresh token
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
        setLoading(false); // Reset loading state on error
        return;
      }
      
      console.log("Google sign-in initiated successfully, redirecting to:", data.url);
      // Redirect the user
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Failed to initiate Google sign-in:", error);
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during Google authentication",
        variant: "destructive"
      });
      setLoading(false); // Reset loading state on error
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
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait...</span>
          </>
        ) : (
          <>
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="mr-2 h-5 w-5" 
            />
            <span>Continue with Google</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default GoogleAuthButton;

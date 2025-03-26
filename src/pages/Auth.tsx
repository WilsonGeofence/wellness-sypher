
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import EmailAuthForm from '@/components/auth/EmailAuthForm';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthToggle from '@/components/auth/AuthToggle';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Check for access token in URL hash
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      toast({
        title: "Processing sign-in",
        description: "Please wait while we complete your authentication"
      });
      
      // Let the auth system handle the token, and clean up the URL
      window.history.replaceState(null, document.title, location.pathname);
      return;
    }

    // Only redirect after we've confirmed the auth state
    if (!loading && user) {
      console.log("User already logged in, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [user, navigate, loading, location.pathname, toast]);

  // Don't render the auth form until we've checked if the user is logged in
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sypher-blue-dark to-sypher-blue-accent p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-sypher-blue-accent border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sypher-blue-dark to-sypher-blue-accent p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <AuthHeader isSignUp={isSignUp} />

        <EmailAuthForm isSignUp={isSignUp} />

        <div className="mt-6 flex items-center justify-center">
          <div className="h-px flex-1 bg-sypher-gray-light"></div>
          <span className="px-4 text-sm text-sypher-gray">OR</span>
          <div className="h-px flex-1 bg-sypher-gray-light"></div>
        </div>

        <div className="mt-6">
          <GoogleAuthButton />
        </div>

        <AuthToggle isSignUp={isSignUp} onToggle={toggleAuthMode} />
      </div>
    </div>
  );

  function toggleAuthMode() {
    setIsSignUp(!isSignUp);
  }
};

export default Auth;

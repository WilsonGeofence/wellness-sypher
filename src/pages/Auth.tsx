
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import EmailAuthForm from '@/components/auth/EmailAuthForm';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthToggle from '@/components/auth/AuthToggle';

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sypher-blue-dark to-sypher-blue-accent p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <AuthHeader isSignUp={isSignUp} />

        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

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
};

export default Auth;

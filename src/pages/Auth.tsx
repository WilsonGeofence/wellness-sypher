
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import EmailAuthForm from '@/components/auth/EmailAuthForm';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthToggle from '@/components/auth/AuthToggle';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const navigate = useNavigate();
  
  // This route is only for non-authenticated users
  const { loading } = useProtectedRoute({ 
    requireAuth: false, 
    onlyPublic: true 
  });

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  // Handle successful authentication - redirect to returnUrl if provided
  const handleSuccessfulAuth = () => {
    if (returnUrl) {
      navigate(decodeURIComponent(returnUrl));
    } else {
      navigate('/dashboard');
    }
  };

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

        <EmailAuthForm isSignUp={isSignUp} onSuccess={handleSuccessfulAuth} />

        <div className="mt-6 flex items-center justify-center">
          <div className="h-px flex-1 bg-sypher-gray-light"></div>
          <span className="px-4 text-sm text-sypher-gray">OR</span>
          <div className="h-px flex-1 bg-sypher-gray-light"></div>
        </div>

        <div className="mt-6">
          <GoogleAuthButton onSuccess={handleSuccessfulAuth} />
        </div>

        <AuthToggle isSignUp={isSignUp} onToggle={toggleAuthMode} />

        {returnUrl && (
          <p className="mt-4 text-center text-xs text-sypher-gray">
            You'll be redirected back after signing in
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;

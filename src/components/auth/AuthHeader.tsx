
import React from 'react';

interface AuthHeaderProps {
  isSignUp: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isSignUp }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-sypher-black">
        {isSignUp ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sypher-gray-dark">
        {isSignUp 
          ? "Sign up to start tracking your health journey" 
          : "Sign in to continue your health journey"}
      </p>
    </div>
  );
};

export default AuthHeader;

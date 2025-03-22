
import React from 'react';

interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isSignUp, onToggle }) => {
  return (
    <div className="mt-8 text-center text-sm">
      <span className="text-sypher-gray-dark">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="ml-1 text-sypher-blue-accent hover:underline"
      >
        {isSignUp ? "Sign in" : "Sign up"}
      </button>
    </div>
  );
};

export default AuthToggle;

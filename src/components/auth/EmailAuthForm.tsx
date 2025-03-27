
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface EmailAuthFormProps {
  isSignUp: boolean;
}

const EmailAuthForm: React.FC<EmailAuthFormProps> = ({ isSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithEmail } = useAuth();
  
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      if (isSignUp) {
        // Sign up with email
        const { error } = await signUpWithEmail(email, password);
        if (error) {
          setErrorMessage(error.message || "An error occurred during sign up");
        } else {
          // Stay on the auth page and let the user sign in after confirming their email
          // We don't automatically navigate here since the user needs to confirm their email
        }
      } else {
        // Sign in with email
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMessage(error.message || "An error occurred during sign in");
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailAuth} className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-sypher-gray-dark">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-sypher-gray" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-sypher-gray-dark">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-sypher-gray" />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading}
      >
        {loading 
          ? "Loading..." 
          : isSignUp 
            ? "Create Account" 
            : "Sign In"
        }
      </Button>
    </form>
  );
};

export default EmailAuthForm;

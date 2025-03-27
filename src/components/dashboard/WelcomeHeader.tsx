
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserData } from '@/types/chat';
import { useNavigate } from 'react-router-dom';

interface WelcomeHeaderProps {
  userData: UserData | null;
  user: any;
  formattedDate: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userData, user, formattedDate }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-sypher-black animate-fade-in-up">
        {userData ? `Hello, ${userData.name}` : user ? 'Welcome to Sypher' : 'Welcome to Sypher'}
      </h1>
      <p className="text-sypher-gray-dark mt-1 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {formattedDate}
      </p>
      {!user && (
        <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Button 
            variant="default" 
            onClick={() => navigate('/auth')}
            className="bg-sypher-blue text-white"
          >
            Sign in to track your health
          </Button>
        </div>
      )}
    </div>
  );
};

export default WelcomeHeader;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center space-x-2">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-teal-500"
        onClick={() => navigate('/')}
      >
        <img
          src="/lovable-uploads/683fef85-24ec-4bb2-bf14-a6ab4ffb7c99.png"
          alt="Sypher Logo"
          className="w-8 h-8 object-contain"
        />
      </div>
      <h1 
        className="text-xl font-bold text-sypher-blue cursor-pointer"
        onClick={() => navigate('/')}
      >
        Sypher
      </h1>
    </div>
  );
};

export default Logo;

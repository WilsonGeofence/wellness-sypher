
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center space-x-2">
      <div 
        className="w-9 h-9 bg-sypher-blue rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-5 h-5 bg-white rounded-full"></div>
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


import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center space-x-2">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => navigate('/')}
      >
        <img
          src="/lovable-uploads/156167c3-2d69-4e37-9cfe-c30f2f95f3c7.png"
          alt="Sypher Logo"
          className="w-full h-full object-cover"
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

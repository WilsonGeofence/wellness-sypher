
import React, { useState } from 'react';
import { AlignRight, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

interface HeaderProps {
  pathname: string;
  user: any;
  handleSignOut: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ pathname, user, handleSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="relative z-10 backdrop-blur-md sticky top-0 w-full bg-white/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        
        <div className="md:hidden flex items-center z-20">
          <button
            className="p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-sypher-blue" />
            ) : (
              <AlignRight className="h-6 w-6 text-sypher-blue" />
            )}
          </button>
        </div>
        
        {!isMobile && (
          <DesktopNav pathname={pathname} user={user} handleSignOut={handleSignOut} />
        )}
        
        <MobileNav 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          pathname={pathname} 
          user={user} 
          handleSignOut={handleSignOut} 
        />
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavLinkProps {
  to: string;
  setIsOpen: (open: boolean) => void;
  active: boolean;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, setIsOpen, active, children }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors w-full ${
      active
        ? 'bg-sypher-blue-light text-sypher-blue-accent'
        : 'hover:bg-sypher-gray-light text-sypher-gray-dark'
    }`}
    onClick={() => setIsOpen(false)}
  >
    {children}
  </Link>
);

export default MobileNavLink;


import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
      active
        ? 'bg-sypher-blue-light text-sypher-blue-accent'
        : 'hover:bg-sypher-gray-light text-sypher-gray-dark'
    }`}
  >
    {children}
  </Link>
);

export default NavLink;

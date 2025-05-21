import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Plan', path: '/wizard' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Login', path: '/login' }
  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold">TripWizard</h1>
      <nav className="space-x-6 text-base font-medium">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={pathname === item.path ? 'text-blue-600 underline' : 'text-black hover:text-blue-500'}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
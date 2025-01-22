import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const NavbarSuperior: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 text-gray-300 flex items-center justify-between px-6 py-3 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logoceleste.png"
          alt="Logo"
          className="h-12 w-auto"
        />
        <span className="ml-3 text-xl font-bold text-white">Mi Aplicación</span>
      </div>

      {/* Notificaciones y Usuario */}
      <nav className="flex items-center space-x-6">
        {/* Notificaciones */}
        <Link
          to="/notificaciones"
          className="relative flex items-center hover:text-white transition-colors"
        >
          <BellIcon className="h-6 w-6" />
          {/* Indicador de notificaciones nuevas */}
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center transform translate-x-3 -translate-y-2">
            3
          </span>
        </Link>

        {/* Usuario */}
        <Link
          to="/usuario"
          className="flex items-center hover:text-white transition-colors"
        >
          <UserCircleIcon className="h-6 w-6" />
          <span className="ml-2">Usuario</span>
        </Link>
      </nav>
    </header>
  );
};

export default NavbarSuperior;

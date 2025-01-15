import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, CurrencyDollarIcon, LockClosedIcon, DocumentTextIcon, PowerIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-full">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <img
          src="/logoceleste.png"
          alt="Logo"
          className="h-12 w-auto"
        />
      </div>

      <nav className="flex-grow mt-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <HomeIcon className="h-6 w-6 mr-4" />
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/Usuarios"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <UserIcon className="h-6 w-6 mr-4" />
              Usuarios
            </Link>
          </li>
          <li>
            <Link
              to="/MultasAd"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <DocumentTextIcon className="h-6 w-6 mr-4" />
              Multas
            </Link>
          </li>
          <li>
            <Link
              to="/PermisosAd"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <LockClosedIcon className="h-6 w-6 mr-4" />
              Permisos Portones
            </Link>
          </li>
          <li>
            <Link
              to="/PagosAd"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <CurrencyDollarIcon className="h-6 w-6 mr-4" />
              Pagos
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="mt-auto">
        <ul>
          <li>
            <Link
              to="/" // Adjust to the actual log out route
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <PowerIcon className="h-6 w-6 mr-4" />
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 text-sm text-gray-500">
        © 2025 Daniel Castellanos
      </div>
    </aside>
  );
};

export default Navbar;

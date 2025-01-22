import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const NavbarSuperior: React.FC = () => {
  // Obtener el nombre y el rol del usuario desde localStorage
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userRole = localStorage.getItem('userProfile') || '';  // Obtener el valor de 'userProfile' directamente

  return (
    <header className="w-full bg-opacity-50 bg-gray-100 text-gray-600 flex items-center justify-between px-6 py-3 shadow-md z-10 backdrop-blur-lg">
      {/* Espacio vacío para dejar la barra limpia */}

      {/* Notificaciones y Usuario a la derecha */}
      <nav className="flex items-center space-x-6 ml-auto">
        {/* Mostrar notificaciones solo si el rol no es superadmin */}
        {userRole !== 'superadmin' && (
          <Link
            to="/notificaciones"
            className="relative flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
          >
            <BellIcon className="h-8 w-8 text-gray-500 hover:text-gray-700" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform translate-x-3 -translate-y-2">
              3
            </span>
          </Link>
        )}

        {/* Usuario */}
        <Link
          to="/usuario"
          className="flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
        >
          <UserCircleIcon className="h-8 w-8 text-gray-500 hover:text-gray-700" />
          <span className="ml-2">{userName}</span> {/* Muestra el nombre del usuario */}
        </Link>
      </nav>
    </header>
  );
};

export default NavbarSuperior;

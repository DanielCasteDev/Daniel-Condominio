import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
  DocumentTextIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

// Asegúrate de tener un logo en la carpeta pública o en una ruta accesible
import Logo from '/logoceleste.png'; // Actualiza con la ruta correcta de tu logo

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem('userName'); // Elimina el nombre del usuario
    localStorage.removeItem('userProfile'); // Elimina el perfil, si lo guardas
    // Redirigir al usuario a la página de inicio de sesión
    localStorage.removeItem('token'); // Elimina el perfil, si lo guardas

    navigate('/');
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300 flex flex-col h-full shadow-xl">
      {/* Logo en la parte superior */}
      <div className="flex items-center justify-center p-6 bg-gray-900">
        <img src={Logo} alt="Logo" className="h-14" /> {/* Ajusta el tamaño del logo según sea necesario */}
      </div>

      {/* Menú de navegación */}
      <nav className="flex-grow mt-6 px-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-lg group"
            >
              <HomeIcon className="h-6 w-6 mr-4 text-blue-400 group-hover:text-white" />
              <span className="text-lg font-medium">Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Usuarios"
              className="flex items-center px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-lg group"
            >
              <UserIcon className="h-6 w-6 mr-4 text-green-400 group-hover:text-white" />
              <span className="text-lg font-medium">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link
              to="/MultasAd"
              className="flex items-center px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-lg group"
            >
              <DocumentTextIcon className="h-6 w-6 mr-4 text-purple-400 group-hover:text-white" />
              <span className="text-lg font-medium">Multas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/PermisosAd"
              className="flex items-center px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-lg group"
            >
              <LockClosedIcon className="h-6 w-6 mr-4 text-yellow-400 group-hover:text-white" />
              <span className="text-lg font-medium">Permisos Portones</span>
            </Link>
          </li>
          <li>
            <Link
              to="/PagosAd"
              className="flex items-center px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-lg group"
            >
              <CurrencyDollarIcon className="h-6 w-6 mr-4 text-red-400 group-hover:text-white" />
              <span className="text-lg font-medium">Pagos</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Botón de cerrar sesión */}
      <nav className="mt-auto px-4 pb-6">
        <ul>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-lg group"
            >
              <PowerIcon className="h-6 w-6 mr-4 text-red-400 group-hover:text-white" />
              <span className="text-lg font-medium">Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400 text-center">
        © 2025 Daniel Castellanos
      </div>
    </aside>
  );
};

export default Navbar;
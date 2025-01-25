import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, CurrencyDollarIcon, LockClosedIcon, DocumentTextIcon, PowerIcon } from '@heroicons/react/24/outline';

// Asegúrate de tener un logo en la carpeta pública o en una ruta accesible
import Logo from '/logoceleste.png';  // Actualiza con la ruta correcta de tu logo

const NavbarUsr: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem('userName');  // Elimina el nombre del usuario
    localStorage.removeItem('userProfile');  // Elimina el perfil, si lo guardas
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/');
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-full">
      {/* Logo en la parte superior */}
      <div className="flex items-center justify-center p-4 bg-gray-900">  {/* bg-gray-900 para el mismo color que el fondo */}
        <img src={Logo} alt="Logo" className="h-12" /> {/* Ajusta el tamaño del logo según sea necesario */}
      </div>

      <nav className="flex-grow mt-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/DashboardUsr"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <HomeIcon className="h-6 w-6 mr-4" />
              Inicio
            </Link>
          </li>
        
          <li>
            <Link
              to="/Multas"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <DocumentTextIcon className="h-6 w-6 mr-4" />
              Multas
            </Link>
          </li>
          <li>
            <Link
              to="/Permisos"
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <LockClosedIcon className="h-6 w-6 mr-4" />
              Permisos Portones
            </Link>
          </li>
          <li>
            <Link
              to="/Pagos"
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
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
            >
              <PowerIcon className="h-6 w-6 mr-4" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 text-sm text-gray-500">
        © 2025 Daniel Castellanos
      </div>
    </aside>
  );
};

export default NavbarUsr;

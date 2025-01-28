import React from 'react';
import NavbarUsr from '../../components/navbar';
import NavbarSuperior from '../../components/navbar.superior';
import {
  HomeIcon,
  DocumentTextIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'; // Iconos de Heroicons

const DashboardUsr: React.FC = () => {
  // Obtener el nombre del usuario desde el localStorage
  const userName = localStorage.getItem('userName') || 'Usuario';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Navbar) */}
      <NavbarUsr />

      {/* Contenedor principal */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Navbar Superior */}
        <NavbarSuperior />

        {/* Contenido principal */}
        <div className="flex-grow p-8 overflow-y-auto">
          {/* Sección de bienvenida */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg text-white mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">Bienvenido, {userName}!</h1>
                <p className="text-lg">
                  Gestiona tus multas, permisos de portones y pagos de manera eficiente.
                </p>
              </div>
              <HomeIcon className="w-24 h-24 text-white opacity-90" />
            </div>
          </section>

          {/* Sección de acciones rápidas */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tarjeta: Multas */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="w-8 h-8 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Multas</h2>
              </div>
              <p className="text-gray-600">Revisa y gestiona las multas asociadas a tu cuenta.</p>
              
            </div>

            {/* Tarjeta: Permisos Portones */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <LockClosedIcon className="w-8 h-8 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Permisos Portones</h2>
              </div>
              <p className="text-gray-600">Administra los permisos de acceso a los portones.</p>
             
            </div>

            {/* Tarjeta: Pagos */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <CurrencyDollarIcon className="w-8 h-8 text-purple-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Pagos</h2>
              </div>
              <p className="text-gray-600">Realiza y consulta tus pagos de manera sencilla.</p>
             
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardUsr;
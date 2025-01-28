import React from 'react';
import NavbarAdmin from '../../components/navbar.ad'; // Asegúrate de tener un Navbar específico para admin
import NavbarSuperior from '../../components/navbar.superior';
import {
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'; // Iconos de Heroicons

const DashboardAdmin: React.FC = () => {
  // Obtener el nombre del administrador desde el localStorage
  const userName = localStorage.getItem('userName') || 'Usuario';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Navbar) */}
      <NavbarAdmin />

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
                  Gestiona usuarios, permisos, configuraciones y estadísticas de la plataforma.
                </p>
              </div>
              <CogIcon className="w-24 h-24 text-white opacity-90" />
            </div>
          </section>

          {/* Sección de acciones rápidas */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tarjeta: Gestión de Usuarios */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <UsersIcon className="w-8 h-8 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Gestión de Usuarios</h2>
              </div>
              <p className="text-gray-600">Administra los usuarios registrados en la plataforma.</p>
            </div>

            {/* Tarjeta: Reportes y Estadísticas */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <ChartBarIcon className="w-8 h-8 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Reportes y Estadísticas</h2>
              </div>
              <p className="text-gray-600">Consulta reportes y estadísticas de la plataforma.</p>
            </div>

            {/* Tarjeta: Configuraciones */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <CogIcon className="w-8 h-8 text-purple-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Configuraciones</h2>
              </div>
              <p className="text-gray-600">Configura los parámetros generales de la plataforma.</p>
            </div>

            {/* Tarjeta: Documentación */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="w-8 h-8 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Documentación</h2>
              </div>
              <p className="text-gray-600">Accede a la documentación técnica y guías de uso.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
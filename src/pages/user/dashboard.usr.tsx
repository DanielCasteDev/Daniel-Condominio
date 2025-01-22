import React from 'react';
import NavbarUsr from '../../components/navbar';
import NavbarSuperior from '../../components/navbar.superior';

const DashboardUsr: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Navbar) */}
      <NavbarUsr />

      {/* Contenedor principal */}
      <div className="flex-grow flex flex-col">
        {/* Navbar Superior */}
        <NavbarSuperior />

        {/* Contenido principal */}
        <div className="flex-grow p-8 overflow-y-auto bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-900">Bienvenido al Dashboard</h1>
            <p className="mt-4 text-lg text-gray-600">
              Este es el panel de Usuario, donde puedes gestionar todos los aspectos de la plataforma.
            </p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Estadísticas recientes</h2>
            <p className="mt-2 text-gray-600">Aquí puedes agregar gráficos o estadísticas relevantes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsr;

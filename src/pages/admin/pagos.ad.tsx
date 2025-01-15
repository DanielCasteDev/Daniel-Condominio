import React from 'react';
import Navbar from '../../components/navbar.ad';

const PagosAd: React.FC = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Navbar /> {/* Sidebar con Navbar */}

        <div className="flex-grow p-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-900">Bienvenido al Pagos</h1>
            <p className="mt-4 text-lg text-gray-600">
              Este es el panel de administración, donde puedes gestionar todos los aspectos de la plataforma.
            </p>
          </div>

          {/* Agrega aquí más contenido, gráficos, etc. */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Estadísticas recientes</h2>
            <p className="mt-2 text-gray-600">Aquí puedes agregar gráficos o estadísticas relevantes.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PagosAd;

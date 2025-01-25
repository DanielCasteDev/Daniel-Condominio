import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { obtenerNotificaciones, Notificacion, borrarNotificacionesPorDepartamento } from '../utils/data';

const SidebarNotificaciones: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userDepartment = localStorage.getItem('userDepartment');
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userRole = localStorage.getItem('userProfile') || '';

  const fetchNotificaciones = async () => {
    try {
      const data = await obtenerNotificaciones();
      const filteredNotificaciones = data.filter(
        (notificacion) => notificacion.departamento === userDepartment
      );
      setNotificaciones(filteredNotificaciones);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  };

  const handleBorrarTodo = async () => {
    try {
      if (userDepartment) {
        await borrarNotificacionesPorDepartamento(userDepartment);
        setNotificaciones([]);
        console.log('Todas las notificaciones fueron eliminadas.');
      } else {
        console.error('No se encontró el departamento del usuario.');
      }
    } catch (error) {
      console.error('Error al borrar todas las notificaciones:', error);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
    const interval = setInterval(() => {
      fetchNotificaciones();
    }, 1000);
    return () => clearInterval(interval);
  }, [userDepartment]);

  return (
    <div className="relative">
      <header className="w-full bg-opacity-50 bg-gray-100 text-gray-600 flex items-center justify-between px-6 py-3 shadow-md z-10 backdrop-blur-lg">
        <nav className="flex items-center space-x-6 ml-auto">
          {userRole !== 'superadmin' && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="relative flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
            >
              <BellIcon className="h-8 w-8 text-gray-500 hover:text-gray-700" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform translate-x-3 -translate-y-2">
                {notificaciones.length}
              </span>
            </button>
          )}
          <Link
            to="/usuario"
            className="flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
          >
            <UserCircleIcon className="h-8 w-8 text-gray-500 hover:text-gray-700" />
            <span className="ml-2">{userName}</span>
          </Link>
        </nav>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-20 flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="p-6 flex-grow overflow-y-auto">
            {notificaciones.length === 0 ? (
              <p className="text-gray-600">No hay notificaciones para mostrar.</p>
            ) : (
              notificaciones.map((notificacion, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 rounded-lg shadow-md border border-blue-200 mb-4"
                >
                  <h3 className="text-lg font-semibold text-blue-600">{notificacion.descripcion}</h3>
                  <p className="text-sm text-gray-600">
                    Fecha: {new Date(notificacion.fechamulta).toLocaleDateString('es-ES')}
                  </p>
                  <p className="text-sm text-gray-600">Departamento: {notificacion.departamento}</p>
                  <p className="text-sm text-gray-600">Multa: {notificacion.multa}</p>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handleBorrarTodo}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Borrar Todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarNotificaciones;

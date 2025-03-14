import React, { useState, useEffect, useCallback } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { obtenerNotificaciones, Notificacion, borrarNotificacionesPorDepartamento } from '../utils/data';
import Notis from '../components/notis';
import Perfil from '../components/perfil';

const SidebarNotificaciones: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userRole = localStorage.getItem('userProfile') || '';
  const userDepartamento = localStorage.getItem('userDepartment') || '';
  const fetchNotificaciones = useCallback(async () => {
    try {
      const data = await obtenerNotificaciones();
      console.log('Notificaciones obtenidas (sin filtrar):', data);
      console.log('Departamento del usuario:', userDepartamento);

      // Filtrar por "departamento"
      const notificacionesFiltradas = data.filter(
        notificacion => notificacion.departamento === userDepartamento
      );

      console.log('Notificaciones filtradas:', notificacionesFiltradas);
      setNotificaciones(notificacionesFiltradas);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  }, [userDepartamento]);

  const handleBorrarTodo = async () => {
    try {
      await borrarNotificacionesPorDepartamento(userDepartamento);
      setNotificaciones([]);
      console.log('Todas las notificaciones del departamento fueron eliminadas.');
    } catch (error) {
      console.error('Error al borrar las notificaciones:', error);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 1000);
    return () => clearInterval(interval);
  }, [fetchNotificaciones]);

  return (
    <div className="relative">
      <header className="w-full bg-opacity-50 bg-gray-100 text-gray-600 flex items-center justify-between px-6 py-3 shadow-md z-10 backdrop-blur-lg">
        <nav className="flex items-center space-x-6 ml-auto">
          {userRole !== 'superadmin' && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="relative flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
              aria-label="Notificaciones"
            >
              <BellIcon className="h-10 w-10 text-gray-500 hover:text-gray-700" />
              {notificaciones.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform translate-x-3 -translate-y-2">
                  {notificaciones.length}
                </span>
              )}
            </button>
          )}
          <Perfil />
        </nav>
      </header>

      <Notis
        notificaciones={notificaciones}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onClearAll={handleBorrarTodo}
      />
    </div>
  );
};

export default SidebarNotificaciones;
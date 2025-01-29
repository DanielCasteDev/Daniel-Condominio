import React from 'react';
import { Notificacion } from '../utils/data';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NotisProps {
  notificaciones: Notificacion[];
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

const Notis: React.FC<NotisProps> = ({ notificaciones, isOpen, onClose, onClearAll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-30 flex flex-col border-l border-gray-100 transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
          aria-label="Cerrar notificaciones"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </header>

      {/* Notifications List */}
      <main className="flex-grow overflow-y-auto">
        {notificaciones.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center text-sm py-6">No hay notificaciones nuevas.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {notificaciones.map((notificacion, index) => (
              <li
                key={index}
                className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="flex flex-col space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">{notificacion.descripcion}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(notificacion.fechamulta).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </p>
                  {notificacion.multa && (
                    <p className="text-xs text-gray-500">Multa: ${notificacion.multa}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      {notificaciones.length > 0 && (
        <footer className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClearAll}
            className="w-full text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
          >
            Limpiar Todas
          </button>
        </footer>
      )}
    </div>
  );
};

export default Notis;
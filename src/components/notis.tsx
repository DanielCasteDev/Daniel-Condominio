import React from 'react';
import { Notificacion } from '../utils/data';

interface NotisProps {
  notificaciones: Notificacion[];
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

const Notis: React.FC<NotisProps> = ({ notificaciones, isOpen, onClose, onClearAll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-sm z-30 flex flex-col border-l border-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
          aria-label="Cerrar notificaciones"
        >
          ✕
        </button>
      </header>

      {/* Notifications List */}
      <main className="flex-grow overflow-y-auto p-4">
        {notificaciones.length === 0 ? (
          <p className="text-gray-500 text-center text-sm py-6">No hay notificaciones nuevas.</p>
        ) : (
          notificaciones.map((notificacion, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-50 transition duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
            >
              <h3 className="text-sm font-medium text-gray-900">{notificacion.descripcion}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notificacion.fechamulta).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC', // Asegura que la fecha se muestre en UTC
                })}
              </p>
              {notificacion.multa && (
                <p className="text-xs text-gray-500 mt-1">Multa: ${notificacion.multa}</p>
              )}
            </div>
          ))
        )}
      </main>

      {/* Footer */}
      {notificaciones.length > 0 && (
        <footer className="p-4 border-t border-gray-100">
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
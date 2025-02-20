import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Notificacion } from '../utils/data';
import { XMarkIcon } from '@heroicons/react/24/outline';
import '../style/notis.css'; // Asegúrate de crear este archivo para los estilos de las animaciones

interface NotisProps {
  notificaciones: Notificacion[];
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

const Notis: React.FC<NotisProps> = ({ notificaciones, isOpen, onClose, onClearAll }) => {
  const modalRef = useRef(null); // Referencia al modal
  const fondoRef = useRef(null); // Referencia al fondo oscuro

  return (
    <>
      {/* Fondo oscuro */}
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="fondo"
        unmountOnExit
        nodeRef={fondoRef} // Pasa la referencia aquí
      >
        <div ref={fondoRef} className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
      </CSSTransition>

      {/* Modal de notificaciones */}
      <CSSTransition
        in={isOpen}
        timeout={3000} // Duración de la animación de entrada (600ms)
        classNames="notis"
        unmountOnExit
        nodeRef={modalRef} // Pasa la referencia aquí
      >
        <div ref={modalRef} className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-30 flex flex-col transform transition-transform duration-600 ease-in-out">
          {/* Header más pequeño */}
          <header className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Cerrar notificaciones"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </header>

          {/* Notifications List */}
          <main className="flex-grow overflow-y-auto">
            {notificaciones.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center text-sm py-6">No hay notificaciones nuevas.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notificaciones.map((notificacion, index) => (
                  <li
                    key={index}
                    className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
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
                        <p className="text-xs text-red-600 font-semibold">Multa: ${notificacion.multa}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </main>

          {/* Footer */}
          {notificaciones.length > 0 && (
            <footer className="p-4 border-t border-gray-200">
              <button
                onClick={onClearAll}
                className="w-full text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Limpiar Todas
              </button>
            </footer>
          )}
        </div>
      </CSSTransition>
    </>
  );
};

export default Notis;
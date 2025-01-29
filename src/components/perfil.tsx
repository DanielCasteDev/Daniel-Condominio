import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getUsuariosData } from '../utils/data';

const Perfil: React.FC = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const userDepartment = localStorage.getItem('userDepartment');
  const userName = localStorage.getItem('userName') || 'Usuario';

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuariosData();
      const filteredUsuarios = data.filter(
        (usuario) => usuario.department === userDepartment
      );
      setUsuarios(filteredUsuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    if (isUserModalOpen) {
      fetchUsuarios();
    }
  }, [isUserModalOpen]);

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    console.error('El elemento #modal-root no existe en el DOM.');
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsUserModalOpen(!isUserModalOpen)}
        className="flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
        aria-label="Perfil de usuario"
      >
        <UserCircleIcon className="h-10 w-10 text-gray-500 hover:text-gray-700" />
        <span className="ml-2">{userName}</span>
      </button>

      {isUserModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed top-14 right-4 z-[9999]">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 border border-gray-200">
              {/* Encabezado del modal */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <UserCircleIcon className="h-8 w-8 text-blue-500 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Perfil de Usuario</h2>
                </div>
                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Lista de usuarios */}
              <div className="max-h-96 overflow-y-auto">
                <ul className="space-y-4">
                  {usuarios.map((usuario) => (
                    <li key={usuario.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <p className="text-gray-700"><strong>Nombre:</strong> {usuario.name}</p>
                        <p className="text-gray-700 break-words">
                          <strong>Email:</strong> {usuario.email}
                        </p>
                        <p className="text-gray-700"><strong>Teléfono:</strong> {usuario.phone}</p>
                        <p className="text-gray-700"><strong>Perfil:</strong> {usuario.profile}</p>
                        <p className="text-gray-700"><strong>Torre:</strong> {usuario.tower}</p>
                        <p className="text-gray-700"><strong>Departamento:</strong> {usuario.department}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón de cierre */}
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>,
          modalRoot
        )}
    </div>
  );
};

export default Perfil;
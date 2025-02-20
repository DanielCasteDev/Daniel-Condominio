import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getUsuariosData, updatePassword, logoutAllDevices } from '../utils/data';

const Perfil: React.FC = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userDepartment = localStorage.getItem('userDepartment');
  const userName = localStorage.getItem('userName') || 'Usuario';

  // Obtener la lista de usuarios del departamento
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

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
  
    try {
      const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage
      if (!userId) {
        throw new Error('No se encontró el userId en el localStorage.');
      }
  
      await updatePassword(userId, newPassword); // Pasar userId en lugar de userName
      setSuccess('Contraseña actualizada correctamente');
      setError('');
      setNewPassword('');
      setConfirmPassword('');
  
      // Mostrar el modal de confirmación para cerrar sesión en todos los dispositivos
      setIsLogoutModalOpen(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al cambiar la contraseña');
      setSuccess('');
    }
  };

  // Cerrar sesión en todos los dispositivos
  const handleLogoutAllDevices = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage
      if (!userId) {
        throw new Error('No se encontró el userId en el localStorage.');
      }
  
      // Llamar a la función que borra el token del usuario en la base de datos
      await logoutAllDevices(userId);
  
      // Cerrar el modal de confirmación
      setIsLogoutModalOpen(false);
  
      // Redirigir al usuario a la página de login
      window.location.href = '/'; // Cambia esto por la ruta de tu página de login
    } catch (error) {
      console.error('Error al cerrar la sesión en todos los dispositivos:', error);
    }
  };

  // Cargar la lista de usuarios cuando se abre el modal de perfil
  useEffect(() => {
    if (isUserModalOpen) {
      fetchUsuarios();
    }
  }, [isUserModalOpen]);

  // Obtener el contenedor de modales
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    console.error('El elemento #modal-root no existe en el DOM.');
    return null;
  }

  return (
    <div className="relative">
      {/* Botón para abrir el modal de perfil */}
      <button
        onClick={() => setIsUserModalOpen(!isUserModalOpen)}
        className="flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
        aria-label="Perfil de usuario"
      >
        <UserCircleIcon className="h-10 w-10 text-gray-500 hover:text-gray-700" />
        <span className="ml-2">{userName}</span>
      </button>

      {/* Modal de perfil */}
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

              {/* Botón para abrir el modal de modificar contraseña */}
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 mb-4"
              >
                Modificar Contraseña
              </button>

              {/* Botón de cierre */}
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="mt-6 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>,
          modalRoot
        )}

      {/* Modal de modificar contraseña */}
      {isPasswordModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Cambiar Contraseña</h2>
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Formulario de modificar contraseña */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button
                  onClick={handlePasswordUpdate}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>,
          modalRoot
        )}

      {/* Modal de confirmación para cerrar sesión en todos los dispositivos */}
      {isLogoutModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Cerrar Sesión en Todos los Dispositivos</h2>
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-700 mb-6">
                ¿Deseas cerrar la sesión en todos los dispositivos? Esto eliminará tu token de acceso.
              </p>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogoutAllDevices}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>,
          modalRoot
        )}
    </div>
  );
};

export default Perfil;
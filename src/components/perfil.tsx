import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getUsuariosData, updatePassword, logoutAllDevices } from '../utils/data';
import { toast } from 'sonner';

// Componente reutilizable para los modales
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'center' | 'top-right'; // Nueva prop para controlar la posición
}> = ({ isOpen, onClose, title, children, position = 'center' }) => {
  if (!isOpen) return null;

  const modalPosition = position === 'top-right' 
    ? 'fixed top-14 right-4 z-[9999]' 
    : 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]';

  return ReactDOM.createPortal(
    <div className={modalPosition}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-100 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

const Perfil: React.FC = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
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
      toast.error('Error al cargar los usuarios');
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No se encontró el userId en el localStorage.');

      await updatePassword(userId, newPassword);
      setError('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Contraseña actualizada correctamente'); // Solo toast de éxito
      setIsLogoutModalOpen(true); // Mostrar modal de cierre de sesión
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al cambiar la contraseña');
      toast.error('Error al cambiar la contraseña');
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No se encontró el userId en el localStorage.');

      await logoutAllDevices(userId);
      setIsLogoutModalOpen(false);
      toast.success('Sesión cerrada en todos los dispositivos');
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
      toast.error('Error al cerrar la sesión');
    }
  };

  useEffect(() => {
    if (isUserModalOpen) fetchUsuarios();
  }, [isUserModalOpen]);

  return (
    <div className="relative">
      {/* Botón para abrir el modal de perfil */}
      <button
        onClick={() => setIsUserModalOpen(!isUserModalOpen)}
        className="flex items-center hover:text-gray-800 transition-all duration-300 ease-in-out"
        aria-label="Abrir perfil de usuario"
      >
        <UserCircleIcon className="h-10 w-10 text-gray-500 hover:text-gray-700" />
        <span className="ml-2">{userName}</span>
      </button>

      {/* Modal de perfil (en la esquina superior derecha) */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title="Perfil de Usuario"
        position="top-right" // Posición personalizada
      >
        <div className="max-h-96 overflow-y-auto">
          <ul className="space-y-4">
            {usuarios.map((usuario) => (
              <li key={usuario.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Nombre:</strong> {usuario.name}</p>
                  <p className="text-gray-700 break-words"><strong>Email:</strong> {usuario.email}</p>
                  <p className="text-gray-700"><strong>Teléfono:</strong> {usuario.phone}</p>
                  <p className="text-gray-700"><strong>Perfil:</strong> {usuario.profile}</p>
                  <p className="text-gray-700"><strong>Torre:</strong> {usuario.tower}</p>
                  <p className="text-gray-700"><strong>Departamento:</strong> {usuario.department}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-all duration-300 mt-4"
        >
          Modificar Contraseña
        </button>
      </Modal>

      {/* Modal de modificar contraseña (centrado) */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Cambiar Contraseña"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handlePasswordUpdate}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Cambiar Contraseña
          </button>
        </div>
      </Modal>

      {/* Modal de confirmación para cerrar sesión (centrado) */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Cerrar Sesión en Todos los Dispositivos"
      >
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
      </Modal>
    </div>
  );
};

export default Perfil;
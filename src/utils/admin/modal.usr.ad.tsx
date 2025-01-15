import React, { ChangeEvent, FormEvent } from 'react';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (newUser: any) => void;
  newUser: any;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, onClose, onSubmit, newUser, onInputChange }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Registrar Usuario</h3>
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                onSubmit(newUser);
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={newUser.name}
                  onChange={onInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={onInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número Celular</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={newUser.phone}
                  onChange={onInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Perfil</label>
                <select
                  id="profile"
                  name="profile"
                  value={newUser.profile}
                  onChange={onInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Seleccione un perfil</option>
                  <option value="dueño">Dueño</option>
                  <option value="inquilino">Inquilino</option>
                  <option value="arrendatario">Arrendatario</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Departamento</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  value={newUser.department}
                  onChange={onInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tower" className="block text-sm font-medium text-gray-700">Torre</label>
                <input
                  id="tower"
                  name="tower"
                  type="text"
                  value={newUser.tower}
                  onChange={onInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

import React, { ChangeEvent } from 'react';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (updatedMulta: any) => void;
  newMulta: any;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, onClose, onSubmit, newMulta, onInputChange }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{newMulta.id ? 'Editar Multa' : 'Registrar Multa'}</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                X
              </button>
            </div>

            <div className="space-y-4">
              {/* Usuario */}
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-600">
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={newMulta.usuario}
                  onChange={onInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Nombre Completo */}
              <div>
                <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-600">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombreCompleto"
                  name="nombreCompleto"
                  value={newMulta.nombreCompleto}
                  onChange={onInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Departamento */}
              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-600">
                  Departamento
                </label>
                <input
                  type="text"
                  id="departamento"
                  name="departamento"
                  value={newMulta.departamento}
                  onChange={onInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Torre */}
              <div>
                <label htmlFor="torre" className="block text-sm font-medium text-gray-600">
                  Torre
                </label>
                <input
                  type="text"
                  id="torre"
                  name="torre"
                  value={newMulta.torre}
                  onChange={onInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Multas */}
              <div>
                <label htmlFor="multas" className="block text-sm font-medium text-gray-600">
                  Multas
                </label>
                <input
                  type="number"
                  id="multas"
                  name="multas"
                  value={newMulta.multas}
                  onChange={onInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => onSubmit(newMulta)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {newMulta.id ? 'Guardar Cambios' : 'Registrar Multa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

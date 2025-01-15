import React, { ChangeEvent, FormEvent } from 'react';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  formData: any;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  fields?: { name: string; label: string; type: string }[]; // Configuración dinámica de campos
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  fields,
}) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {formData?.id ? 'Editar Registro' : 'Registrar Nuevo'}
            </h3>
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                onSubmit(formData);
              }}
            >
              {fields ? (
                // Configuración dinámica de campos
                fields.map(({ name, label, type }) => (
                  <div key={name} className="mb-4">
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    {type === 'select' ? (
                      <select
                        id={name}
                        name={name}
                        value={formData?.[name] || ''}
                        onChange={onInputChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Seleccione un perfil</option>
                        <option value="admin">Admin</option>
                        <option value="inquilino">Inquilino</option>
                        <option value="dueño">Dueño</option>
                      </select>
                    ) : (
                      <input
                        type={type}
                        id={name}
                        name={name}
                        value={formData?.[name] || ''}
                        onChange={onInputChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    )}
                  </div>
                ))
              ) : (
                // Si no se pasan campos, usar un formulario predeterminado
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name || ''}
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
                      value={formData.email || ''}
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
                      value={formData.phone || ''}
                      onChange={onInputChange}
                      required
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Campo para Perfil - select */}
                  <div className="mb-4">
                    <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Perfil</label>
                    <select
                      id="profile"
                      name="profile"
                      value={formData.profile || ''}
                      onChange={onInputChange}
                      required
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Seleccione un perfil</option>
                      <option value="admin">Admin</option>
                      <option value="inquilino">Inquilino</option>
                      <option value="dueño">Dueño</option>
                    </select>
                  </div>

                  {/* Campos para el pago */}
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto</label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      value={formData.amount || ''}
                      onChange={onInputChange}
                      required
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700">Fecha de Pago</label>
                    <input
                      id="payment_date"
                      name="payment_date"
                      type="date"
                      value={formData.payment_date || ''}
                      onChange={onInputChange}
                      required
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">Método de Pago</label>
                    <select
                      id="payment_method"
                      name="payment_method"
                      value={formData.payment_method || ''}
                      onChange={onInputChange}
                      required
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Seleccione un método</option>
                      <option value="tarjeta">Tarjeta</option>
                      <option value="transferencia">Transferencia</option>
                      <option value="efectivo">Efectivo</option>
                    </select>
                  </div>
                </>
              )}

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
                  {formData?.id ? 'Guardar Cambios' : 'Registrar'}
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

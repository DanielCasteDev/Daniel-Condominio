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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-8">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
            {/* Título del modal */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {formData?.id ? 'Editar Registro' : 'Registrar Nuevo'}
            </h3>

            {/* Formulario */}
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                onSubmit(formData);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {fields ? (
                  // Configuración dinámica de campos
                  fields.map(({ name, label, type }) => (
                    <div key={name} className="mb-4">
                      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                      </label>
                      {type === 'select' ? (
                        <select
                          id={name}
                          name={name}
                          value={formData?.[name] || ''}
                          onChange={onInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  // Si no se pasan campos, usar un formulario predeterminado
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name || ''}
                        onChange={onInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={onInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Número Celular</label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData.phone || ''}
                        onChange={onInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
                      <select
                        id="profile"
                        name="profile"
                        value={formData.profile || ''}
                        onChange={onInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccione un perfil</option>
                        <option value="admin">Admin</option>
                        <option value="inquilino">Inquilino</option>
                        <option value="dueño">Dueño</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount || ''}
                        onChange={onInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Pago</label>
                      <input
                        id="payment_date"
                        name="payment_date"
                        type="date"
                        value={formData.payment_date || ''}
                        onChange={onInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                      <select
                        id="payment_method"
                        name="payment_method"
                        value={formData.payment_method || ''}
                        onChange={onInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccione un método</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="efectivo">Efectivo</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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
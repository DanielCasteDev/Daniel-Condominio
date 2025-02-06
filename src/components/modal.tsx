import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../style/modal.css'; // Archivo CSS para las animaciones

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  formData: any;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  fields?: { name: string; label: string; type: string; options?: { value: string; label: string }[] }[];
  maxDate?: string;
  title: string;
  validateDepartamento?: boolean; // Nueva prop para habilitar la validación
  departamentos?: string[]; // Lista de departamentos (opcional)
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  fields,
  maxDate,
  title,
  validateDepartamento = false, // Por defecto, la validación está deshabilitada
  departamentos = [], // Por defecto, una lista vacía
}) => {
  const nodeRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departamentoError, setDepartamentoError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validar el departamento solo si validateDepartamento es true
    if (validateDepartamento && !departamentos.includes(formData.departamento)) {
      setDepartamentoError('El departamento no existe');
      return;
    }

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <CSSTransition
      in={showModal}
      timeout={1000}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-8 ${
          isSubmitting ? 'modal-loading' : ''
        }`}
      >
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl relative">
          {isSubmitting && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
              <div className="modal-loading"></div>
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {title}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {fields?.map(({ name, label, type, options }) => (
                <div key={name} className="mb-4">
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  {type === 'select' ? (
                    <select
                      id={name}
                      name={name}
                      value={formData?.[name] || ''}
                      onChange={onInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccione una opción</option>
                      {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={formData?.[name] || ''}
                      onChange={onInputChange}
                      className={`w-full px-4 py-2 border ${
                        name === 'departamento' && departamentoError ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      max={type === 'date' ? maxDate : undefined}
                    />
                  )}
                  {name === 'departamento' && departamentoError && (
                    <p className="text-red-500 text-sm mt-1">{departamentoError}</p>
                  )}
                </div>
              ))}
            </div>

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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : formData?.id ? 'Guardar Cambios' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
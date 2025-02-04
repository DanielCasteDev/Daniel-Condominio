import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../style/Modal.css'; // Archivo CSS para las animaciones

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>; // Debe manejar peticiones async
  formData: any;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  fields?: { name: string; label: string; type: string }[];
  maxDate?: string; // Nueva prop para la fecha máxima
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  fields,
  maxDate, // Recibir la fecha máxima como prop
}) => {
  const nodeRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
              {/* Ícono de carga */}
              <div className="modal-loading"></div>
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {formData?.id ? 'Editar Registro' : 'Registrar Nuevo'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {fields?.map(({ name, label, type }) => (
                <div key={name} className="mb-4">
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData?.[name] || ''}
                    onChange={onInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    max={type === 'date' ? maxDate : undefined} // Aplicar max solo para campos de tipo fecha
                  />
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
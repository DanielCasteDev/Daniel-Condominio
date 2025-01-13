import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import fondoImage from '../../assets/fondo.jpg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const referenceNumber = '12345'; // Número de referencia esperado

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phoneNumber === referenceNumber) {
      toast.success('Número correcto. Redirigiendo...', {
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/Verificar');
      }, 2000);
    } else {
      toast.error('Número incorrecto. Inténtalo de nuevo.', {
        duration: 3000,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondoImage})`,
      }}
    >
      <Toaster position="top-center" />
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
        <h1
          className="text-4xl font-bold text-center text-black mb-6"
          style={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
          }}
        >
          INICIAR SESIÓN
        </h1>
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Número de Celular"
              value={phoneNumber}
              onChange={handleInputChange}
              className="flex-grow px-4 py-3 focus:outline-none bg-white text-gray-700"
              maxLength={10} // Máximo de 10 dígitos
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold transition duration-300"
            >
              Continuar
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-700 mt-6">
          Te enviaremos un código de verificación a tu{' '}
          <b className="text-black">CELULAR</b> para confirmar tu identidad.
        </p>
      </div>
    </div>
  );
};

export default Login;

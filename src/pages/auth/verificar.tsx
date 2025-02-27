import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import fondoImage from '../../assets/fondo.webp';
import logo from '/logoceleste.png';

const Verificar: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // Estado para el número de teléfono
  const [countryCode, setCountryCode] = useState<string>('+52'); // Estado para el código de país (lada)
  const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [showVerification, setShowVerification] = useState<boolean>(false); // Mostrar pantalla de verificación
  const [showModal, setShowModal] = useState<boolean>(false); // Mostrar modal de cambio de contraseña
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Lista de códigos de país (lada)
  const countryCodes = [
    { code: '+52', name: 'México' },
    { code: '+1', name: 'Estados Unidos' },
    { code: '+54', name: 'Argentina' },
    { code: '+55', name: 'Brasil' },
    { code: '+56', name: 'Chile' },
    { code: '+57', name: 'Colombia' },
  ];

  // Función para enviar el código a WhatsApp
  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Ingresa un número de teléfono válido.');
      return;
    }

    // Simular envío del código a WhatsApp
    toast.success(`Código enviado al número ${countryCode} ${phoneNumber}.`, { duration: 2000 });
    setShowVerification(true); // Mostrar la pantalla de verificación
    setIsResendDisabled(true); // Deshabilitar el reenvío temporalmente
    setTimer(60); // Iniciar el temporizador
  };

  // Función para validar el código
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredCode = verificationCode.join('');
    if (enteredCode === '123456') {
      setShowModal(true); // Mostrar el modal si el código es correcto
      toast.success('Código correcto.', { duration: 2000 });
    } else {
      toast.error('Código incorrecto, intenta nuevamente.', { duration: 2000 });
    }
  };

  // Función para manejar cambios en los inputs del código
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Solo permite números
      const newCode = [...verificationCode];
      newCode[index] = value.slice(0, 1); // Limita a un solo dígito
      setVerificationCode(newCode);

      // Enfocar el siguiente input automáticamente
      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  // Función para manejar la tecla "Backspace"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && verificationCode[index] === '') {
      if (index > 0) {
        const prevInput = document.getElementById(`input-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  };

  // Función para reenviar el código
  const handleResendCode = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true);
      setTimer(60); // Reiniciar el temporizador
      toast.success(`Código reenviado al número ${countryCode} ${phoneNumber}.`, { duration: 2000 });
    }
  };

  // Temporizador para el reenvío del código
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Habilitar el botón de reenvío
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  // Función para cambiar la contraseña
  const handleChangePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    // Simular la actualización de la contraseña
    toast.success('Contraseña cambiada exitosamente. Redirigiendo...');
    setTimeout(() => {
      navigate('/Login'); // Redirigir al login
    }, 2000);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoImage})` }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16" />
        </div>

        {/* Pantalla inicial para ingresar el número de teléfono */}
        {!showVerification && (
          <>
            <h1
              className="text-4xl font-bold text-center text-black mb-6"
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}
            >
              INGRESA TU NÚMERO
            </h1>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Número de Teléfono
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-1/3 p-2 border rounded-md"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-2/3 p-2 border rounded-md"
                  placeholder="Ej: 1234567890"
                  required
                />
              </div>
            </div>
            <button
              onClick={handleSendCode}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold transition duration-300 w-full"
            >
              Enviar Código
            </button>
          </>
        )}

        {/* Pantalla de verificación del código */}
        {showVerification && (
          <>
            <h1
              className="text-4xl font-bold text-center text-black mb-6"
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}
            >
              VERIFICAR CÓDIGO
            </h1>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex justify-between mb-4">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:outline-none"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold transition duration-300 w-full"
              >
                Verificar
              </button>
            </form>
            <p className="text-center text-sm text-gray-700 mt-6">
              Ingresa el código de 6 dígitos que te hemos enviado a tu <b className="text-black">CELULAR</b>.
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={handleResendCode}
                disabled={isResendDisabled}
                className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
              >
                {isResendDisabled ? `Reintentar en ${timer}s` : 'Reenviar código'}
              </button>
            </div>
          </>
        )}

        {/* Modal para cambiar contraseña */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
              <h2 className="text-2xl font-bold text-center mb-6">Cambiar Contraseña</h2>
              <form onSubmit={handleChangePasswordSubmit}>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    Nueva Contraseña
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2 w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Repetir Contraseña
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)} // Cierra el modal
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Cambiar Contraseña
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verificar;
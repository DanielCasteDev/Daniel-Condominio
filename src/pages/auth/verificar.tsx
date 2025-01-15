import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import fondoImage from '../../assets/fondo.jpg';
import logo from '/logoceleste.png'; 

const Verificar: React.FC = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Código correcto. Redirigiendo...', { duration: 2000 });
    setTimeout(() => {
      navigate('/Dashboard');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value.slice(0, 1);
      setVerificationCode(newCode);
      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

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

  const handleResendCode = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true);
      setTimer(60);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoImage})` }}
    >
      <Toaster position="top-center" />
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16" />
        </div>

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
      </div>
    </div>
  );
};

export default Verificar;

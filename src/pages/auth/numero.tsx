import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { toast } from 'sonner';
import fondoImage from '../../assets/fondo.webp'; 
import logoImage from '/logoceleste.png'; 
import { sendWhatsAppMessage } from '../../utils/data';

const Numero: React.FC = () => {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isCounting && countdown > 0) {
      interval = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
      setCountdown(60);
    }

    return () => clearInterval(interval);
  }, [isCounting, countdown]);

  const handleSendWhatsApp = async () => {
    if (phoneNumber.length !== 10 || isNaN(Number(phoneNumber))) {
      toast.error('Por favor, ingresa un número de teléfono válido.');
      return;
    }
  
    const fullPhoneNumber = `+52${phoneNumber}`; // Lada fija de México
  
    try {
      await sendWhatsAppMessage(fullPhoneNumber);
      toast.success(`Mensaje enviado a ${fullPhoneNumber}`);
      setIsCounting(true);
    } catch (error) {
      toast.error('Hubo un problema al enviar el mensaje.');
    }
  };
  
  const handleResend = async () => {
    if (countdown > 0) return;
  
    const fullPhoneNumber = `+52${phoneNumber}`; // Lada fija de México
  
    try {
      await sendWhatsAppMessage(fullPhoneNumber);
      toast.success(`Mensaje reenviado a ${fullPhoneNumber}`);
      setIsCounting(true);
    } catch (error) {
      console.error('Error al reenviar WhatsApp:', error);
      toast.error('Error al reenviar el mensaje.');
    }
  };

  const handleExit = () => {
    navigate('/'); // Redirigimos a la ruta "/"
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoImage})` }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Logo" className="w-32 h-auto" />
        </div>
        <h1 className="text-4xl font-bold text-center text-black mb-6">Ingresa tu número de teléfono</h1>
        <div className="flex flex-col items-start border rounded-lg overflow-hidden shadow-md p-4">
          {/* Banner de número de teléfono */}
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Celular</label>
            <div className="flex items-center">
              <span className="px-4 py-3 bg-gray-200 text-gray-700 border rounded-l-md">+52</span>
              <input
                type="text"
                placeholder="Ej. 5512345678"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Solo permite números
                  if (value.length <= 10) {
                    setPhoneNumber(value);
                  }
                }}
                className="w-full px-4 py-3 focus:outline-none bg-white text-gray-700 border rounded-r-md"
                maxLength={10}
              />
            </div>
          </div>

          {/* Botón de enviar */}
          <button
            onClick={handleSendWhatsApp}
            disabled={isCounting}
            className={`mt-4 w-full ${
              isCounting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-4 py-3 font-semibold transition duration-300 rounded-md`}
          >
            Enviar WhatsApp
          </button>

          {/* Botón de reenviar */}
          <div className="w-full text-center mt-4">
            <button
              onClick={handleResend}
              disabled={isCounting}
              className={`text-sm ${
                isCounting ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
              } transition-colors`}
            >
              {isCounting ? `Reenviar en ${countdown} segundos` : 'Reenviar mensaje'}
            </button>
          </div>

          {/* Botón de salir */}
          <div className="w-full text-center mt-4">
            <button
              onClick={handleExit}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numero;
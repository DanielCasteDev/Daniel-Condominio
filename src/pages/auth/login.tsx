import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import fondoImage from '../../assets/fondo.webp';
import { loginUser } from '../../utils/data'; // Importar la función loginUser

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState(''); // Nuevo estado para la contraseña

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Llamar a la función loginUser con phoneNumber y password
      const { name, profile, department } = await loginUser(phoneNumber, password);

      console.log('Datos recibidos de la API:', { name, profile, department }); // Verifica los datos recibidos

      // Guardar los datos en localStorage
      localStorage.setItem('userName', name);
      localStorage.setItem('userProfile', profile);
      localStorage.setItem('userDepartment', department); // Guarda 'department' correctamente

      toast.success('Inicio de sesión exitoso. Redirigiendo...', {
        duration: 2000,
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        if (profile === 'superadmin') {
          navigate('/dashboard');
        } else {
          navigate('/DashboardUsr');
        }
      }, 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión', {
        duration: 3000,
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // Actualiza el estado de la contraseña
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondoImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
        <div className="flex justify-center mb-6">
          <img
            src="/logoceleste.png"
            alt="Logo"
            className="w-32 h-auto"
          />
        </div>
        <h1
          className="text-4xl font-bold text-center text-black mb-6"
          style={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
          }}
        >
          INICIAR SESIÓN
        </h1>
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col items-start border rounded-lg overflow-hidden shadow-md p-4">
            <input
              type="text"
              placeholder="Número de Celular"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 focus:outline-none bg-white text-gray-700 border rounded-md mb-4"
              maxLength={10}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 focus:outline-none bg-white text-gray-700 border rounded-md mb-4"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold transition duration-300 rounded-md"
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
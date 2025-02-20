import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import fondoImage from '../../assets/fondo.webp';
import { loginUser } from '../../utils/data'; // Función loginUser

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberSession, setRememberSession] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(phoneNumber, password, rememberSession);
      
      // Guardar datos en localStorage
      localStorage.setItem('userName', response.user.name);
      localStorage.setItem('userProfile', response.user.profile);
      localStorage.setItem('userDepartment', response.user.department);
      localStorage.setItem('userId', response.user.userId); // Guardamos el userId
      localStorage.setItem('token', response.token); // Guardamos el token

      toast.success('Inicio de sesión exitoso. Redirigiendo...', {
        duration: 2000,
      });

      setTimeout(() => {
        if (response.user.profile === 'superadmin') {
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

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondoImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src="/logoceleste.png" alt="Logo" className="w-32 h-auto" />
        </div>
        <h1 className="text-4xl font-bold text-center text-black mb-6">INICIAR SESIÓN</h1>
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col items-start border rounded-lg overflow-hidden shadow-md p-4">
            <input
              type="text"
              placeholder="Número de Celular"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 focus:outline-none bg-white text-gray-700 border rounded-md mb-4"
              maxLength={10}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 focus:outline-none bg-white text-gray-700 border rounded-md mb-4"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberSession"
                checked={rememberSession}
                onChange={(e) => setRememberSession(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="rememberSession" className="ml-2 text-sm text-gray-700">
                Recordar sesión
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold transition duration-300 rounded-md"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

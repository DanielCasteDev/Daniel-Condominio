import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Eliminamos Link y usamos navigate
import { toast } from 'sonner';
import fondoImage from '../../assets/fondo.webp';
import { loginUser, getToken } from '../../utils/data';
import { CSSTransition } from 'react-transition-group';
import '../../style/modal.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberSession, setRememberSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userProfile = localStorage.getItem('userProfile');

    if (userId) {
      navigate(userProfile === 'superadmin' ? '/dashboard' : '/DashboardUsr');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(phoneNumber, password, rememberSession);
      
      localStorage.setItem('userName', response.user.name);
      localStorage.setItem('userProfile', response.user.profile);
      localStorage.setItem('userDepartment', response.user.department);
      localStorage.setItem('userId', response.user.userId); 

      const tokenResponse = await getToken(response.user.userId);
      localStorage.setItem('token', tokenResponse.token);

      toast.success('Inicio de sesión exitoso. Redirigiendo...', { duration: 2000 });

      setTimeout(() => {
        navigate(response.user.profile === 'superadmin' ? '/dashboard' : '/DashboardUsr');
      }, 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión', { duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/Restablecer'); // Redirige a la página de recuperación de contraseña
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoImage})` }}
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
            {/* Botón para recuperar contraseña */}
            <div className="w-full text-right mb-4">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                ¿Olvidaste la contraseña?
              </button>
            </div>
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
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Continuar'}
            </button>
          </div>
        </form>

        <CSSTransition in={isLoading} timeout={300} classNames="modal" unmountOnExit>
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="modal-loading"></div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Login;

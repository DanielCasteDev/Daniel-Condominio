import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authMiddleware } from './validacion.token.temp'; // Importa el middleware
import { toast } from 'sonner';

const AuthGuard: React.FC = () => {
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false); // Estado para controlar si el toast ya se mostró

  useEffect(() => {
    const checkToken = () => {
      const tokenExpired = authMiddleware(navigate); // Verifica el token
      if (tokenExpired && !toastShown) {
        toast.error("Sesión cerrada", { duration: 5000 }); // Alerta durará 10 segundos
        setToastShown(true); // Marca que el toast ya se mostró
      } else if (!tokenExpired) {
        setToastShown(false); 
      }
    };

    checkToken();

    const intervalId = setInterval(checkToken, 5000); 
    return () => clearInterval(intervalId);
  }, [navigate, toastShown]);

  return null; 
};

export default AuthGuard;
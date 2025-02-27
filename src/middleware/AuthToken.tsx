// middleware/AuthGuard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authMiddleware } from './validacion.token.temp';
import { toast } from 'sonner';

const AuthGuard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toastShown, setToastShown] = useState(false); 

  useEffect(() => {
    const checkToken = () => {
      // No validar token en las rutas de login o verificación
if (location.pathname === "/" || location.pathname==="/Restablecer") {
        return;
      }

      const tokenExpired = authMiddleware();
      if (tokenExpired && !toastShown) {
        toast.error("Sesión cerrada", { duration: 5000 });
        setToastShown(true); 
      } else if (!tokenExpired) {
        setToastShown(false); 
      }

      if (tokenExpired) {
        navigate("/"); // Redirige a login si el token está ausente o expirado
      }
    };

    checkToken();

    const intervalId = setInterval(checkToken, 5000); 
    return () => clearInterval(intervalId);
  }, [navigate, toastShown, location.pathname]);

  return null;
};

export default AuthGuard;

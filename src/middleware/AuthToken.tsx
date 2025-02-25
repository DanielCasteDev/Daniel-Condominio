import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authMiddleware } from './validacion.token.temp'; 
import { toast } from 'sonner';

const AuthGuard: React.FC = () => {
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false); 

  useEffect(() => {
    const checkToken = () => {
      const tokenExpired = authMiddleware(navigate); 
      if (tokenExpired && !toastShown) {
        toast.error("Sesión cerrada", { duration: 5000 }); 
        setToastShown(true); 
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
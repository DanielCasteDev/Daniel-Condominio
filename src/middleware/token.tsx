// middleware/token.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '../utils/data'; 

const Token: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const excludedPaths = ['/', '/Verificar'];

    if (excludedPaths.includes(location.pathname)) {
      return;
    }

    const userId = localStorage.getItem('userId'); 

    const updateToken = async () => {
      if (userId) {
        try {
          const tokenResponse = await getToken(userId);
          const newToken = tokenResponse.token;

          if (newToken) {
            localStorage.setItem('token', newToken);

            localStorage.setItem('tokenUpdated', JSON.stringify({ token: newToken, timestamp: Date.now() }));
          } else {
            console.warn('No se encontró un token válido en la base de datos.');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error al actualizar el token:', error);
          localStorage.removeItem('token');
        }
      }
    };

    updateToken();

    const interval = setInterval(updateToken, 1000);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'tokenUpdated') {
        const { token } = JSON.parse(event.newValue || '{}');
        if (token) {
          localStorage.setItem('token', token);
          console.log('Token actualizado desde otra pestaña.');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location.pathname]);

  return null; 
};

export default Token;
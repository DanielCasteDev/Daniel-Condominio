import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyToken } from "../../utils/data"; // Importa la función desde data.ts

const Restablecer = () => {
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const intervalTime = 30000; // 30 segundos

    const verifyTokenInterval = async () => {
      try {
        const data = await verifyToken(token || ""); // Llama a la función verifyToken
        setIsValidToken(true);
        setUserId(data.userId);
        setError(null); // Limpia el error si la solicitud es exitosa
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
      }
    };

    // Ejecuta la verificación inmediatamente
    verifyTokenInterval();

    // Configura el intervalo para ejecutar la verificación cada 30 segundos
    const interval = setInterval(verifyTokenInterval, intervalTime);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [token]);

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <p>Token recibido: {token}</p>
      {isValidToken ? (
        <div>
          <p>Token válido</p>
          <p>User ID: {userId}</p>
          {/* Aquí puedes agregar un formulario para restablecer la contraseña */}
        </div>
      ) : (
        <p>Verificando token...</p>
      )}
    </div>
  );
};

export default Restablecer;
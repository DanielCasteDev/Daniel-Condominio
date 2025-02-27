import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Restablecer = () => {
  const { token } = useParams();

  useEffect(() => {
    console.log("Token recibido:", token);
    // Aquí puedes hacer una petición a tu backend para validar el token
  }, [token]);

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <p>Token recibido: {token}</p>
    </div>
  );
};

export default Restablecer;

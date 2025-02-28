import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useEffect, useState } from "react";
import { verifyToken, updatePassword } from "../../utils/data"; // Importa las funciones desde data.ts
import { toast } from "sonner"; // Para las alertas
import fondoImage from "../../assets/fondo.webp"; // Imagen de fondo
import logoImage from "/logoceleste.png"; // Logo de la aplicación

const Restablecer = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // Usa useNavigate para redirigir
  const [isValidToken, setIsValidToken] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const intervalTime = 30000; // 30 segundos

    const verifyTokenInterval = async () => {
      try {
        const data = await verifyToken(token || ""); // Llama a la función verifyToken
        setIsValidToken(true);
        setUserId(data.userId);
        setError(null); // Limpia el error si la solicitud es exitosa
        toast.success("Token válido. Puedes restablecer tu contraseña.");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    // Ejecuta la verificación inmediatamente
    verifyTokenInterval();

    // Configura el intervalo para ejecutar la verificación cada 30 segundos
    const interval = setInterval(verifyTokenInterval, intervalTime);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [token]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      if (!userId) {
        throw new Error("No se pudo obtener el ID del usuario.");
      }

      await updatePassword(userId, newPassword); // Llama a la función para actualizar la contraseña
      toast.success("Contraseña actualizada correctamente. Redirigiendo al login...");

      // Redirige al login después de 5 segundos
      setTimeout(() => {
        navigate("/login"); // Redirige a la página de login
      }, 5000); // 5000 ms = 5 segundos

      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al actualizar la contraseña";
      toast.error(errorMessage);
    }
  };

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoImage})` }}
      >
        <div className="bg-white bg-opacity-90 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoImage})` }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Logo" className="w-32 h-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Restablecer Contraseña</h2>

        {isValidToken ? (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 focus:outline-none bg-white text-gray-700 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 focus:outline-none bg-white text-gray-700 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold transition duration-300 rounded-md"
            >
              Cambiar Contraseña
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-700">Verificando token...</p>
        )}
      </div>
    </div>
  );
};

export default Restablecer;
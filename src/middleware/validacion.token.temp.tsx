
export const authMiddleware = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.clear();
    return true; // Indica que el usuario no tiene sesión
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.clear();
      return true; // Indica que el token ha expirado
    }
  } catch (error) {
    localStorage.clear();
    return true;
  }

  return false; // Token válido
};

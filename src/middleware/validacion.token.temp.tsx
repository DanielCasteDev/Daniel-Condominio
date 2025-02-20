import { NavigateFunction } from "react-router-dom";

export const authMiddleware = (navigate: NavigateFunction) => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.clear();
    navigate("/");
    return true; 
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.clear();
      navigate("/");
      return true; 
    }
  } catch (error) {
    localStorage.clear();
    navigate("/");
    return true; 
  }

  return false; 
};
import { API_BASE_URL } from '../services/apiService';

export const saveUsuario = async (formData: any): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    const { id, ...usuarioData } = formData; 

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Agregamos el token para autenticación
    };

    if (id) {
      // Actualizar usuario existente
      console.log('Actualizando usuario:', usuarioData);
      const response = await fetch(`${API_BASE_URL}/actualizar_usuario/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(usuarioData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      console.log('Usuario actualizado exitosamente');
    } else {
      // Registrar nuevo usuario
      const response = await fetch(`${API_BASE_URL}/insertar_usuario`, {
        method: 'POST',
        headers,
        body: JSON.stringify(usuarioData),
      });

      if (!response.ok) {
        throw new Error('Error al insertar el usuario');
      }

      console.log('Usuario registrado exitosamente');
    }
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    throw new Error('No se pudo guardar el usuario.');
  }
};

import { API_BASE_URL } from '../services/apiService';

export const saveUsuario = async (formData: any): Promise<void> => {
  try {
    // Eliminar el campo id si existe, ya que MongoDB lo maneja automáticamente
    const { id, ...usuarioData } = formData; 

    if (id) {
      // Lógica para actualizar usuario
      console.log('Actualizando usuario:', usuarioData);
      const response = await fetch(`${API_BASE_URL}/actualizar_usuario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData),  // Enviar los datos sin el campo id
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      console.log('Usuario actualizado exitosamente');
    } else {
      // Registrar nuevo usuario, sin el campo id
      const response = await fetch(`${API_BASE_URL}/insertar_usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData), // Enviar solo los datos sin el campo id
      });

      if (!response.ok) {
        throw new Error('Error al insertar el usuario');
      }

      console.log('Usuario registrado exitosamente');
    }
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

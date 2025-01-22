// src/services/multasService.ts
import { API_BASE_URL } from '../services/apiService';

export const saveMulta = async (formData: any): Promise<void> => {
  try {
    if (formData.id) {
      // Lógica para actualizar multa (puedes implementar la lógica de actualización aquí)
      console.log('Actualizando multa:', formData);
      const response = await fetch(`${API_BASE_URL}/actualizar_multa/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la multa');
      }

      console.log('Multa actualizada exitosamente');
    } else {
      // Registrar nueva multa
      const response = await fetch(`${API_BASE_URL}/insertar_multas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al insertar la multa');
      }

      console.log('Multa registrada exitosamente');
    }
  } catch (error) {
    console.error('Error al guardar la multa:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

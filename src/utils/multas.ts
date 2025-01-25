import { API_BASE_URL } from '../services/apiService';

export const saveMulta = async (formData: any): Promise<void> => {
  try {
    const { descripcion, fechamulta, departamento, multa } = formData;

    // Realizar el POST para guardar la multa
    const multaResponse = await fetch(`${API_BASE_URL}/insertar_multas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion, fechamulta, departamento, multa }),
    });

    if (!multaResponse.ok) {
      throw new Error('Error al insertar la multa');
    }

    console.log('Multa registrada exitosamente');

    // Realizar el POST para crear la notificación
    const notificacionResponse = await fetch(`${API_BASE_URL}/insertar_notis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion, fechamulta, departamento, multa }),
    });

    if (!notificacionResponse.ok) {
      throw new Error('Error al insertar la notificación');
    }

    console.log('Notificación registrada exitosamente');
  } catch (error) {
    console.error('Error al guardar la multa y la notificación:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

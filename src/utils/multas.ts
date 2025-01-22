// src/services/multasService.ts
import { API_BASE_URL } from '../services/apiService';
export const saveMulta = async (formData: any): Promise<void> => {
  try {
    // Extraer los campos necesarios
    const { descripcion, fechamulta, departamento, multa } = formData;

    // Realizar el POST solo con esos campos
    const response = await fetch(`${API_BASE_URL}/insertar_multas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion, fechamulta, departamento, multa }), // Incluir todos los campos necesarios
    });

    if (!response.ok) {
      throw new Error('Error al insertar la multa');
    }

    console.log('Multa registrada exitosamente');
  } catch (error) {
    console.error('Error al guardar la multa:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};


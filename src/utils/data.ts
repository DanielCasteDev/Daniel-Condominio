import { API_BASE_URL } from '../services/apiService';



interface Multa {
  id: string; // Puedes usar otro tipo, dependiendo de la estructura de la base de datos
  descripcion: string;
  fechamulta: string; // Cambia el tipo según el formato real de la fecha
  multa: string; // O puede ser un número, dependiendo de tu caso
}

interface Usuario {
  id: string;
  name: string;
  department: string;
  tower: string;
  multas: Multa[]; // Un usuario tiene un arreglo de multas
}


export interface LoginResponse {
  name: string;
  profile: string;
  department: string; // Cambié 'departament' por 'department', ya que en tu base de datos es 'department'
}

export const loginUser = async (phone: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    const data = await response.json();

    console.log('Datos recibidos de la API:', data);  // Verifica que 'department' sea un número o cadena válida

    return data; // Devuelve los datos del usuario, incluyendo department
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error de conexión');
  }
};


export const getPermisosData = () => {
  return [
    { id: 1, usuario: 'Juan Pérez', nombreCompleto: 'Juan Pérez', departamento: 'HR', torre: 'A', permisos: 'Admin' },
    { id: 2, usuario: 'Ana Gómez', nombreCompleto: 'Ana Gómez', departamento: 'IT', torre: 'B', permisos: 'User' },
    { id: 3, usuario: 'Luis García', nombreCompleto: 'Luis García', departamento: 'Marketing', torre: 'C', permisos: 'Editor' },
    { id: 4, usuario: 'Carlos Rivera', nombreCompleto: 'Carlos Rivera', departamento: 'Operaciones', torre: 'A', permisos: 'Viewer' },
    { id: 5, usuario: 'María Torres', nombreCompleto: 'María Torres', departamento: 'Legal', torre: 'B', permisos: 'Admin' },
    { id: 6, usuario: 'Fernanda López', nombreCompleto: 'Fernanda López', departamento: 'Finanzas', torre: 'C', permisos: 'User' },
    { id: 7, usuario: 'Pedro Sánchez', nombreCompleto: 'Pedro Sánchez', departamento: 'Logística', torre: 'A', permisos: 'Editor' },
    { id: 8, usuario: 'Sofía Gómez', nombreCompleto: 'Sofía Gómez', departamento: 'Compras', torre: 'B', permisos: 'Admin' },
    { id: 9, usuario: 'Ricardo Martínez', nombreCompleto: 'Ricardo Martínez', departamento: 'Ventas', torre: 'C', permisos: 'Viewer' },
    { id: 10, usuario: 'Elena García', nombreCompleto: 'Elena García', departamento: 'Soporte', torre: 'A', permisos: 'User' },
    { id: 11, usuario: 'Alejandro Díaz', nombreCompleto: 'Alejandro Díaz', departamento: 'IT', torre: 'B', permisos: 'Editor' },
    { id: 12, usuario: 'Lucía Fernández', nombreCompleto: 'Lucía Fernández', departamento: 'Marketing', torre: 'C', permisos: 'Viewer' },
    { id: 13, usuario: 'Jorge Hernández', nombreCompleto: 'Jorge Hernández', departamento: 'RRHH', torre: 'A', permisos: 'Admin' },
  ];
};

  
export const getUsuariosData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/obtener_usuarios`);
    
    if (!response.ok) {
      throw new Error('No se pudo obtener los usuarios');
    }
    
    // Convertir la respuesta en JSON
    const data = await response.json();
    
    // Verificar si los datos son un arreglo
    if (Array.isArray(data)) {
      return data.map((usuario, index) => ({
        id: index + 1, // Si deseas asignar un ID de índice, puedes usar este
        name: usuario.name,
        email: usuario.email,
        phone: usuario.phone,
        profile: usuario.profile,
        department: usuario.department,
        tower: usuario.tower,
      }));
    } else {
      // Si no es un arreglo, muestra el contenido de los datos
      console.error('Los datos no son un arreglo válido:', data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    alert('Hubo un error al obtener los usuarios. Intenta nuevamente.');
    return [];
  }
};

export const getMultasData = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/obtener_multas_con_usuario?departamento=someDepartment`);

    if (!response.ok) {
      throw new Error('No se pudo obtener las multas');
    }

    // Convertir la respuesta en JSON
    const data: Usuario[] = await response.json();

    console.log("Datos recibidos:", data);

    if (Array.isArray(data)) {
      return data.map((usuario, index) => {
        // Si el usuario tiene multas, las mapeamos. Si no, mostramos una entrada vacía o un mensaje.
        if (!Array.isArray(usuario.multas) || usuario.multas.length === 0) {
          console.log(`El usuario ${usuario.name} no tiene multas.`);
          
          // Retorna el usuario sin multas, con valores vacíos en las propiedades de multa
          return {
            id: `${index + 1}`,
            usuario: usuario.name,
            nombreCompleto: usuario.name,
            departamento: usuario.department,
            torre: usuario.tower,
            multa: "Sin multas",
            descripcion: "No tiene multas",
            fechamulta: "N/A",
          };
        }

        // Si el usuario tiene multas, las mapeamos
        return usuario.multas.map((multa, multaIndex) => ({
          id: `${index + 1}-${multaIndex + 1}`, // Generar ID único basado en el índice del usuario y multa
          usuario: usuario.name,  // Nombre del usuario
          nombreCompleto: usuario.name, // Nombre completo del usuario
          departamento: usuario.department, // Departamento del usuario
          torre: usuario.tower, // Torre del usuario
          multa: multa.multa, // Multa
          descripcion: multa.descripcion, // Descripción de la multa
          fechamulta: multa.fechamulta, // Fecha de la multa
        }));
      }).flat(); // Usamos flat() para aplanar el arreglo de multas
    } else {
      console.error('Los datos no son un arreglo válido:', data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las multas:', error);
    alert('Hubo un error al obtener las multas. Intenta nuevamente.');
    return [];
  }
};


  

  export const getPagosData = () => {
    return [
      { id: 1, usuario: 'Juan Pérez', nombreCompleto: 'Juan Pérez', monto: 1000, fechaPago: '2025-01-15', estadoPago: 'Pagado', metodoPago: 'Tarjeta' },
      { id: 2, usuario: 'María López', nombreCompleto: 'María López', monto: 500, fechaPago: '2025-01-15', estadoPago: 'Pendiente', metodoPago: '' },
      { id: 3, usuario: 'Daniel López', nombreCompleto: 'Daniel López', monto: 750, fechaPago: '2025-01-15', estadoPago: 'Pagado', metodoPago: 'Transferencia' },
      { id: 4, usuario: 'Laura García', nombreCompleto: 'Laura García', monto: 300, fechaPago: '2025-01-15', estadoPago: 'Pendiente', metodoPago: '' },
      { id: 5, usuario: 'Carlos Ramírez', nombreCompleto: 'Carlos Ramírez', monto: 1200, fechaPago: '2025-01-15', estadoPago: 'Pagado', metodoPago: 'Cheque' },
      { id: 6, usuario: 'Gabriela Mendoza', nombreCompleto: 'Gabriela Mendoza', monto: 400, fechaPago: '2025-01-15', estadoPago: 'Pendiente', metodoPago: '' },
      { id: 7, usuario: 'Fernando López', nombreCompleto: 'Fernando López', monto: 600, fechaPago: '2025-01-15', estadoPago: 'Pagado', metodoPago: 'Tarjeta' },
      { id: 8, usuario: 'Ana Sánchez', nombreCompleto: 'Ana Sánchez', monto: 850, fechaPago: '2025-01-15', estadoPago: 'Pendiente', metodoPago: '' },
      { id: 9, usuario: 'Miguel Castro', nombreCompleto: 'Miguel Castro', monto: 1000, fechaPago: '2025-01-15', estadoPago: 'Pagado', metodoPago: 'Transferencia' },
      { id: 10, usuario: 'Luisa Ortega', nombreCompleto: 'Luisa Ortega', monto: 700, fechaPago: '2025-01-15', estadoPago: 'Pendiente', metodoPago: '' },
      { id: 11, usuario: 'Esteban Morales', nombreCompleto: 'Esteban Morales', monto: 900, fechaPago: '2025-01-15', estadoPago: 'Pagado', metodoPago: 'Cheque' },
      { id: 12, usuario: 'Camila Ruiz', nombreCompleto: 'Camila Ruiz', monto: 950, fechaPago: '2025-01-15', estadoPago: 'Pendiente', metodoPago: '' },
      { id: 13, usuario: 'Pablo Fernández', nombreCompleto: 'Pablo Fernández', monto: 1100, fechaPago: '2025-01-15', estadoPago: 'Pagado', metodoPago: 'Tarjeta' },
    ];
  };
  
  // utils/data.ts
export interface Notificacion {
  descripcion: string;
  fechamulta: string;
  departamento: string;
  multa: string;
}


export const obtenerNotificaciones = async (): Promise<Notificacion[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notificaciones`, {
      method: 'GET', // Usamos GET ya que estamos trayendo datos
      headers: {
        'Content-Type': 'application/json',
        // Agregar token o autorización si es necesario
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Error al obtener las notificaciones');
    }

    const data = await response.json();
    return data; // Suponemos que la respuesta es un array de notificaciones
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error de conexión');
  }
};

export const borrarNotificacionesPorDepartamento = async (departamento: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notificaciones`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Agregar token o autorización si es necesario
      },
      body: JSON.stringify({ departamento }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Error al borrar las notificaciones');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error de conexión');
  }
};
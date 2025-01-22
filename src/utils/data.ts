
import { API_BASE_URL } from '../services/apiService';

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
  
  export const getUsuariosData = () => {
    return [
      { id: 1, name: 'Juan Pérez', email: 'juan@correo.com', phone: '555-1234', profile: 'Admin', department: 'Ventas', tower: 'A' },
      { id: 2, name: 'María López', email: 'maria@correo.com', phone: '555-5678', profile: 'Usuario', department: 'Soporte', tower: 'B' },
      { id: 3, name: 'Daniel López', email: 'daniel@correo.com', phone: '555-5678', profile: 'Usuario', department: 'Soporte', tower: 'A' },
      { id: 4, name: 'Laura García', email: 'laura@correo.com', phone: '555-9999', profile: 'Usuario', department: 'Legal', tower: 'C' },
      { id: 5, name: 'Carlos Ramírez', email: 'carlos@correo.com', phone: '555-4321', profile: 'Admin', department: 'Marketing', tower: 'A' },
      { id: 6, name: 'Gabriela Mendoza', email: 'gabriela@correo.com', phone: '555-2468', profile: 'Usuario', department: 'Finanzas', tower: 'B' },
      { id: 7, name: 'Fernando López', email: 'fernando@correo.com', phone: '555-7890', profile: 'Admin', department: 'IT', tower: 'C' },
      { id: 8, name: 'Ana Sánchez', email: 'ana@correo.com', phone: '555-1357', profile: 'Usuario', department: 'Logística', tower: 'A' },
      { id: 9, name: 'Miguel Castro', email: 'miguel@correo.com', phone: '555-9753', profile: 'Usuario', department: 'Compras', tower: 'B' },
      { id: 10, name: 'Luisa Ortega', email: 'luisa@correo.com', phone: '555-8642', profile: 'Admin', department: 'RRHH', tower: 'C' },
      { id: 11, name: 'Esteban Morales', email: 'esteban@correo.com', phone: '555-1111', profile: 'Usuario', department: 'Ventas', tower: 'A' },
      { id: 12, name: 'Camila Ruiz', email: 'camila@correo.com', phone: '555-2222', profile: 'Admin', department: 'Marketing', tower: 'B' },
      { id: 13, name: 'Pablo Fernández', email: 'pablo@correo.com', phone: '555-3333', profile: 'Usuario', department: 'Soporte', tower: 'C' },
    ];
  };
  
  export const getMultasData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/obtener_multas`);
      if (!response.ok) {
        throw new Error('No se pudo obtener las multas');
      }
      const data = await response.json();
  
      // Verificar si data es un arreglo antes de hacer el map
      if (Array.isArray(data)) {
        return data.map((multa, index) => ({
          id: index + 1,
          usuario: multa.usuario,
          nombreCompleto: multa.nombreCompleto,
          departamento: multa.departamento,
          torre: multa.torre,
          multa: multa.multa,
          descripcion: multa.descripcion,
          fechamulta: multa.fechamulta,

        }));
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
  
  
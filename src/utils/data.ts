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
  
  export const getMultasData = () => {
    return [
      { id: 1, usuario: 'Juan Pérez', nombreCompleto: 'Juan Pérez', departamento: 'HR', torre: 'A', multa: '$50 por acceso no autorizado' },
      { id: 2, usuario: 'Ana Gómez', nombreCompleto: 'Ana Gómez', departamento: 'IT', torre: 'B', multa: '$30 por estacionamiento indebido' },
      { id: 3, usuario: 'Luis García', nombreCompleto: 'Luis García', departamento: 'Marketing', torre: 'C', multa: '$100 por uso indebido de recursos' },
      { id: 4, usuario: 'Carla Torres', nombreCompleto: 'Carla Torres', departamento: 'Finanzas', torre: 'A', multa: '$20 por retraso en reportes' },
      { id: 5, usuario: 'Miguel Sánchez', nombreCompleto: 'Miguel Sánchez', departamento: 'Ventas', torre: 'B', multa: '$75 por incumplimiento de normas' },
      { id: 6, usuario: 'Sofía Ramírez', nombreCompleto: 'Sofía Ramírez', departamento: 'Legal', torre: 'C', multa: '$15 por pérdida de material' },
      { id: 7, usuario: 'Pablo Ortega', nombreCompleto: 'Pablo Ortega', departamento: 'Operaciones', torre: 'A', multa: '$40 por incumplimiento de horarios' },
      { id: 8, usuario: 'Camila Fernández', nombreCompleto: 'Camila Fernández', departamento: 'Logística', torre: 'B', multa: '$55 por violación de políticas' },
      { id: 9, usuario: 'José Ruiz', nombreCompleto: 'José Ruiz', departamento: 'Marketing', torre: 'C', multa: '$60 por uso indebido de espacios' },
      { id: 10, usuario: 'Daniela López', nombreCompleto: 'Daniela López', departamento: 'Compras', torre: 'A', multa: '$25 por documentos extraviados' },
      { id: 11, usuario: 'Raúl Torres', nombreCompleto: 'Raúl Torres', departamento: 'Finanzas', torre: 'B', multa: '$45 por mal uso de recursos' },
      { id: 12, usuario: 'Lucía Sánchez', nombreCompleto: 'Lucía Sánchez', departamento: 'Ventas', torre: 'C', multa: '$80 por falta de inventario' },
      { id: 13, usuario: 'Tomás Méndez', nombreCompleto: 'Tomás Méndez', departamento: 'RRHH', torre: 'A', multa: '$10 por retraso en pagos' },
    ];
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
  
  
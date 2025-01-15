import React, { useState } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../utils/admin/modal.perm.ad'; // Modal reutilizado para permisos
import { PencilSquareIcon,TrashIcon } from '@heroicons/react/24/outline';

const Permisos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const permisosPerPage = 6; // Total de permisos por página
  const [permisos, setPermisos] = useState([
    { id: 1, usuario: 'Juan Pérez', nombreCompleto: 'Juan Pérez', departamento: 'Ventas', torre: 'A', permisos: 2 },
    { id: 2, usuario: 'María López', nombreCompleto: 'María López', departamento: 'Soporte', torre: 'B', permisos: 1 },
    { id: 3, usuario: 'Carlos García', nombreCompleto: 'Carlos García', departamento: 'Marketing', torre: 'C', permisos: 3 },
    { id: 4, usuario: 'Ana Torres', nombreCompleto: 'Ana Torres', departamento: 'Recursos Humanos', torre: 'D', permisos: 0 },
    { id: 5, usuario: 'Luis Martínez', nombreCompleto: 'Luis Martínez', departamento: 'Logística', torre: 'E', permisos: 5 },
    { id: 6, usuario: 'Sofía Ramírez', nombreCompleto: 'Sofía Ramírez', departamento: 'Finanzas', torre: 'F', permisos: 2 },
    { id: 7, usuario: 'Miguel Gómez', nombreCompleto: 'Miguel Gómez', departamento: 'Operaciones', torre: 'G', permisos: 1 },
    { id: 8, usuario: 'Clara Díaz', nombreCompleto: 'Clara Díaz', departamento: 'IT', torre: 'H', permisos: 0 },
    { id: 9, usuario: 'José Morales', nombreCompleto: 'José Morales', departamento: 'Ventas', torre: 'A', permisos: 4 },
    { id: 10, usuario: 'Elena Sánchez', nombreCompleto: 'Elena Sánchez', departamento: 'Soporte', torre: 'B', permisos: 2 },
    { id: 11, usuario: 'Raúl Herrera', nombreCompleto: 'Raúl Herrera', departamento: 'Marketing', torre: 'C', permisos: 3 },
    { id: 12, usuario: 'Valeria Cruz', nombreCompleto: 'Valeria Cruz', departamento: 'Proyectos', torre: 'D', permisos: 0 },
    { id: 13, usuario: 'Diego Flores', nombreCompleto: 'Diego Flores', departamento: 'Innovación', torre: 'E', permisos: 1 },
  ]);

  const [newPermiso, setNewPermiso] = useState({ usuario: '', nombreCompleto: '', departamento: '', torre: '', permisos: 0 });
  const [editMode, setEditMode] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPermisos = permisos.filter(permiso =>
    permiso.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permiso.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPermiso = currentPage * permisosPerPage;
  const indexOfFirstPermiso = indexOfLastPermiso - permisosPerPage;
  const currentPermisos = filteredPermisos.slice(indexOfFirstPermiso, indexOfLastPermiso);

  const handleOpenModal = (permiso?: any) => {
    if (permiso) {
      setNewPermiso(permiso);
      setEditMode(true);
    } else {
      setNewPermiso({ usuario: '', nombreCompleto: '', departamento: '', torre: '', permisos: 0 });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSavePermiso = (updatedPermiso: any) => {
    if (editMode) {
      // Actualiza el permiso existente
      setPermisos(permisos.map(permiso => (permiso.id === updatedPermiso.id ? updatedPermiso : permiso)));
    } else {
      // Agrega un nuevo permiso
      const newId = permisos.length + 1;
      const newPermisoData = { id: newId, ...updatedPermiso };
      setPermisos([...permisos, newPermisoData]);
    }
    setNewPermiso({ usuario: '', nombreCompleto: '', departamento: '', torre: '', permisos: 0 });
    setShowModal(false);
  };

  const handleDeletePermiso = (permisoId: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este permiso?');
    if (confirmDelete) {
      setPermisos(permisos.filter(permiso => permiso.id !== permisoId));
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar />

        <div className="flex-grow p-10">
          <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Permisos de los Portones</h2>
              <button
                onClick={() => handleOpenModal()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-all"
              >
                Registrar Permiso
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar permiso..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Usuario</th>
                  <th className="px-6 py-4 text-left">Nombre Completo</th>
                  <th className="px-6 py-4 text-left">Departamento</th>
                  <th className="px-6 py-4 text-left">Torre</th>
                  <th className="px-6 py-4 text-left">Permisos</th>
                  <th className="px-6 py-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentPermisos.length > 0 ? (
                  currentPermisos.map(permiso => (
                    <tr key={permiso.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{permiso.id}</td>
                      <td className="px-6 py-4">{permiso.usuario}</td>
                      <td className="px-6 py-4">{permiso.nombreCompleto}</td>
                      <td className="px-6 py-4">{permiso.departamento}</td>
                      <td className="px-6 py-4">{permiso.torre}</td>
                      <td className="px-6 py-4">{permiso.permisos}</td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button onClick={() => handleOpenModal(permiso)} className="text-blue-500 hover:text-blue-700">
                          <PencilSquareIcon className='w-5 h-5' />
                        </button>
                        <button onClick={() => handleDeletePermiso(permiso.id)} className="text-red-500 hover:text-red-700">
                          <TrashIcon className='w-5 h-5' />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No se encontraron permisos</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-center items-center mt-8 space-x-6">
              {/* Botón Anterior */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md transition duration-300
                  ${currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `}
              >
                Anterior
              </button>

              {/* Número de Página Actual */}
              <span className="text-sm font-medium text-gray-600">
                Página {currentPage}
              </span>

              {/* Botón Siguiente */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredPermisos.length / permisosPerPage)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md transition duration-300
                  ${currentPage === Math.ceil(filteredPermisos.length / permisosPerPage)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `}
              >
                Siguiente
              </button>
            </div>

          </div>
        </div>
      </div>

      <Modal
        showModal={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSavePermiso}
        newPermiso={newPermiso}
        onInputChange={(e) => {
          const { name, value } = e.target;
          setNewPermiso({ ...newPermiso, [name]: value });
        }}
      />
    </>
  );
};

export default Permisos;

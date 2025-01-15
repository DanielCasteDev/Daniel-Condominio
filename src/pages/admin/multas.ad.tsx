import React, { useState } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../utils/admin/modal.multa.ad'; // Modal reutilizado
import { PencilSquareIcon,TrashIcon } from '@heroicons/react/24/outline';

const Multas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const multasPerPage = 6; // Total de multas por página
  const [multas, setMultas] = useState([
    { id: 1, usuario: 'Juan Pérez', nombreCompleto: 'Juan Pérez', departamento: 'Ventas', torre: 'A', multas: 2 },
    { id: 2, usuario: 'María López', nombreCompleto: 'María López', departamento: 'Soporte', torre: 'B', multas: 1 },
    { id: 3, usuario: 'Carlos García', nombreCompleto: 'Carlos García', departamento: 'Marketing', torre: 'C', multas: 3 },
    { id: 4, usuario: 'Ana Torres', nombreCompleto: 'Ana Torres', departamento: 'Recursos Humanos', torre: 'D', multas: 0 },
    { id: 5, usuario: 'Luis Martínez', nombreCompleto: 'Luis Martínez', departamento: 'Logística', torre: 'E', multas: 5 },
    { id: 6, usuario: 'Sofía Ramírez', nombreCompleto: 'Sofía Ramírez', departamento: 'Finanzas', torre: 'F', multas: 2 },
    { id: 7, usuario: 'Miguel Gómez', nombreCompleto: 'Miguel Gómez', departamento: 'Operaciones', torre: 'G', multas: 1 },
    { id: 8, usuario: 'Clara Díaz', nombreCompleto: 'Clara Díaz', departamento: 'IT', torre: 'H', multas: 0 },
    { id: 9, usuario: 'José Morales', nombreCompleto: 'José Morales', departamento: 'Ventas', torre: 'A', multas: 4 },
    { id: 10, usuario: 'Elena Sánchez', nombreCompleto: 'Elena Sánchez', departamento: 'Soporte', torre: 'B', multas: 2 },
    { id: 11, usuario: 'Raúl Herrera', nombreCompleto: 'Raúl Herrera', departamento: 'Marketing', torre: 'C', multas: 3 },
    { id: 12, usuario: 'Valeria Cruz', nombreCompleto: 'Valeria Cruz', departamento: 'Proyectos', torre: 'D', multas: 0 },
    { id: 13, usuario: 'Diego Flores', nombreCompleto: 'Diego Flores', departamento: 'Innovación', torre: 'E', multas: 1 },
  ]);

  const [newMulta, setNewMulta] = useState({ usuario: '', nombreCompleto: '', departamento: '', torre: '', multas: 0 });
  const [editMode, setEditMode] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredMultas = multas.filter(multa =>
    multa.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    multa.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMulta = currentPage * multasPerPage;
  const indexOfFirstMulta = indexOfLastMulta - multasPerPage;
  const currentMultas = filteredMultas.slice(indexOfFirstMulta, indexOfLastMulta);

  const handleOpenModal = (multa?: any) => {
    if (multa) {
      setNewMulta(multa);
      setEditMode(true);
    } else {
      setNewMulta({ usuario: '', nombreCompleto: '', departamento: '', torre: '', multas: 0 });
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

  const handleSaveMulta = (updatedMulta: any) => {
    if (editMode) {
      // Actualiza la multa existente
      setMultas(multas.map(multa => (multa.id === updatedMulta.id ? updatedMulta : multa)));
    } else {
      // Agrega una nueva multa
      const newId = multas.length + 1;
      const newMultaData = { id: newId, ...updatedMulta };
      setMultas([...multas, newMultaData]);
    }
    setNewMulta({ usuario: '', nombreCompleto: '', departamento: '', torre: '', multas: 0 });
    setShowModal(false);
  };

  const handleDeleteMulta = (multaId: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta multa?');
    if (confirmDelete) {
      setMultas(multas.filter(multa => multa.id !== multaId));
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar />

        <div className="flex-grow p-10">
          <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Multas Registradas</h2>
              <button
                onClick={() => handleOpenModal()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-all"
              >
                Registrar Multa
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar multa..."
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
                  <th className="px-6 py-4 text-left">Multas</th>
                  <th className="px-6 py-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentMultas.length > 0 ? (
                  currentMultas.map(multa => (
                    <tr key={multa.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{multa.id}</td>
                      <td className="px-6 py-4">{multa.usuario}</td>
                      <td className="px-6 py-4">{multa.nombreCompleto}</td>
                      <td className="px-6 py-4">{multa.departamento}</td>
                      <td className="px-6 py-4">{multa.torre}</td>
                      <td className="px-6 py-4">{multa.multas}</td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button onClick={() => handleOpenModal(multa)} className="text-blue-500 hover:text-blue-700">
                          <PencilSquareIcon className='w-5 h-5' />
                        </button>
                        <button onClick={() => handleDeleteMulta(multa.id)} className="text-red-500 hover:text-red-700">
                        <TrashIcon className='w-5 h-5' />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No se encontraron multas</td>
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
                disabled={currentPage === Math.ceil(filteredMultas.length / multasPerPage)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md transition duration-300
                  ${currentPage === Math.ceil(filteredMultas.length / multasPerPage)
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
        onSubmit={handleSaveMulta}
        newMulta={newMulta}  // Cambiado de newUser a newMulta
        onInputChange={(e) => {
          const { name, value } = e.target;
          setNewMulta({ ...newMulta, [name]: value });
        }}
      />
    </>
  );
};

export default Multas;

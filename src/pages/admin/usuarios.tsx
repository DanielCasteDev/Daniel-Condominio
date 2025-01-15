import React, { useState } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../utils/admin/modal.usr.ad'; // Importa el componente Modal
import { PencilSquareIcon,TrashIcon } from '@heroicons/react/24/outline';


const Usuarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@correo.com', phone: '555-1234', profile: 'Admin', department: 'Ventas', tower: 'A' },
    { id: 2, name: 'María López', email: 'maria@correo.com', phone: '555-5678', profile: 'Usuario', department: 'Soporte', tower: 'B' },
    { id: 3, name: 'Carlos García', email: 'carlos@correo.com', phone: '555-9876', profile: 'Admin', department: 'Marketing', tower: 'C' },
    { id: 4, name: 'Ana Torres', email: 'ana@correo.com', phone: '555-4321', profile: 'Usuario', department: 'Recursos Humanos', tower: 'D' },
    { id: 5, name: 'Luis Martínez', email: 'luis@correo.com', phone: '555-8765', profile: 'Usuario', department: 'Logística', tower: 'E' },
    { id: 6, name: 'Sofía Ramírez', email: 'sofia@correo.com', phone: '555-1357', profile: 'Admin', department: 'Finanzas', tower: 'F' },
    { id: 7, name: 'Miguel Gómez', email: 'miguel@correo.com', phone: '555-2468', profile: 'Usuario', department: 'Operaciones', tower: 'G' },
    { id: 8, name: 'Clara Díaz', email: 'clara@correo.com', phone: '555-9753', profile: 'Admin', department: 'IT', tower: 'H' },
    { id: 9, name: 'José Morales', email: 'jose@correo.com', phone: '555-8642', profile: 'Usuario', department: 'Ventas', tower: 'A' },
    { id: 10, name: 'Elena Sánchez', email: 'elena@correo.com', phone: '555-7531', profile: 'Usuario', department: 'Soporte', tower: 'B' },
    { id: 11, name: 'Raúl Herrera', email: 'raul@correo.com', phone: '555-3210', profile: 'Usuario', department: 'Marketing', tower: 'C' },
    { id: 12, name: 'Valeria Cruz', email: 'valeria@correo.com', phone: '555-9087', profile: 'Admin', department: 'Proyectos', tower: 'D' },
    { id: 13, name: 'Diego Flores', email: 'diego@correo.com', phone: '555-1122', profile: 'Usuario', department: 'Innovación', tower: 'E' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', profile: '', department: '', tower: '' });
  const [editMode, setEditMode] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleOpenModal = (user?: any) => {
    if (user) {
      setNewUser(user);
      setEditMode(true);
    } else {
      setNewUser({ name: '', email: '', phone: '', profile: '', department: '', tower: '' });
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

  const handleSaveUser = (updatedUser: any) => {
    if (editMode) {
      // Actualiza el usuario existente
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    } else {
      // Agrega un nuevo usuario
      const newId = users.length + 1;
      const newUserData = { id: newId, ...updatedUser };
      setUsers([...users, newUserData]);
    }
    setNewUser({ name: '', email: '', phone: '', profile: '', department: '', tower: '' });
    setShowModal(false);
  };
  
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setNewUser({ ...newUser, [name]: value });
};

const handleDeleteUser = (userId: number) => {
  const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
  if (confirmDelete) {
    setUsers(users.filter(user => user.id !== userId));
  }
};

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar />

        <div className="flex-grow p-10">
          <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Usuarios Registrados</h2>
              <button
                onClick={() => handleOpenModal()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-all"
              >
                Registrar Usuario
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Nombre Completo</th>
                  <th className="px-6 py-4 text-left">Número Celular</th>
                  <th className="px-6 py-4 text-left">Perfil</th>
                  <th className="px-6 py-4 text-left">Departamento</th>
                  <th className="px-6 py-4 text-left">Torre</th>
                  <th className="px-6 py-4 text-left">Correo Electrónico</th>
                  <th className="px-6 py-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentUsers.length > 0 ? (
                  currentUsers.map(user => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{user.id}</td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">{user.profile}</td>
                      <td className="px-6 py-4">{user.department}</td>
                      <td className="px-6 py-4">{user.tower}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button onClick={() => handleOpenModal(user)} className="text-blue-500 hover:text-blue-700">
                          <PencilSquareIcon className='w-5 h-5' />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700">
                          <TrashIcon className='w-5 h-5' />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">No se encontraron usuarios</td>
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
    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
    className={`
      px-4 py-2 text-sm font-medium rounded-md transition duration-300
      ${currentPage === Math.ceil(filteredUsers.length / usersPerPage)
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
        onSubmit={handleSaveUser}
        newUser={newUser}
        onInputChange={handleInputChange}
      />
    </>
  );
};

export default Usuarios;

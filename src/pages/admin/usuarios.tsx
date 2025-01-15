import React, { useState } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../utils/admin/modal.usr.ad';  // Importa el componente Modal

const Usuarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@correo.com', phone: '555-1234', profile: 'Admin', department: 'Ventas', tower: 'A' },
    { id: 2, name: 'María López', email: 'maria@correo.com', phone: '555-5678', profile: 'Usuario', department: 'Soporte', tower: 'B' },
    { id: 3, name: 'Carlos García', email: 'carlos@correo.com', phone: '555-9876', profile: 'Admin', department: 'Marketing', tower: 'C' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', profile: '', department: '', tower: '' });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddUser = (newUser: any) => {
    if (newUser.name && newUser.email) {
      const newId = users.length + 1;
      const newUserData = { id: newId, ...newUser };
      setUsers([...users, newUserData]);
      setNewUser({ name: '', email: '', phone: '', profile: '', department: '', tower: '' });
      handleCloseModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar /> {/* Sidebar con Navbar */}

        <div className="flex-grow p-10">
          <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Usuarios Registrados</h2>
              <button
                onClick={handleOpenModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-all"
              >
                Registrar Usuario
              </button>
            </div>

            {/* Buscador */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Tabla de usuarios */}
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
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{user.id}</td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">{user.profile}</td>
                      <td className="px-6 py-4">{user.department}</td>
                      <td className="px-6 py-4">{user.tower}</td>
                      <td className="px-6 py-4">{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No se encontraron usuarios</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de registro de usuario */}
      <Modal
        showModal={showModal}
        onClose={handleCloseModal}
        onSubmit={handleAddUser}
        newUser={newUser}
        onInputChange={handleInputChange}
      />
    </>
  );
};

export default Usuarios;

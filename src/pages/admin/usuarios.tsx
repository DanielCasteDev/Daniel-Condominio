import React, { useState } from 'react';
import Navbar from '../../components/navbar';

const Usuarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@correo.com' },
    { id: 2, name: 'María López', email: 'maria@correo.com' },
    { id: 3, name: 'Carlos García', email: 'carlos@correo.com' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

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

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const newId = users.length + 1;
      const newUserData = { id: newId, name: newUser.name, email: newUser.email };
      setUsers([...users, newUserData]);
      setNewUser({ name: '', email: '' });
      handleCloseModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Navbar /> {/* Sidebar con Navbar */}

        <div className="flex-grow p-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-900">Bienvenido al Panel de Usuarios</h1>
            <p className="mt-4 text-lg text-gray-600">
              Aquí puedes gestionar los usuarios registrados en la plataforma.
            </p>
          </div>

          {/* Tabla de usuarios */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Usuarios Registrados</h2>
              <button
                onClick={handleOpenModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Registrar Nuevo Usuario
              </button>
            </div>

            {/* Buscador */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Tabla de usuarios */}
            <table className="mt-4 w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Correo Electrónico</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 text-center text-gray-500">No se encontraron usuarios</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de registro de usuario */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Registrar Nuevo Usuario</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Usuarios;

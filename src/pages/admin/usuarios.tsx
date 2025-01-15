import React, { useState } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { getUsuariosData } from '../../utils/data'; // Importar la función que obtiene los datos

const Usuarios: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const usuariosData = getUsuariosData();  // Obtenemos los datos de usuarios

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId: number) => {
    alert(`Usuario con ID ${userId} eliminado`);
    // Aquí puedes manejar la eliminación en el servidor o estado global
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Correo', accessor: 'email' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Perfil', accessor: 'profile' },
    { header: 'Departamento', accessor: 'department' },
    { header: 'Torre', accessor: 'tower' },
  ];

  // Definir los campos para el modal de usuario
  const fields = [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'email', label: 'Correo Electrónico', type: 'email' },
    { name: 'phone', label: 'Número Celular', type: 'text' },
    { name: 'profile', label: 'Perfil', type: 'select' },
    { name: 'department', label: 'Departamento', type: 'text' },
    { name: 'tower', label: 'Torre', type: 'text' },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar />

        <div className="flex-grow p-10">
          <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Usuarios Registrados</h2>
              <button
                onClick={() => {
                  setSelectedUser(null);  // Para crear un nuevo usuario
                  setShowModal(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Registrar Usuario
              </button>
            </div>

            {/* Pasa los usuarios directamente como datos a la tabla */}
            <Table
              columns={columns}
              data={usuariosData}  // Aquí pasas los datos a Table
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          formData={selectedUser || {}}  // Si no es un usuario seleccionado, pasamos un objeto vacío
          onSubmit={(user) => {
            console.log('Usuario guardado:', user);
            // Aquí agregarías la lógica para guardar el usuario
          }}
          onInputChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setSelectedUser((prevUser: any) => ({
              ...prevUser,
              [name]: value,
            }));
          }}
          fields={fields}
        />
      )}
    </>
  );
};

export default Usuarios;

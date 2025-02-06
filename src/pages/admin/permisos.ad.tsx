import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { getPermisosData } from '../../utils/data';
import NavbarSuperior from '../../components/navbar.superior';

const Permisos: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPermiso, setSelectedPermiso] = useState<any | null>(null);
  const [permisosData, setPermisosData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPermisosData();
      setPermisosData(data);
    };

    fetchData();
  }, []);

  const handleNewPermiso = () => {
    setSelectedPermiso(null);
    setShowModal(true);
  };

  const handleEditPermiso = (permiso: any) => {
    setSelectedPermiso(permiso);
    setShowModal(true);
  };

  const handleDeletePermiso = (permisoId: number) => {
    alert(`Permiso con ID ${permisoId} eliminado`);
  };

  const handleSavePermiso = async (data: any) => {
    // Simula una operación asíncrona, como una llamada a una API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Datos enviados:', data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedPermiso((prevPermiso: any) => ({ ...prevPermiso, [name]: value }));
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Usuario', accessor: 'usuario' },
    { header: 'Nombre Completo', accessor: 'nombreCompleto' },
    { header: 'Departamento', accessor: 'departamento' },
    { header: 'Torre', accessor: 'torre' },
    { header: 'Permisos', accessor: 'permisos' },
  ];

  const fields = [
    { name: 'usuario', label: 'Usuario', type: 'text' },
    { name: 'nombreCompleto', label: 'Nombre Completo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'torre', label: 'Torre', type: 'text' },
    { name: 'permisos', label: 'Permisos', type: 'text' },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Navbar lateral */}
        <Navbar />
  
        <div className="flex flex-col flex-grow">
          {/* Navbar superior */}
          <NavbarSuperior />
  
          <div className="flex-grow p-10">
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-green-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Permisos de los Portones</h2>
                <button
                  onClick={handleNewPermiso}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Registrar Permiso
                </button>
              </div>
  
              <Table
                columns={columns}
                data={permisosData}
                onEdit={handleEditPermiso}
                onDelete={handleDeletePermiso}
              />
            </div>
          </div>
        </div>
      </div>
  
      {showModal && (
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          formData={selectedPermiso}
          onSubmit={handleSavePermiso}
          onInputChange={handleInputChange}
          fields={fields}
          title={selectedPermiso?.id ? "Editar Permiso" : "Registrar Permiso"}

        />
      )}
    </>
  );
  
};

export default Permisos;

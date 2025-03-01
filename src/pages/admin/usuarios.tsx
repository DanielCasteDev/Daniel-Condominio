import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { saveUsuario } from '../../utils/user';
import { getUsuariosData } from '../../utils/data';
import { toast } from 'sonner';
import NavbarSuperior from '../../components/navbar.superior';

const Usuarios: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<any | null>(null);
  const [usuariosData, setUsuariosData] = useState<any[]>([]);

  // Configuración de campos para el modal
  const fields = [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'email', label: 'Correo Electrónico', type: 'email' },
    { name: 'phone', label: 'Número Celular', type: 'text' },
    {
      name: 'profile',
      label: 'Perfil',
      type: 'select',
      options: [
        { value: 'dueño', label: 'Dueño' },
        { value: 'inquilino', label: 'Inquilino' },
        { value: 'administracion', label: 'Administración' },
      ],
    },
    { name: 'department', label: 'Departamento', type: 'text' },
    { name: 'tower', label: 'Torre', type: 'text' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsuariosData();
        setUsuariosData(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
    fetchData();
  }, []);

  const handleNewUsuario = () => {
    setSelectedUsuario(null); // Limpiar selección
    setShowModal(true);
  };

  const handleEditUsuario = (usuario: any) => {
    setSelectedUsuario(usuario);
    setShowModal(true);
  };

  const handleDeleteUsuario = (usuarioId: number) => {
    alert(`Usuario con ID ${usuarioId} eliminado`);
    // Aquí puedes manejar la lógica de eliminación si es necesario
  };

  const handleSaveUsuario = async (formData: any) => {
    try {
      // Eliminar el campo 'id' si existe, ya que MongoDB lo maneja automáticamente
      const { id, ...usuarioData } = formData;
  
      // Verificar y agregar la lada +52 si no está presente
      if (usuarioData.phone && !usuarioData.phone.startsWith('+52')) {
        usuarioData.phone = `+52${usuarioData.phone}`;
      }
  
      console.log("Guardando usuario:", usuarioData); // Verifica los datos sin el id
  
      await saveUsuario(usuarioData); // Asegúrate de enviar solo los campos necesarios
      const updatedData = await getUsuariosData();
      setUsuariosData(updatedData);
      setShowModal(false);
      toast.success('¡Usuario registrado correctamente!');
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      toast.error('Hubo un problema al guardar el usuario.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedUsuario((prevUsuario: any) => ({ ...prevUsuario, [name]: value }));
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

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Navbar lateral */}
        <Navbar />

        <div className="flex flex-col flex-grow">
          {/* Navbar superior */}
          <NavbarSuperior />

          <div className="flex-grow p-10">
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Usuarios Registrados</h2>
                <button
                  onClick={handleNewUsuario}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Registrar Usuario
                </button>
              </div>

              <Table
                columns={columns}
                data={usuariosData}
                onEdit={handleEditUsuario}
                onDelete={handleDeleteUsuario}
                showHistoryButton={false} // Ocultar el botón de historial
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          formData={selectedUsuario}
          onSubmit={handleSaveUsuario}
          onInputChange={handleInputChange}
          fields={fields} // Campos específicos para usuarios
          title={selectedUsuario?.id ? "Editar Usuario" : "Registrar Usuario"}
        />
      )}
    </>
  );
};

export default Usuarios;
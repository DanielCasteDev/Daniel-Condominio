import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { getMultasData } from '../../utils/data';
import {saveMulta} from '../../utils/multas';
import { toast } from 'sonner';
import NavbarSuperior from '../../components/navbar.superior';

const Multas: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMulta, setSelectedMulta] = useState<any | null>(null);
  const [multasData, setMultasData] = useState<any[]>([]);

  const fields = [
    { name: 'descripcion', label: 'Descripción', type: 'text' },
    { name: 'fechamulta', label: 'Fecha', type: 'date' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'multa', label: 'Multa', type: 'text' },  // Campo para la multa
  ];
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultasData();
      setMultasData(data);
    };
    fetchData();
  }, []);

  const handleNewMulta = () => {
    setSelectedMulta(null); // Limpiar selección
    setShowModal(true);
  };

  const handleEditMulta = (multa: any) => {
    setSelectedMulta(multa);
    setShowModal(true);
  };

  const handleDeleteMulta = (multaId: number) => {
    alert(`Multa con ID ${multaId} eliminada`);
  };
  const handleSaveMulta = async (formData: any) => {
    try {
      await saveMulta(formData); // Llamada para guardar la multa, con todos los campos incluidos (descripcion, fechamulta, departamento, multa)
      
      // Obtener los datos actualizados después de guardar la nueva multa
      const updatedData = await getMultasData();
      setMultasData(updatedData); // Actualizar los datos de las multas en el estado
      
      setShowModal(false); // Cierra el modal después de guardar la multa
      
      toast.success('¡Multa registrada correctamente!'); // Mostrar notificación de éxito
    } catch (error) {
      console.error('Error al guardar la multa:', error);
      toast.error('Hubo un problema al guardar la multa. Por favor, inténtalo de nuevo.'); // Notificación de error
    }
  };
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedMulta((prevMulta: any) => ({ ...prevMulta, [name]: value }));
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Usuario', accessor: 'usuario' }, // Accede directamente al campo usuario (nombre)
    { header: 'Departamento', accessor: 'departamento' },
    { header: 'Torre', accessor: 'torre' },
    { header: 'Multa', accessor: 'multa' },
    { header: 'Descripcion', accessor: 'descripcion' },
    { header: 'Fecha', accessor: 'fechamulta' },
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
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-red-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Multas de los Portones</h2>
                <button
                  onClick={handleNewMulta}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Registrar Multa
                </button>
              </div>

              <Table
                columns={columns}
                data={multasData}
                onEdit={handleEditMulta}
                onDelete={handleDeleteMulta}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          formData={selectedMulta}
          onSubmit={handleSaveMulta}
          onInputChange={handleInputChange}
          fields={fields} // Campos específicos para multas
        />
      )}
    </>
  );
};

export default Multas;

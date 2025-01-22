import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { getMultasData } from '../../utils/data';
import {saveMulta} from '../../utils/multas';
import { toast } from 'sonner';

const Multas: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMulta, setSelectedMulta] = useState<any | null>(null);
  const [multasData, setMultasData] = useState<any[]>([]);

  // Configuración de campos para el modal
  const fields = [
    { name: 'usuario', label: 'Usuario', type: 'text' },
    { name: 'nombreCompleto', label: 'Nombre Completo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'torre', label: 'Torre', type: 'text' },
    { name: 'multa', label: 'Multa', type: 'number' },
    { name: 'descripcion', label: 'Descripcion', type: 'text' },
    { name: 'fechamulta', label: 'Fecha', type: 'date' },

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
      await saveMulta(formData); // Guarda la multa en la base de datos
      const updatedData = await getMultasData(); // Obtiene los datos actualizados
      setMultasData(updatedData);
      setShowModal(false); // Cierra el modal
      
      // Mostrar mensaje de éxito
      toast.success('¡Multa registrada correctamente!');
    } catch (error) {
      console.error('Error al guardar la multa:', error);
  
      // Mostrar mensaje de error
      toast.error('Hubo un problema al guardar la multa. Por favor, inténtalo de nuevo.');
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedMulta((prevMulta: any) => ({ ...prevMulta, [name]: value }));
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Usuario', accessor: 'usuario' },
    { header: 'Nombre Completo', accessor: 'nombreCompleto' },
    { header: 'Departamento', accessor: 'departamento' },
    { header: 'Torre', accessor: 'torre' },
    { header: 'Multa', accessor: 'multa' },
    { header: 'Descripcion', accessor: 'descripcion' },
    { header: 'Fecha', accessor: 'fechamulta' },

  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Navbar />

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

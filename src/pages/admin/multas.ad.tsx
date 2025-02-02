import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { getMultasData, getHistorialMultas } from '../../utils/data'; // Importar la función para obtener el historial
import { saveMulta } from '../../utils/multas';
import { toast } from 'sonner';
import NavbarSuperior from '../../components/navbar.superior';
import HistorialModal from '../../components/HistorialModal'; // Importar el nuevo componente

const Multas: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMulta, setSelectedMulta] = useState<any | null>(null);
  const [multasData, setMultasData] = useState<any[]>([]);
  const [historialData, setHistorialData] = useState<any[]>([]); // Estado para almacenar el historial
  const [showHistorialModal, setShowHistorialModal] = useState(false); // Estado para mostrar el modal de historial
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>(''); // Estado para almacenar el departamento seleccionado

  const fields = [
    { name: 'descripcion', label: 'Descripción', type: 'text' },
    { name: 'fechamulta', label: 'Fecha', type: 'date' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'multa', label: 'Multa', type: 'text' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultasData();
      setMultasData(data);
    };
    fetchData();
  }, []);

  const handleNewMulta = () => {
    setSelectedMulta(null);
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
      await saveMulta(formData);
      const updatedData = await getMultasData();
      setMultasData(updatedData);
      setShowModal(false);
      toast.success('¡Multa registrada correctamente!');
    } catch (error) {
      console.error('Error al guardar la multa:', error);
      toast.error('Hubo un problema al guardar la multa. Por favor, inténtalo de nuevo.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedMulta((prevMulta: any) => ({ ...prevMulta, [name]: value }));
  };

  // Función para manejar la visualización del historial
  const handleViewHistory = async (departamento: string) => {
    try {
      const historial = await getHistorialMultas(departamento); // Obtener el historial del departamento
      setHistorialData(historial); // Guardar el historial en el estado
      setSelectedDepartamento(departamento); // Guardar el departamento seleccionado
      setShowHistorialModal(true); // Mostrar el modal de historial
    } catch (error) {
      console.error('Error al obtener el historial:', error);
      toast.error('Hubo un problema al obtener el historial. Por favor, inténtalo de nuevo.');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Usuario', accessor: 'usuario' },
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
        <div className="flex flex-col flex-grow">
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
                onViewHistory={handleViewHistory} 
                showHistoryButton={true} // Ocultar el botón de historial
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
          fields={fields}
        />
      )}

      {/* Usar el componente HistorialModal */}
      <HistorialModal
        showModal={showHistorialModal}
        onClose={() => setShowHistorialModal(false)}
        historialData={historialData}
        departamento={selectedDepartamento}
      />
    </>
  );
};

export default Multas;
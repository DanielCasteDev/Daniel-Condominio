import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar.ad';
import Modal from '../../components/modal';
import Table from '../../components/table';
import { getPagosData } from '../../utils/data'; // Aquí modificamos la función para obtener datos de pagos.
import NavbarSuperior from '../../components/navbar.superior';

const Pagos: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPago, setSelectedPago] = useState<any | null>(null);
  const [pagosData, setPagosData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPagosData(); // Cambiamos para obtener datos de pagos.
      setPagosData(data);
    };

    fetchData();
  }, []);

  const handleNewPago = () => {
    setSelectedPago(null);
    setShowModal(true);
  };

  const handleEditPago = (pago: any) => {
    setSelectedPago(pago);
    setShowModal(true);
  };

  const handleDeletePago = (pagoId: number) => {
    alert(`Pago con ID ${pagoId} eliminado`);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedPago((prevPago: any) => ({ ...prevPago, [name]: value }));
  };

  const handleSavePago = async (data: any) => {
    // Simula una operación asíncrona, como una llamada a una API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Datos enviados:', data);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Usuario', accessor: 'usuario' },
    { header: 'Nombre Completo', accessor: 'nombreCompleto' },
    { header: 'Monto', accessor: 'monto' }, // Campo para monto
    { header: 'Fecha de Pago', accessor: 'fechaPago' }, // Campo para fecha de pago
    { header: 'Estado de Pago', accessor: 'estadoPago' }, // Agregado

    { header: 'Método de Pago', accessor: 'metodoPago' }, // Campo para método de pago
  ];

  const fields = [
    { name: 'usuario', label: 'Usuario', type: 'text' },
    { name: 'nombreCompleto', label: 'Nombre Completo', type: 'text' },
    { name: 'monto', label: 'Monto', type: 'number' }, // Campo para monto
    { name: 'fechaPago', label: 'Fecha de Pago', type: 'date' }, // Campo para fecha de pago
    { name: 'estadoPago', label: 'Estado de Pago', type: 'text' }, // Agregado

    { name: 'metodoPago', label: 'Método de Pago', type: 'text' }, // Campo para método de pago
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
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-yellow-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Pagos Realizados</h2>
                <button
                  onClick={handleNewPago}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Registrar Pago
                </button>
              </div>
  
              <Table
                columns={columns}
                data={pagosData}
                onEdit={handleEditPago}
                onDelete={handleDeletePago}
              />
            </div>
          </div>
        </div>
      </div>
  
      {showModal && (
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          formData={selectedPago}
          onSubmit={handleSavePago}
          onInputChange={handleInputChange}
          fields={fields}
        />
      )}
    </>
  );
  
};

export default Pagos;

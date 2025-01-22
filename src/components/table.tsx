import React, { useState } from 'react';
import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

const ITEMS_PER_PAGE = 8;

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const filteredData = data.filter(
    (item) =>
      item.id.toString().includes(searchQuery) ||
      item.nombreCompleto?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Agregar el filtro por `name`
  );
  
  

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getEstadoPagoClass = (estadoPago: string) => {
    const baseClass = "px-4 py-2 text-center w-32 truncate border"; // Ancho fijo
    if (estadoPago === "Pendiente") {
      return `${baseClass} bg-red-300 text-red-700 border-red-500`;
    }
    if (estadoPago === "Pagado") {
      return `${baseClass} bg-green-300 text-green-700 border-green-500`;
    }
    return baseClass; // Para otros estados
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Buscar por ID, Nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Contenedor responsive */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-2 text-left">{col.header}</th>
              ))}
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                      {col.accessor === 'estadoPago' ? (
                        <span className={getEstadoPagoClass(item[col.accessor])}>
                          {item[col.accessor]}
                        </span>
                      ) : (
                        item[col.accessor]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-4 text-center text-gray-500">
                  No se encontraron datos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 rounded-md ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'
          }`}
        >
          Anterior
        </button>
        <span className="mx-4 text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-300 rounded-md ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Table;

import React, { useState } from 'react';
import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Column {
  header: string;
  accessor: string;
  isMobileHidden?: boolean; // Nueva propiedad para ocultar columnas en móviles
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

const ITEMS_PER_PAGE = 5;

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
    const baseClass = "px-4 py-2 text-center w-32 truncate border rounded-full"; // Ancho fijo y bordes redondeados
    if (estadoPago === "Pendiente") {
      return `${baseClass} bg-red-100 text-red-700 border-red-300`;
    }
    if (estadoPago === "Pagado") {
      return `${baseClass} bg-green-100 text-green-700 border-green-300`;
    }
    return baseClass; // Para otros estados
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 w-full max-w-full">
      {/* Barra de búsqueda */}
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

      {/* Contenedor de la tabla */}
      <div className="w-full overflow-x-auto">
        {/* Tabla para pantallas grandes */}
        <table className="w-full table-auto text-sm hidden md:table">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left font-medium whitespace-nowrap ${
                    col.isMobileHidden ? 'hidden md:table-cell' : ''
                  }`}
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-4 py-3 whitespace-nowrap ${
                        col.isMobileHidden ? 'hidden md:table-cell' : ''
                      }`}
                    >
                      {col.accessor === 'estadoPago' ? (
                        <span className={getEstadoPagoClass(item[col.accessor])}>
                          {item[col.accessor]}
                        </span>
                      ) : (
                        item[col.accessor]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex justify-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      aria-label="Editar"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      aria-label="Eliminar"
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

        {/* Lista para pantallas pequeñas */}
        <div className="md:hidden space-y-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                {columns.map((col, colIndex) => (
                  !col.isMobileHidden && (
                    <div key={colIndex} className="mb-2">
                      <span className="font-medium text-gray-700">{col.header}: </span>
                      <span className="text-gray-900">
                        {col.accessor === 'estadoPago' ? (
                          <span className={getEstadoPagoClass(item[col.accessor])}>
                            {item[col.accessor]}
                          </span>
                        ) : (
                          item[col.accessor]
                        )}
                      </span>
                    </div>
                  )
                ))}
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    aria-label="Editar"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    aria-label="Eliminar"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No se encontraron datos
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-200 rounded-md transition-colors duration-200 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
          }`}
          aria-label="Página anterior"
        >
          Anterior
        </button>
        <span className="mx-4 text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-200 rounded-md transition-colors duration-200 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
          }`}
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Table;
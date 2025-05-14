import React from 'react';
import { ColumnRef, Row } from './types';
import CellRenderer from './CellRenderer';

interface DataGridProps {
  columns: ColumnRef[];
  rows: Row[];
}

const DataGrid: React.FC<DataGridProps> = ({ columns, rows }) => {
  // Helper function to determine header alignment based on column type and align property
  const getHeaderAlignment = (column: ColumnRef): string => {
    if (column.align) {
      switch (column.align) {
        case 'center': return 'text-center';
        case 'right': return 'text-right';
        case 'left': return 'text-left';
      }
    }

    // Default alignment based on column type
    if (column.type === 'number') return 'text-center';
    return 'text-left';
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {columns.map((column) => (
              <th
                key={column.field}
                className={`px-4 py-2 font-medium text-gray-700 dark:text-gray-300 border-b ${getHeaderAlignment(column)}`}
                style={{
                  minWidth: column.minWidth || 200,
                  width: column.width || 'auto'
                }}
              >
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.field}`}
                  className="border-b"
                  style={{
                    minWidth: column.minWidth || 200,
                    width: column.width || 'auto'
                  }}
                >
                  <CellRenderer
                    column={column}
                    value={row[column.field]}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
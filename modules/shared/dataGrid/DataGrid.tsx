import React from 'react';
import { ColumnRef, Row } from './types';
import CellRenderer from './CellRenderer';

interface DataGridProps {
  columns: ColumnRef[];
  rows: Row[];
}

const DataGrid: React.FC<DataGridProps> = ({ columns, rows }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {columns.map((column) => (
              <th
                key={column.field}
                className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300 border-b"
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
import React from 'react';
import { ColumnRef, Row } from './types';
import CellRenderer from './CellRenderer';

interface DataRowProps {
  row: Row;
  rowIndex: number;
  columns: ColumnRef[];
}

/**
 * DataRow component for DataGrid
 * Renders a single row of data
 */
const DataRow: React.FC<DataRowProps> = ({ 
  row, 
  rowIndex, 
  columns 
}) => {
  return (
    <tr
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
  );
};

export default React.memo(DataRow);

import React, { useState } from 'react';
import { ColumnRef, Row } from './types/type';
import CellRenderer from './CellRenderer';
import EditableCellRenderer from './EditableCellRenderer';

interface DataRowProps {
  row: Row;
  rowIndex: number;
  columns: ColumnRef[];
  onCellValueChange?: (rowId: any, field: string, value: any) => void;
}

/**
 * DataRow component for DataGrid
 * Renders a single row of data
 */
const DataRow: React.FC<DataRowProps> = ({
  row,
  rowIndex,
  columns,
  onCellValueChange
}) => {
  const [editingCell, setEditingCell] = useState<string | null>(null);

  // Handle double click on a cell to start editing
  const handleCellDoubleClick = (field: string, column: ColumnRef) => {
    // Default editable to false if not specified
    const isEditable = column.editable === true;

    if (isEditable && !editingCell) {
      setEditingCell(field);
    }
  };

  // Handle save of edited cell value
  const handleCellValueSave = (field: string, value: any) => {
    if (onCellValueChange) {
      onCellValueChange(row.id, field, value);
    }
    setEditingCell(null);
  };

  // Handle cancel of cell editing
  const handleCellEditCancel = () => {
    setEditingCell(null);
  };

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
          onDoubleClick={() => handleCellDoubleClick(column.field, column)}
        >
          {editingCell === column.field ? (
            <EditableCellRenderer
              column={column}
              row={row}
              onSave={handleCellValueSave}
              onCancel={handleCellEditCancel}
            />
          ) : (
            <CellRenderer
              column={column}
              row={row}
            />
          )}
        </td>
      ))}
    </tr>
  );
};

export default React.memo(DataRow);

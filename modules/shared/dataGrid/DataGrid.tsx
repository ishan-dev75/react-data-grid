import React, { useState, useMemo, useCallback } from 'react';
import { ColumnRef, Row, SortModel, SortDirection } from './types/type';
import DataRow from './DataRow';
import HeaderCell from './HeaderCell';
import { sortRows } from './utils/sortUtils';

interface DataGridProps {
  /**
   * Array of column definitions
   */
  columns: ColumnRef[];

  /**
   * Array of data rows
   */
  rows: Row[];

  /**
   * Callback function when a cell value changes
   */
  onCellValueChange?: (rowId: any, field: string, value: any) => void;

  /**
   * Height of the grid container
   * Can be a CSS value like '400px' or a Tailwind class like 'h-96'
   * If not provided, the grid will take the height of its container
   */
  height?: string;
}

/**
 * DataGrid component
 * A flexible and responsive data grid with sorting capabilities
 */
const DataGrid: React.FC<DataGridProps> = ({
  columns,
  rows,
  onCellValueChange,
  height
}) => {
  const [sortModel, setSortModel] = useState<SortModel | null>(null);
  const [internalRows, setInternalRows] = useState<Row[]>(rows);

  // Update internal rows when external rows change
  React.useEffect(() => {
    setInternalRows(rows);
  }, [rows]);

  // Sort the rows based on the current sort model
  const sortedRows = useMemo(() => {
    return sortRows(internalRows, sortModel, columns);
  }, [internalRows, sortModel, columns]);

  // Handle column header click for sorting
  const handleSort = (column: ColumnRef) => {
    if (column.sortable === false) return;

    let nextDirection: SortDirection = 'asc';

    if (sortModel && sortModel.field === column.field) {
      // Cycle through: asc -> desc -> null
      if (sortModel.direction === 'asc') {
        nextDirection = 'desc';
      } else if (sortModel.direction === 'desc') {
        nextDirection = null;
      }
    }

    setSortModel(nextDirection ? { field: column.field, direction: nextDirection } : null);
  };

  // Get the current sort direction for a column
  const getSortDirection = (column: ColumnRef): SortDirection => {
    if (!sortModel || sortModel.field !== column.field) return null;
    return sortModel.direction;
  };

  // Handle cell value changes
  const handleCellValueChange = useCallback((rowId: any, field: string, value: any) => {
    // If external handler is provided, call it
    if (onCellValueChange) {
      onCellValueChange(rowId, field, value);
    }

    // Update internal state if no external handler is provided
    if (!onCellValueChange) {
      setInternalRows(prevRows =>
        prevRows.map(row =>
          row.id === rowId ? { ...row, [field]: value } : row
        )
      );
    }
  }, [onCellValueChange]);

  // Determine container style based on height prop
  const containerStyle: React.CSSProperties = {
    height: height || 'auto',
    maxHeight: height ? undefined : '100%',
    overflow: 'auto'
  };

  return (
    <div className="w-full overflow-x-auto relative" style={containerStyle}>
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gray-100 dark:bg-gray-800 shadow-sm">
            {columns.map((column) => (
              <HeaderCell
                key={column.field}
                column={column}
                sortDirection={getSortDirection(column)}
                onSort={handleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => (
            <DataRow
              key={row.id || rowIndex}
              row={row}
              rowIndex={rowIndex}
              columns={columns}
              onCellValueChange={handleCellValueChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
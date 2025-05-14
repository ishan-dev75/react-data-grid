import React, { useState, useMemo } from 'react';
import { ColumnRef, Row, SortModel, SortDirection } from './types/type';
import DataRow from './DataRow';
import HeaderCell from './HeaderCell';
import { sortRows } from './utils/sortUtils';

interface DataGridProps {
  columns: ColumnRef[];
  rows: Row[];
}

/**
 * DataGrid component
 * A flexible and responsive data grid with sorting capabilities
 */
const DataGrid: React.FC<DataGridProps> = ({ columns, rows }) => {
  const [sortModel, setSortModel] = useState<SortModel | null>(null);

  // Sort the rows based on the current sort model
  const sortedRows = useMemo(() => {
    return sortRows(rows, sortModel, columns);
  }, [rows, sortModel, columns]);

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

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
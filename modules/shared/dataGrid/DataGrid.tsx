import React, { useState, useMemo } from 'react';
import { ColumnRef, Row, SortModel, SortDirection } from './types';
import CellRenderer from './CellRenderer';
import Icon from '../icons';
import { Tooltip } from '../tooltip';

interface DataGridProps {
  columns: ColumnRef[];
  rows: Row[];
}

const DataGrid: React.FC<DataGridProps> = ({ columns, rows }) => {
  const [sortModel, setSortModel] = useState<SortModel | null>(null);

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

  // Sort the rows based on the current sort model
  const sortedRows = useMemo(() => {
    if (!sortModel) return rows;

    const { field, direction } = sortModel;
    if (!direction) return rows;

    const column = columns.find(col => col.field === field);
    if (!column) return rows;

    return [...rows].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      // Handle null/undefined values
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return direction === 'asc' ? -1 : 1;
      if (valueB == null) return direction === 'asc' ? 1 : -1;

      // Sort based on column type
      switch (column.type) {
        case 'number':
          return direction === 'asc'
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);

        case 'date':
          const dateA = new Date(valueA);
          const dateB = new Date(valueB);
          return direction === 'asc'
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();

        default: // string or any other type
          const strA = String(valueA).toLowerCase();
          const strB = String(valueB).toLowerCase();
          if (direction === 'asc') {
            return strA.localeCompare(strB);
          } else {
            return strB.localeCompare(strA);
          }
      }
    });
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

  // Get the sort icon for a column
  const getSortIcon = (column: ColumnRef) => {
    if (column.sortable === false) return null;

    const direction = getSortDirection(column);
    let iconName: 'sortAsc' | 'sortDesc' | 'sortDefault' = 'sortDefault';
    let tooltipText = 'Click to sort';

    if (direction === 'asc') {
      iconName = 'sortAsc';
      tooltipText = 'Sorted ascending. Click to sort descending';
    } else if (direction === 'desc') {
      iconName = 'sortDesc';
      tooltipText = 'Sorted descending. Click to clear sorting';
    }

    return (
      <Tooltip content={tooltipText}>
        <span className="ml-1 inline-flex items-center">
          <Icon
            name={iconName}
            size={16}
            className={direction ? 'text-blue-500' : 'text-gray-400'}
          />
        </span>
      </Tooltip>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {columns.map((column) => (
              <th
                key={column.field}
                className={`px-4 py-2 font-medium text-gray-700 dark:text-gray-300 border-b ${getHeaderAlignment(column)} ${column.sortable !== false ? 'cursor-pointer select-none' : ''}`}
                style={{
                  minWidth: column.minWidth || 200,
                  width: column.width || 'auto'
                }}
                onClick={() => handleSort(column)}
              >
                <div className={`flex items-center ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <span>{column.headerName}</span>
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => (
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
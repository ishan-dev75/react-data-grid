import React from 'react';
import { ColumnRef, SortDirection } from './types/type';
import Icon from '../icons';
import { Tooltip } from '../tooltip';

interface HeaderCellProps {
  column: ColumnRef;
  sortDirection: SortDirection;
  onSort: (column: ColumnRef) => void;
}

/**
 * HeaderCell component for DataGrid
 * Handles rendering and sorting functionality for a column header
 */
const HeaderCell: React.FC<HeaderCellProps> = ({
  column,
  sortDirection,
  onSort
}) => {
  // Get the alignment class based on column configuration
  const getAlignmentClass = (): string => {
    if (column.align) {
      switch (column.align) {
        case 'center': return 'justify-center';
        case 'right': return 'justify-end';
        case 'left': return 'justify-start';
      }
    }

    // Default alignment based on column type
    if (column.type === 'number') return 'justify-center';
    return 'justify-start';
  };

  // Get the sort icon for the column
  const getSortIcon = () => {
    if (column.sortable === false) return null;

    let iconName: 'sortAsc' | 'sortDesc' | 'sortDefault' = 'sortDefault';
    let tooltipText = 'Click to sort';

    if (sortDirection === 'asc') {
      iconName = 'sortAsc';
      tooltipText = 'Sorted ascending. Click to sort descending';
    } else if (sortDirection === 'desc') {
      iconName = 'sortDesc';
      tooltipText = 'Sorted descending. Click to clear sorting';
    }

    return (
      <Tooltip content={tooltipText}>
        <span className="ml-1 inline-flex items-center">
          <Icon
            name={iconName}
            size={16}
            className={sortDirection ? 'text-blue-500' : 'text-gray-400'}
          />
        </span>
      </Tooltip>
    );
  };

  return (
    <th
      className={`px-4 py-3 font-medium text-gray-700 dark:text-gray-300 border-b bg-gray-100 dark:bg-gray-800 ${column.sortable !== false ? 'cursor-pointer select-none' : ''}`}
      style={{
        minWidth: column.minWidth || 200,
        width: column.width || 'auto'
      }}
      onClick={() => column.sortable !== false && onSort(column)}
    >
      <div className={`flex items-center ${getAlignmentClass()}`}>
        <span>{column.headerName}</span>
        {getSortIcon()}
      </div>
    </th>
  );
};

export default HeaderCell;

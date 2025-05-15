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
        <span
          className={`ml-1 inline-flex items-center ${sortDirection ? 'text-blue-500' : 'text-gray-400'}`}
        >
          <Icon
            name={iconName}
            size={16}

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
        <div className="flex items-center">
          {column.editable && (
            <Tooltip content="Double-click on cells in this column to edit values">
              <span className="mr-1 ">
                <Icon name="pencil" size={14} />
              </span>
            </Tooltip>
          )}
          <span>{column.headerName}</span>
          {/* {column.editable && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Editable
            </span>
          )} */}
        </div>
        {getSortIcon()}
      </div>
    </th>
  );
};

export default HeaderCell;

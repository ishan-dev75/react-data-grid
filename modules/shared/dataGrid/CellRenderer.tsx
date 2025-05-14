import React from 'react';
import { ColumnRef, Row } from './types/type';
import StringCell from './cells/StringCell';
import NumberCell from './cells/NumberCell';
import DateCell from './cells/DateCell';
import DefaultCell from './cells/DefaultCell';
import { getCellValue } from './utils/sortUtils';

interface CellRendererProps {
  column: ColumnRef;
  row: Row;
}

/**
 * CellRenderer component
 * Renders the appropriate cell based on column type or custom renderer
 */
const CellRenderer: React.FC<CellRendererProps> = React.memo(({ column, row }) => {
  // Get the cell value using the shared getCellValue function
  const value = getCellValue(row, column);

  // Get the alignment from the column config or use default based on type
  const getDefaultAlign = () => {
    if (column.type === 'number') return 'center';
    return 'left';
  };

  const align = column.align || getDefaultAlign();

  // If a custom renderer is provided, use it
  if (column.renderCell) {
    return <>{column.renderCell(value, row, column)}</>;
  }

  // Otherwise, select the appropriate cell component based on column type
  switch (column.type) {
    case 'string':
      return <StringCell value={value} align={align} />;
    case 'number':
      return <NumberCell value={value} align={align} />;
    case 'date':
      return <DateCell value={value} align={align} />;
    default:
      return <DefaultCell value={value} align={align} />;
  }
});

CellRenderer.displayName = 'CellRenderer';

export default CellRenderer;

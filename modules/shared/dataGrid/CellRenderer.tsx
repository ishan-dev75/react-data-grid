import React from 'react';
import { ColumnRef } from './types';
import StringCell from './cells/StringCell';
import NumberCell from './cells/NumberCell';
import DateCell from './cells/DateCell';
import DefaultCell from './cells/DefaultCell';

interface CellRendererProps {
  column: ColumnRef;
  value: any;
}

const CellRenderer: React.FC<CellRendererProps> = React.memo(({ column, value }) => {
  // Get the alignment from the column config or use default based on type
  const getDefaultAlign = () => {
    if (column.type === 'number') return 'center';
    return 'left';
  };

  const align = column.align || getDefaultAlign();

  // Select the appropriate cell component based on column type
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

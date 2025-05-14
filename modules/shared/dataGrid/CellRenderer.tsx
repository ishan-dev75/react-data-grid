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
  // Select the appropriate cell component based on column type
  switch (column.type) {
    case 'string':
      return <StringCell value={value} />;
    case 'number':
      return <NumberCell value={value} />;
    case 'date':
      return <DateCell value={value} />;
    default:
      return <DefaultCell value={value} />;
  }
});

CellRenderer.displayName = 'CellRenderer';

export default CellRenderer;

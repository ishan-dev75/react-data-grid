import React from 'react';

interface NumberCellProps {
  value: number | null;
}

const NumberCell: React.FC<NumberCellProps> = React.memo(({ value }) => {
  return (
    <div className="px-4 py-2 text-right truncate">
      {value !== null && value !== undefined ? value.toString() : ''}
    </div>
  );
});

NumberCell.displayName = 'NumberCell';

export default NumberCell;

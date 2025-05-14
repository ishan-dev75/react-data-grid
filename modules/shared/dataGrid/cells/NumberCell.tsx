import React from 'react';

interface NumberCellProps {
  value: number | null;
  align?: 'left' | 'center' | 'right';
}

const NumberCell: React.FC<NumberCellProps> = React.memo(({ value, align = 'center' }) => {
  const alignmentClass = React.useMemo(() => {
    switch (align) {
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      case 'center':
      default: return 'text-center';
    }
  }, [align]);

  return (
    <div className={`px-4 py-2 truncate ${alignmentClass}`}>
      {value !== null && value !== undefined ? value.toString() : ''}
    </div>
  );
});

NumberCell.displayName = 'NumberCell';

export default NumberCell;

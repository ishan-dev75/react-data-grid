import React from 'react';

interface DefaultCellProps {
  value: any;
  align?: 'left' | 'center' | 'right';
}

const DefaultCell: React.FC<DefaultCellProps> = React.memo(({ value, align = 'left' }) => {
  const displayValue = React.useMemo(() => {
    if (value === null || value === undefined) return '';
    return String(value);
  }, [value]);

  const alignmentClass = React.useMemo(() => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'left':
      default: return 'text-left';
    }
  }, [align]);

  return (
    <div className={`px-4 py-2 truncate ${alignmentClass}`}>
      {displayValue}
    </div>
  );
});

DefaultCell.displayName = 'DefaultCell';

export default DefaultCell;

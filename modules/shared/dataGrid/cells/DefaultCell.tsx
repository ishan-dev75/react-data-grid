import React from 'react';

interface DefaultCellProps {
  value: any;
}

const DefaultCell: React.FC<DefaultCellProps> = React.memo(({ value }) => {
  const displayValue = React.useMemo(() => {
    if (value === null || value === undefined) return '';
    return String(value);
  }, [value]);

  return (
    <div className="px-4 py-2 truncate">
      {displayValue}
    </div>
  );
});

DefaultCell.displayName = 'DefaultCell';

export default DefaultCell;

import React from 'react';

interface StringCellProps {
  value: string | null;
}

const StringCell: React.FC<StringCellProps> = React.memo(({ value }) => {
  return (
    <div className="px-4 py-2 truncate">
      {value ?? ''}
    </div>
  );
});

StringCell.displayName = 'StringCell';

export default StringCell;

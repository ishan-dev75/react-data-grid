import React from 'react';

interface StringCellProps {
  value: string | null;
  align?: 'left' | 'center' | 'right';
}

const StringCell: React.FC<StringCellProps> = React.memo(({ value, align = 'left' }) => {
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
      {value ?? ''}
    </div>
  );
});

StringCell.displayName = 'StringCell';

export default StringCell;

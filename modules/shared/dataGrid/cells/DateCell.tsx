import React from 'react';

interface DateCellProps {
  value: string | Date | null;
  align?: 'left' | 'center' | 'right';
}

// Helper function to format date consistently regardless of locale
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  // Add 1 to month because getMonth() returns 0-11
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Format as YYYY-MM-DD which is locale-independent
  return `${year}-${month}-${day}`;
};

const DateCell: React.FC<DateCellProps> = React.memo(({ value, align = 'left' }) => {
  const formattedDate = React.useMemo(() => {
    if (!value) return '';

    try {
      const date = value instanceof Date ? value : new Date(value);
      return formatDate(date);
    } catch (error) {
      console.error('Invalid date format:', value);
      return '';
    }
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
      {formattedDate}
    </div>
  );
});

DateCell.displayName = 'DateCell';

export default DateCell;

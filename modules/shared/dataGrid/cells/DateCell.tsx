import React from 'react';

interface DateCellProps {
  value: string | Date | null;
}

const DateCell: React.FC<DateCellProps> = React.memo(({ value }) => {
  const formattedDate = React.useMemo(() => {
    if (!value) return '';
    
    try {
      const date = value instanceof Date ? value : new Date(value);
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Invalid date format:', value);
      return '';
    }
  }, [value]);

  return (
    <div className="px-4 py-2 truncate">
      {formattedDate}
    </div>
  );
});

DateCell.displayName = 'DateCell';

export default DateCell;

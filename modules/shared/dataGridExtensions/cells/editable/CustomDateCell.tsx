import React from 'react';
import withEditableCell from '@/modules/shared/dataGrid/cells/editable/withEditableCell';
import CustomDateInput from './CustomDateInput';

/**
 * CustomDateCell component
 * An editable cell for date values with dark mode support
 */
const CustomDateCell = withEditableCell<string | null>(
  CustomDateInput,
  // Parse value
  (value) => value || null,
  // Format value
  (value) => {
    if (!value) return '';
    
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return '';
      
      // Format as YYYY-MM-DD for date input
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  }
);

export default CustomDateCell;

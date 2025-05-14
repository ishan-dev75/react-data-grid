import React from 'react';
import withEditableCell from './withEditableCell';
import { DateInput } from './inputs';

/**
 * EditableDateCell component
 * An editable cell for date values
 */
const EditableDateCell = withEditableCell<string | null>(
  DateInput,
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

export default EditableDateCell;

import React from 'react';
import withEditableCell from './withEditableCell';
import { NumberInput } from './inputs';

/**
 * EditableNumberCell component
 * An editable cell for number values
 */
const EditableNumberCell = withEditableCell<number | null>(
  NumberInput,
  // Parse value
  (value) => {
    if (value === '') return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  },
  // Format value
  (value) => value !== null && value !== undefined ? String(value) : ''
);

export default EditableNumberCell;

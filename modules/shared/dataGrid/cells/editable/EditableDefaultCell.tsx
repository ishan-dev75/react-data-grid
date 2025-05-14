import React from 'react';
import withEditableCell from './withEditableCell';
import { TextInput } from './inputs';

/**
 * EditableDefaultCell component
 * A fallback editable cell for any value type
 */
const EditableDefaultCell = withEditableCell<any>(
  TextInput,
  // Parse value (identity)
  (value) => value,
  // Format value
  (value) => value !== null && value !== undefined ? String(value) : ''
);

export default EditableDefaultCell;

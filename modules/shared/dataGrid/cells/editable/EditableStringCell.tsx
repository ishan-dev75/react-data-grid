import React from 'react';
import withEditableCell from './withEditableCell';
import { TextInput } from './inputs';

/**
 * EditableStringCell component
 * An editable cell for string values
 */
const EditableStringCell = withEditableCell<string>(
  TextInput,
  // Parse value (identity for strings)
  (value) => value,
  // Format value
  (value) => value || ''
);

export default EditableStringCell;

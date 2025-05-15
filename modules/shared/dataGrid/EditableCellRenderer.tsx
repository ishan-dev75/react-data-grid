import React from 'react';
import { ColumnRef, Row } from './types/type';
import {
  EditableStringCell,
  EditableNumberCell,
  EditableDateCell,
  EditableDefaultCell
} from './cells/editable';
import { getCellValue } from './utils/sortUtils';

interface EditableCellRendererProps {
  column: ColumnRef;
  row: Row;
  onSave: (field: string, value: any) => void;
  onCancel: () => void;
}

/**
 * EditableCellRenderer component
 * Renders the appropriate editable cell based on column type or custom editor
 */
const EditableCellRenderer: React.FC<EditableCellRendererProps> = ({
  column,
  row,
  onSave,
  onCancel
}) => {
  // Get the cell value using the shared getCellValue function
  const value = getCellValue(row, column);

  // Get the alignment from the column config or use default based on type
  const getDefaultAlign = () => {
    if (column.type === 'number') return 'center';
    return 'left';
  };

  const align = column.align || getDefaultAlign();

  // Handle save with validation
  const handleSave = (newValue: any) => {
    // Apply column validator if provided
    if (column.valueValidator && !column.valueValidator(newValue)) {
      return; // Don't save if validation fails
    }

    onSave(column.field, newValue);
  };

  // If a custom editor is provided, use it
  // if (column.editableCell) {
  //   return (
  //     <EditableCellWrapper onSave={() => handleSave(value)} onCancel={onCancel} className="flex flex-col items-center justify-center"
  //       saveOnBlur={false}>
  //       {column.editableCell({
  //         value,
  //         row,
  //         column,
  //         onSave: (newValue) => handleSave(newValue),
  //         onCancel
  //       })}
  //     </EditableCellWrapper>
  //   );
  // }

  if (column.editableCell) {
    return <>{column.editableCell({
      value,
      row,
      column,
      onSave: (newValue) => handleSave(newValue),
      onCancel
    })}</>;
  }

  // Common props for all editable cells
  const commonProps = {
    value,
    align,
    onSave: handleSave,
    onCancel,
    validator: column.valueValidator
  };

  // Select the appropriate editable cell component based on column type
  switch (column.type) {
    case 'string':
      return <EditableStringCell {...commonProps} />;
    case 'number':
      return <EditableNumberCell {...commonProps} />;
    case 'date':
      return <EditableDateCell {...commonProps} />;
    default:
      return <EditableDefaultCell {...commonProps} />;
  }
};

export default EditableCellRenderer;

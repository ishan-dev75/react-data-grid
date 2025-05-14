import React from 'react';
import useEditableCell from '../../hooks/useEditableCell';

export interface EditableCellProps<T> {
  value: T;
  align?: 'left' | 'center' | 'right';
  onSave: (newValue: T) => void;
  onCancel: () => void;
  validator?: (value: T) => boolean;
}

/**
 * Higher-order component for creating editable cells
 * @param InputComponent The input component to use for editing
 * @param parseValue Function to parse the input value to the correct type
 * @param formatValue Function to format the value for display in the input
 * @returns An editable cell component
 */
function withEditableCell<T>(
  InputComponent: React.ComponentType<{
    ref: React.Ref<HTMLInputElement>;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    className: string;
    [key: string]: any;
  }>,
  parseValue: (inputValue: string) => T,
  formatValue: (value: T) => string
) {
  return function EditableCell({
    value,
    align = 'left',
    onSave,
    onCancel,
    validator,
    ...props
  }: EditableCellProps<T> & Record<string, any>) {
    const formattedValue = formatValue(value);
    
    const {
      value: inputValue,
      error,
      inputRef,
      handleChange,
      handleBlur,
      handleKeyDown
    } = useEditableCell<string>({
      initialValue: formattedValue,
      onSave: (newValue) => {
        const parsedValue = parseValue(newValue);
        onSave(parsedValue);
      },
      onCancel,
      validator: validator 
        ? (inputVal) => validator(parseValue(inputVal)) 
        : undefined
    });

    const alignmentClass = React.useMemo(() => {
      switch (align) {
        case 'center': return 'text-center';
        case 'right': return 'text-right';
        case 'left':
        default: return 'text-left';
      }
    }, [align]);

    return (
      <div className={`px-2 py-1 w-full ${alignmentClass}`}>
        <InputComponent
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full px-2 py-1 border ${error ? 'border-red-500' : 'border-blue-500'} rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${alignmentClass}`}
          {...props}
        />
        {error && <div className="text-red-500 text-xs mt-1">Invalid value</div>}
      </div>
    );
  };
}

export default withEditableCell;

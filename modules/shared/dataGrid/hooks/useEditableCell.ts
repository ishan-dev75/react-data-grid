import { useState, useEffect, useRef, useCallback } from 'react';

interface UseEditableCellProps<T> {
  initialValue: T;
  onSave: (value: T) => void;
  onCancel: () => void;
  validator?: (value: T) => boolean;
}

interface UseEditableCellReturn<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  error: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Custom hook for handling editable cell functionality
 * Provides common state and event handlers for editable cells
 */
function useEditableCell<T>({
  initialValue,
  onSave,
  onCancel,
  validator
}: UseEditableCellProps<T>): UseEditableCellReturn<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
    // Select all text if it's a text input
    inputRef.current?.select();
  }, []);

  const validateValue = useCallback((val: T): boolean => {
    if (validator) {
      return validator(val);
    }
    return true;
  }, [validator]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as unknown as T;
    setValue(newValue);
    
    // Clear error if the value is valid
    if (error && validateValue(newValue)) {
      setError(false);
    }
  }, [error, validateValue]);

  const saveChanges = useCallback(() => {
    if (!validateValue(value)) {
      setError(true);
      return;
    }
    onSave(value);
  }, [value, validateValue, onSave]);

  const handleBlur = useCallback(() => {
    saveChanges();
  }, [saveChanges]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }, [saveChanges, onCancel]);

  return {
    value,
    setValue,
    error,
    inputRef,
    handleChange,
    handleBlur,
    handleKeyDown
  };
}

export default useEditableCell;

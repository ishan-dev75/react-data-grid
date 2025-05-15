import React, { useRef, useEffect, ReactNode } from 'react';

interface EditableCellWrapperProps {
  children: ReactNode;
  onSave: () => void;
  onCancel: () => void;
  className?: string;
  autoFocus?: boolean;
  saveOnBlur?: boolean;
  style?: React.CSSProperties;
}

/**
 * EditableCellWrapper component
 * A common wrapper for editable cells that handles keyboard events (Enter and Escape)
 * and provides consistent styling
 */
const EditableCellWrapper: React.FC<EditableCellWrapperProps> = ({
  children,
  onSave,
  onCancel,
  className = '',
  autoFocus = true,
  saveOnBlur = true,
  style = {}  
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSave();
    }
  };

  // Handle blur event
  const handleBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      if (saveOnBlur) {
        onSave();
      }
      onCancel();
    }
  };

  // Auto-focus the first input element inside the wrapper when it mounts
  useEffect(() => {
    if (autoFocus && wrapperRef.current) {
      // First try to focus the wrapper itself
      wrapperRef.current.focus();

      // Then try to find and focus the first input element
      const inputElement = wrapperRef.current.querySelector('input');
      if (inputElement) {
        inputElement.focus();
        // If it's a text input, select all text
        if (inputElement.type === 'text') {
          inputElement.select();
        }
      }
    }
  }, [autoFocus]);

  return (
    <div
      ref={wrapperRef}
      className={`my-2 px-2 py-2 border-2 border-blue-500 rounded bg-blue-50 dark:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      style={style}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      {children}
    </div>
  );
};

export default EditableCellWrapper;

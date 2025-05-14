import React, { forwardRef } from 'react';

/**
 * CustomDateInput component
 * A date input component with a properly styled calendar icon for dark mode
 */
const CustomDateInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return (
      <div className="relative w-full">
        <input 
          type="date" 
          ref={ref} 
          {...props} 
          className={`w-full px-2 py-1 pr-8 border rounded ${props.className || ''}`}
          style={{
            // Remove default calendar icon in webkit browsers
            '::-webkit-calendar-picker-indicator': {
              opacity: 0,
            },
            ...props.style
          }}
        />
        {/* Custom calendar icon that works in dark mode */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-gray-500 dark:text-gray-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>
    );
  }
);

CustomDateInput.displayName = 'CustomDateInput';

export default CustomDateInput;

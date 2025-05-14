import React, { forwardRef } from 'react';

/**
 * DateInput component
 * A date input component with forwarded ref
 */
const DateInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input type="date" ref={ref} {...props} />
);

DateInput.displayName = 'DateInput';

export default DateInput;

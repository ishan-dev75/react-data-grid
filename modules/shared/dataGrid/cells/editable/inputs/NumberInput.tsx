import React, { forwardRef } from 'react';

/**
 * NumberInput component
 * A text input component optimized for number entry with forwarded ref
 */
const NumberInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input type="text" ref={ref} {...props} />
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;

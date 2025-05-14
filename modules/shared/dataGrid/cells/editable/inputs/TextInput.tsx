import React, { forwardRef } from 'react';

/**
 * TextInput component
 * A simple text input component with forwarded ref
 */
const TextInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input type="text" ref={ref} {...props} />
);

TextInput.displayName = 'TextInput';

export default TextInput;

import React, { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
  FloatingPortal
} from '@floating-ui/react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: Placement;
  delay?: number;
  className?: string;
}

/**
 * Lightweight tooltip component using @floating-ui/react
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 300,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Setup floating UI
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // Setup interactions
  const hover = useHover(context, {
    move: false,
    delay: {
      open: delay,
      close: 0
    }
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const tooltipClasses = `z-50 px-2 py-1 text-xs font-medium
    text-black dark:text-white
    bg-white dark:bg-gray-800
    rounded
    shadow-md dark:shadow-lg
    pointer-events-none whitespace-nowrap
    ${className}`;

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()} className='inline-flex'>
        {children}
      </span>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={tooltipClasses}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;

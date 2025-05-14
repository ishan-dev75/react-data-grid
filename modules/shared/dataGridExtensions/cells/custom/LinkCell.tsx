import React from 'react';
import { Tooltip } from '@/modules/shared/tooltip';

export interface LinkCellProps {
  /**
   * The URL to link to
   */
  href: string;

  /**
   * The text to display for the link
   */
  text?: string;

  /**
   * Optional tooltip text to show on hover
   */
  tooltip?: string;

  /**
   * Whether to open the link in a new tab
   * @default true
   */
  openInNewTab?: boolean;

  /**
   * Optional icon to display before the link text
   */
  icon?: React.ReactNode;

  /**
   * Optional CSS class names to apply to the link
   */
  className?: string;
}

/**
 * LinkCell component
 * Displays a clickable link in a DataGrid cell
 */
const LinkCell: React.FC<LinkCellProps> = ({
  href,
  text,
  tooltip,
  openInNewTab = true,
  icon,
  className = ''
}) => {
  const displayText = text || href;

  const linkContent = (
    <a
      href={href}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : ''}
      className={`text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center ${className}`}
      onClick={(e) => e.stopPropagation()} // Prevent cell selection when clicking the link
    >
      {icon && <span className="mr-1">{icon}</span>}
      {displayText}
    </a>
  );

  if (tooltip) {
    return (
      <div className="px-4 py-2">
        <Tooltip content={tooltip} placement="top">
          {linkContent}
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="px-4 py-2">
      {linkContent}
    </div>
  );
};

export default LinkCell;

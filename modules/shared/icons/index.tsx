import React from 'react';
import { 
  TbSortAscending, 
  TbSortDescending, 
  TbArrowsSort 
} from 'react-icons/tb';

export type IconName = 'sortAsc' | 'sortDesc' | 'sortDefault';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Common Icon component that centralizes all icon usage in the application
 */
export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 18, 
  color = 'currentColor',
  className = ''
}) => {
  const iconProps = {
    size,
    color,
    className
  };

  switch (name) {
    case 'sortAsc':
      return <TbSortAscending {...iconProps} />;
    case 'sortDesc':
      return <TbSortDescending {...iconProps} />;
    case 'sortDefault':
      return <TbArrowsSort {...iconProps} />;
    default:
      return null;
  }
};

export default Icon;

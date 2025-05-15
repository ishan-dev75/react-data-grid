import React, { useState } from 'react';
import EditableCellWrapper from '@/modules/shared/dataGrid/cells/editable/EditableCellWrapper';

interface StarRatingEditorProps {
  config: {
    value: number;
    maxRating?: number;
    onSave: (value: number) => void;
    onCancel: () => void;
  }
}

/**
 * StarRatingEditor component
 * A custom editor for rating values using stars
 */
const StarRatingEditor: React.FC<StarRatingEditorProps> = ({
  config
}) => {
  const {
    value = 0,
    onSave,
    onCancel,
    maxRating = 5
  } = config;
  const [rating, setRating] = useState<number>(value || 0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Handle click on a star
  const handleClick = (selectedRating: number) => {
    setRating(selectedRating);
    onSave(selectedRating);
  };

  // Handle mouse enter on a star
  const handleMouseEnter = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  // Handle save
  const handleSave = () => {
    onSave(rating);
  };

  return (
    <div className='flex items-center flex-col'>
      <div className="flex items-center mb-1">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isActive = (hoverRating !== null ? hoverRating : rating) >= starValue;

          return (
            <button
              key={index}
              type="button"
              className={`focus:outline-none ${isActive ? 'text-yellow-400' : 'text-gray-300'} text-xl mx-0.5 hover:scale-110 transition-transform`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </button>
          );
        })}
      </div>
      <div className="text-xs text-blue-600 dark:text-blue-400">
        Click to rate
      </div>
    </div>
  );
};

export default StarRatingEditor;

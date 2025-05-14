import React from 'react';

interface StarRatingCellProps {
  value: number;
  maxRating?: number;
}

/**
 * StarRatingCell component
 * Displays a rating as stars
 */
const StarRatingCell: React.FC<StarRatingCellProps> = ({
  value = 0,
  maxRating = 5
}) => {
  return (
    <div className="px-4 py-2 flex items-center justify-center">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isActive = value >= starValue;

          return (
            <span
              key={index}
              className={`${isActive ? 'text-yellow-400' : 'text-gray-300'} text-xl mx-0.5`}
            >
              ★
            </span>
          );
        })}
      </div>
      <span className="ml-2 text-sm text-gray-500">({value || 0}/5)</span>
    </div>
  );
};

export default StarRatingCell;

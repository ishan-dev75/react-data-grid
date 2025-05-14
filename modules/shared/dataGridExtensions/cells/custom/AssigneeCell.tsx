import React from 'react';
import { Tooltip } from '@/modules/shared/tooltip';

export interface User {
  id: string | number;
  name: string;
  imgURL?: string;
}

interface AssigneeCellProps {
  users: User[];
  compactLimit?: number;
}

/**
 * AssigneeCell component
 * Displays a list of users with a compact view
 * Shows only a limited number of users and a "+X more" indicator when there are more
 * Shows a tooltip with all users when hovering over the "+X more" indicator
 */
const AssigneeCell: React.FC<AssigneeCellProps> = ({
  users = [],
  compactLimit = 1
}) => {
  // If no users, show a placeholder
  if (!users || users.length === 0) {
    return (
      <div className="px-4 py-2 text-gray-400">
        No assignees
      </div>
    );
  }

  // Get the users to display (limited by compactLimit)
  const displayUsers = users.slice(0, compactLimit);
  const remainingCount = users.length - compactLimit;
  const hasMoreUsers = remainingCount > 0;

  // Generate initials from user name
  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return name.charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Render a user avatar with name in the main view
  const renderUserWithName = (user: User) => {
    const initials = getInitials(user.name);

    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white bg-blue-500 border-2 border-white">
          {user.imgURL ? (
            <img
              src={user.imgURL}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <span className="text-sm font-medium">{user.name}</span>
      </div>
    );
  };

  // Render a user with avatar and name (for tooltip)
  const renderUser = (user: User) => {
    const initials = getInitials(user.name);

    return (
      <div className="flex items-center space-x-2 py-1">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white bg-blue-500">
          {user.imgURL ? (
            <img
              src={user.imgURL}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <span className="text-sm font-medium">{user.name}</span>
      </div>
    );
  };

  // Render the tooltip content for the "+X more" indicator
  const renderTooltipContent = () => {
    if (!hasMoreUsers) return null;

    const remainingUsers = users.slice(compactLimit);

    return (
      <div className="flex flex-col space-y-1 max-w-xs">
        {remainingUsers.map(user => (
          <div key={user.id}>
            {renderUser(user)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center space-x-2">
        {/* Display the limited number of users with name */}
        {displayUsers.map(user => (
          <div key={user.id} className="flex-shrink-0">
            {renderUserWithName(user)}
          </div>
        ))}

        {/* Show the "+X more" indicator if there are more users */}
        {hasMoreUsers && (
          <Tooltip
            content={renderTooltipContent()}
            placement="top"
            className="bg-gray-800 p-2"
          >
            <div className="flex-shrink-0 cursor-pointer flex items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white bg-gray-500 border border-white">
                +{remainingCount}
              </div>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default AssigneeCell;

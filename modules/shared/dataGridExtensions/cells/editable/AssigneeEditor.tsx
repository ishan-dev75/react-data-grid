import React, { useState } from 'react';
import EditableCellWrapper from '@/modules/shared/dataGrid/cells/editable/EditableCellWrapper';
import SelectBox from '@/modules/shared/selectBox/SelectBox';
import { User } from '@/modules/shared/data/type';

/**
 * Option format for the SelectBox component
 */
interface AssigneeOption {
  /**
   * Unique identifier for the option
   */
  value: string | number;

  /**
   * Display text for the option
   */
  label: string;

  /**
   * The full user data associated with this option
   */
  data: User;
}

interface AssigneeEditorProps {
  /**
   * Currently selected users
   */
  value: User[];

  /**
   * List of all available users to select from
   */
  availableUsers: User[];

  /**
   * Callback when selection is saved
   * Always returns an array of users, even in single-select mode
   */
  onSave: (value: User[]) => void;

  /**
   * Callback when editing is cancelled
   */
  onCancel: () => void;

  /**
   * Whether to allow only a single selection
   * When true, only one user can be selected
   * When false, multiple users can be selected
   * @default false
   */
  singleSelect?: boolean;
}

/**
 * AssigneeEditor component
 * A custom editor for selecting assignees from a dropdown
 * Supports both single-select and multi-select modes via the singleSelect prop
 */
const AssigneeEditor: React.FC<AssigneeEditorProps> = (props) => {
  const {
    value = [],
    availableUsers = [],
    onSave,
    onCancel,
    singleSelect = false
  } = props;

  // Convert users to options format for react-select
  const userOptions: AssigneeOption[] = availableUsers.map(user => ({
    value: user.id,
    label: user.name,
    data: user
  }));

  // Get the initially selected options
  const getInitialSelectedOptions = () => {
    const mappedOptions = value.map(user => ({
      value: user.id,
      label: user.name,
      data: user
    }));

    // For single-select mode, return the first option if available
    if (singleSelect && mappedOptions.length > 0) {
      return mappedOptions[0];
    }

    // For multi-select mode or empty selection, return the array
    return mappedOptions;
  };

  const [selectedOptions, setSelectedOptions] = useState<AssigneeOption[] | AssigneeOption>(getInitialSelectedOptions());

  // Handle selection change
  const handleChange = (newValue: any) => {
    // In single-select mode, newValue will be a single object
    // In multi-select mode, newValue will be an array of objects
    setSelectedOptions(newValue);
  };

  // Handle save
  const handleSave = () => {
    if (singleSelect) {
      // For single-select, selectedOptions is a single AssigneeOption object
      const selectedUser = selectedOptions as AssigneeOption;
      onSave(selectedUser ? [selectedUser.data] : []);
    } else {
      // For multi-select, selectedOptions is an array of AssigneeOption objects
      const selectedUsers = (selectedOptions as AssigneeOption[])?.map(option => option.data) || [];
      onSave(selectedUsers);
    }
  };

  // Custom option renderer to show user avatar
  const formatOptionLabel = (option: AssigneeOption) => {
    const user = option.data;
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
        <span className='text-black dark:text-white'>{user.name}</span>
      </div>
    );
  };

  // Generate initials from user name
  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return name.charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <EditableCellWrapper onSave={handleSave} onCancel={onCancel} className='!p-0'>
      <SelectBox
        isMulti={!singleSelect}
        options={userOptions}
        value={selectedOptions}
        onChange={(newValue: any) => handleChange(newValue)}
        formatOptionLabel={(data: any) => formatOptionLabel(data as AssigneeOption)}
        menuPlacement="auto"
        showCheckbox={!singleSelect}
        hideValueChips={!singleSelect}
        hideSelectedOptions={singleSelect}
        placeholder="Search users..."
      />
    </EditableCellWrapper>
  );
};

export default AssigneeEditor;

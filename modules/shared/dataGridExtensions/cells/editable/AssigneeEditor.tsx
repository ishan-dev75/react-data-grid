import React, { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import EditableCellWrapper from '@/modules/shared/dataGrid/cells/editable/EditableCellWrapper';
import { User } from '../custom/AssigneeCell';
import SelectBox from '@/modules/shared/selectBox/SelectBox';

interface AssigneeOption {
  value: string | number;
  label: string;
  data: User;
}

interface AssigneeEditorProps {
    value: User[];
    availableUsers: User[];
    onSave: (value: User[]) => void;
    onCancel: () => void;
}

/**
 * AssigneeEditor component
 * A custom editor for selecting multiple assignees from a dropdown
 */
const AssigneeEditor: React.FC<AssigneeEditorProps> = (props) => {
  const {
    value = [],
    availableUsers = [],
    onSave,
    onCancel
  } = props;

  // Convert users to options format for react-select
  const userOptions: AssigneeOption[] = availableUsers.map(user => ({
    value: user.id,
    label: user.name,
    data: user
  }));

  // Get the initially selected options
  const getInitialSelectedOptions = () => {
    return value.map(user => ({
      value: user.id,
      label: user.name,
      data: user
    }));
  };

  const [selectedOptions, setSelectedOptions] = useState<AssigneeOption[]>(getInitialSelectedOptions());

  // Handle selection change
  const handleChange = (newValue: any[]) => {
    setSelectedOptions(newValue as AssigneeOption[]);
  };

  // Handle save
  const handleSave = () => {
    const selectedUsers = selectedOptions.map(option => option.data);
    onSave(selectedUsers);
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
        <span>{user.name}</span>
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
    <EditableCellWrapper onSave={handleSave} onCancel={onCancel} saveOnBlur={false} className='!p-0'>
      <SelectBox
        isMulti
        options={userOptions}
        value={selectedOptions}
        onChange={(newValue: any) => handleChange(newValue)}
        formatOptionLabel={(data) => formatOptionLabel(data as AssigneeOption)}
        menuPlacement="auto"
      />
    </EditableCellWrapper>
  );
};

export default AssigneeEditor;

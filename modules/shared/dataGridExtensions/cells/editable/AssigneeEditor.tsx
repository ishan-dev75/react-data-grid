import React, { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import EditableCellWrapper from '@/modules/shared/dataGrid/cells/editable/EditableCellWrapper';
import { User } from '../custom/AssigneeCell';

interface AssigneeOption {
  value: string | number;
  label: string;
  data: User;
}

interface AssigneeEditorProps {
  config: {
    value: User[];
    availableUsers: User[];
    onSave: (value: User[]) => void;
    onCancel: () => void;
  }
}

/**
 * AssigneeEditor component
 * A custom editor for selecting multiple assignees from a dropdown
 */
const AssigneeEditor: React.FC<AssigneeEditorProps> = ({
  config
}) => {
  const {
    value = [],
    availableUsers = [],
    onSave,
    onCancel
  } = config;

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
  const handleChange = (newValue: MultiValue<AssigneeOption>) => {
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

  // Set CSS variables for light/dark mode
  const cssVars = {
    '--bg-color': 'var(--tw-bg-opacity, 1) rgb(255 255 255 / var(--tw-bg-opacity))',
    '--text-color': 'var(--tw-text-opacity, 1) rgb(26 32 44 / var(--tw-text-opacity))',
    '--border-color': 'var(--tw-border-opacity, 1) rgb(226 232 240 / var(--tw-border-opacity))',
    '--border-hover-color': 'var(--tw-border-opacity, 1) rgb(203 213 224 / var(--tw-border-opacity))',
    '--option-focus-bg': 'var(--tw-bg-opacity, 1) rgb(247 250 252 / var(--tw-bg-opacity))',
    '--option-selected-bg': 'var(--tw-bg-opacity, 1) rgb(237 242 247 / var(--tw-bg-opacity))',
    '--option-hover-bg': 'var(--tw-bg-opacity, 1) rgb(247 250 252 / var(--tw-bg-opacity))',
    '--multi-value-bg': 'var(--tw-bg-opacity, 1) rgb(237 242 247 / var(--tw-bg-opacity))',
    '--multi-value-remove-hover-bg': 'var(--tw-bg-opacity, 1) rgb(226 232 240 / var(--tw-bg-opacity))',
    '--multi-value-remove-hover-color': 'var(--tw-text-opacity, 1) rgb(26 32 44 / var(--tw-text-opacity))',
  } as React.CSSProperties;

  // Update CSS variables for dark mode
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    cssVars['--bg-color'] = 'var(--tw-bg-opacity, 1) rgb(45 55 72 / var(--tw-bg-opacity))';
    cssVars['--text-color'] = 'var(--tw-text-opacity, 1) rgb(237 242 247 / var(--tw-text-opacity))';
    cssVars['--border-color'] = 'var(--tw-border-opacity, 1) rgb(74 85 104 / var(--tw-border-opacity))';
    cssVars['--border-hover-color'] = 'var(--tw-border-opacity, 1) rgb(113 128 150 / var(--tw-border-opacity))';
    cssVars['--option-focus-bg'] = 'var(--tw-bg-opacity, 1) rgb(26 32 44 / var(--tw-bg-opacity))';
    cssVars['--option-selected-bg'] = 'var(--tw-bg-opacity, 1) rgb(45 55 72 / var(--tw-bg-opacity))';
    cssVars['--option-hover-bg'] = 'var(--tw-bg-opacity, 1) rgb(26 32 44 / var(--tw-bg-opacity))';
    cssVars['--multi-value-bg'] = 'var(--tw-bg-opacity, 1) rgb(45 55 72 / var(--tw-bg-opacity))';
    cssVars['--multi-value-remove-hover-bg'] = 'var(--tw-bg-opacity, 1) rgb(74 85 104 / var(--tw-bg-opacity))';
    cssVars['--multi-value-remove-hover-color'] = 'var(--tw-text-opacity, 1) rgb(237 242 247 / var(--tw-text-opacity))';
  }

  return (
    <EditableCellWrapper
      onSave={handleSave}
      onCancel={onCancel}
      className="p-2"
      saveOnBlur={false}
    >
      <div className="w-full" style={cssVars}>
        <Select
          isMulti
          options={userOptions}
          value={selectedOptions}
          onChange={handleChange}
          formatOptionLabel={formatOptionLabel}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select assignees..."
          menuPlacement="auto"
          menuPosition="fixed"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: '36px',
              backgroundColor: 'var(--bg-color)',
              borderColor: 'var(--border-color)',
              '&:hover': {
                borderColor: 'var(--border-hover-color)',
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: 'var(--bg-color)',
              zIndex: 9999,
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused
                ? 'var(--option-focus-bg)'
                : state.isSelected
                  ? 'var(--option-selected-bg)'
                  : 'var(--bg-color)',
              color: 'var(--text-color)',
              '&:hover': {
                backgroundColor: 'var(--option-hover-bg)',
              },
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: 'var(--multi-value-bg)',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: 'var(--text-color)',
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: 'var(--text-color)',
              '&:hover': {
                backgroundColor: 'var(--multi-value-remove-hover-bg)',
                color: 'var(--multi-value-remove-hover-color)',
              },
            }),
          }}
        />
      </div>
    </EditableCellWrapper>
  );
};

export default AssigneeEditor;

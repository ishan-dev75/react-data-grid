# SelectBox Component

A customizable dropdown select component based on react-select with additional features:
- Checkbox selection mode for multi-select
- Option to hide selected value chips in the input area
- Dark mode support
- Customizable styling

## Features

### Checkbox Selection Mode
When `showCheckbox` is enabled (default), each option in the dropdown will display a checkbox to indicate its selection status. This makes it easier for users to see which options are selected, especially in multi-select mode.

### Hidden Value Chips
When `hideValueChips` is enabled:
- In multi-select mode: Selected values won't appear as chips in the input area. Instead, a count of selected items will be shown (e.g., "3 selected").
- In single-select mode: The selected value will still be displayed normally, without a count indicator.

This creates a more compact UI where the input field is used purely for searching in multi-select mode, while maintaining a clear indication of the selected value in single-select mode.

### Visible Selected Options
By default (`hideSelectedOptions={false}`), selected options remain visible in the dropdown list. This allows users to easily toggle selections without having to search for options again.

### Smart Menu Closing Behavior
The dropdown menu automatically closes after selection in single-select mode, but remains open in multi-select mode to allow for multiple selections without reopening the dropdown.

### Dark Mode Support
The component automatically detects the system's color scheme and applies appropriate styling for both light and dark modes.

## Props

### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Array<{ value: string \| number, label: string, data?: T }>` | Required | Array of options to display in the dropdown |
| `value` | `{ value: string \| number, label: string, data?: T } \| Array<...>` | - | The selected value(s) |
| `onChange` | `Function` | - | Callback function called when the selected value changes |
| `placeholder` | `string` | `"Select"` | Placeholder text to display when no option is selected |
| `isMulti` | `boolean` | `false` | Whether to allow multiple selections |

### Custom Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCheckbox` | `boolean` | `true` | Whether to show checkboxes next to options in the dropdown |
| `hideValueChips` | `boolean` | `false` | Whether to hide the selected value chips in the input box |
| `hideSelectedOptions` | `boolean` | `false` | Whether to hide options in the dropdown after they've been selected |
| `closeMenuOnSelect` | `boolean` | `true` for single-select, `false` for multi-select | Whether to close the menu when an option is selected |
| `onKeyDown` | `Function` | - | Event handler for keydown events on the select container |

### Styling Props

The component also accepts all styling props from react-select. See the [react-select documentation](https://react-select.com/styles) for more information.

## Usage Examples

### Basic Usage

```jsx
import SelectBox from '@/modules/shared/selectBox/SelectBox';

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SelectBox
      options={options}
      value={selectedOption}
      onChange={setSelectedOption}
      placeholder="Select an option"
    />
  );
}
```

### Multi-Select with Checkboxes

```jsx
import SelectBox from '@/modules/shared/selectBox/SelectBox';

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

function MyComponent() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <SelectBox
      isMulti
      options={options}
      value={selectedOptions}
      onChange={setSelectedOptions}
      placeholder="Select options"
      showCheckbox={true}
      hideValueChips={true}
      hideSelectedOptions={false}
    />
  );
}
```

### With Custom Data

```jsx
import SelectBox from '@/modules/shared/selectBox/SelectBox';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

// Convert users to options format
const options = users.map(user => ({
  value: user.id,
  label: user.name,
  data: user
}));

function MyComponent() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <SelectBox
      options={options}
      value={selectedUser}
      onChange={setSelectedUser}
      placeholder="Select a user"
    />
  );
}
```

### With Custom Option Rendering

```jsx
import SelectBox from '@/modules/shared/selectBox/SelectBox';

const users = [
  { id: 1, name: 'John Doe', avatar: '/avatars/john.jpg' },
  { id: 2, name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
  { id: 3, name: 'Bob Johnson', avatar: '/avatars/bob.jpg' },
];

// Convert users to options format
const options = users.map(user => ({
  value: user.id,
  label: user.name,
  data: user
}));

function MyComponent() {
  const [selectedUser, setSelectedUser] = useState(null);

  // Custom option renderer
  const formatOptionLabel = (option) => {
    const user = option.data;

    return (
      <div className="flex items-center space-x-2">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-6 h-6 rounded-full"
        />
        <span>{user.name}</span>
      </div>
    );
  };

  return (
    <SelectBox
      options={options}
      value={selectedUser}
      onChange={setSelectedUser}
      placeholder="Select a user"
      formatOptionLabel={formatOptionLabel}
    />
  );
}
```

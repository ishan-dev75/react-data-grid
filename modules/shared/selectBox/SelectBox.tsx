import React, { useRef, useEffect } from 'react';
import Select, { type Props as SelectProps, components } from 'react-select';

/**
 * Option type for SelectBox
 *
 * @template T - The type of the data property
 */
type OptionType<T> = {
    /**
     * Unique identifier for the option
     */
    value: string | number;

    /**
     * Display text for the option
     */
    label: string;

    /**
     * Optional data associated with the option
     * This can be used to store additional information about the option
     */
    data?: T;
};

// Define our custom props
type CustomProps = {
    /**
     * Whether to show checkboxes next to options in the dropdown.
     * When true, displays a checkbox next to each option to indicate selection status.
     * @default true
     */
    showCheckbox?: boolean;

    /**
     * Whether to hide the selected value chips in the input box.
     * When true, selected values won't appear as chips in the input area.
     * Instead, a count of selected items will be shown.
     * @default false
     */
    hideValueChips?: boolean;
};

// Combine the standard SelectProps with our custom props
interface SelectBoxProps<T> extends Omit<SelectProps<OptionType<T>>, 'options'>, CustomProps {
    /**
     * Array of options to display in the dropdown.
     * Each option should have a value, label, and optional data property.
     */
    options: OptionType<T>[];

    /**
     * Event handler for keydown events on the select container.
     */
    onKeyDown?: (e: React.KeyboardEvent) => void;

    /**
     * Placeholder text to display when no option is selected.
     * @default "Select"
     */
    placeholder?: string;
}

// Custom Option component with checkbox
const CustomOption = (props: any) => {
    const { isSelected, children } = props;
    // Access custom props via any type assertion
    const selectProps = props.selectProps as any;
    const showCheckbox = selectProps && selectProps.showCheckbox !== false;

    return (
        <components.Option {...props}>
            <div className="flex items-center">
                {showCheckbox && (
                    <div className="mr-2 flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={isSelected || false}
                            onChange={() => null}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                        />
                    </div>
                )}
                {children}
            </div>
        </components.Option>
    );
};

// Custom MultiValue component that can be hidden
const CustomMultiValue = (props: any) => {
    // Access custom props via any type assertion
    const selectProps = props.selectProps as any;
    const hideValueChips = selectProps && selectProps.hideValueChips === true;
    const isMulti = selectProps && selectProps.isMulti === true;

    // For single select with hideValueChips, we still want to show the selected value
    // For multi-select with hideValueChips, we don't show any chips
    if (hideValueChips && isMulti) {
        return null; // Don't render anything for multi-select when chips are hidden
    }

    return <components.MultiValue {...props} />;
};

// Custom ValueContainer to show a count of selected items when chips are hidden
const CustomValueContainer = (props: any) => {
    const { children, selectProps } = props;
    const hideValueChips = selectProps && selectProps.hideValueChips === true;
    const isMulti = selectProps && selectProps.isMulti === true;

    // Safely get the selected values
    let selectedCount = 0;
    try {
        if (selectProps && selectProps.value) {
            // Access the value directly
            const value = Array.isArray(selectProps.value) ? selectProps.value : [selectProps.value];
            selectedCount = value ? value.filter(Boolean).length : 0;
        }
    } catch (error) {
        console.error('Error getting selected values:', error);
    }

    // Only show count for multi-select with more than 1 item or if explicitly set to show for single items
    const showCount = hideValueChips && selectedCount > 0 && (isMulti || selectedCount > 1);

    return (
        <components.ValueContainer {...props}>
            {showCount ? (
                <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        {selectedCount} selected
                    </span>
                    {React.Children.map(children, (child: any) =>
                        child && child.type !== components.MultiValue ? child : null
                    )}
                </div>
            ) : (
                children
            )}
        </components.ValueContainer>
    );
};

/**
 * SelectBox component
 *
 * A customizable dropdown select component based on react-select with additional features:
 * - Checkbox selection mode for multi-select
 * - Option to hide selected value chips in the input area
 * - Dark mode support
 * - Customizable styling
 *
 * @template T - The type of the data property in options
 * @param props - Component props
 * @returns React component
 */
function SelectBox<T>(props: SelectBoxProps<T>) {
    const {
        options,
        placeholder = 'Select',
        onKeyDown,
        /**
         * Whether to hide options in the dropdown after they've been selected.
         * When false (default), selected options remain visible in the dropdown.
         * @default false
         */
        hideSelectedOptions = false,
        showCheckbox = true,
        hideValueChips = false,
        ...restProps
    } = props;

    // Reference to the select component
    const selectRef = useRef<any>(null);

    // Focus the select input when the component mounts
    useEffect(() => {
        if (selectRef.current) {
            // Focus the select input
            setTimeout(() => {
                selectRef.current.focus();
            }, 0);
        }
    }, []);

    // Handle key down events
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Pass the event to the parent component if onKeyDown is provided
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    // Get current theme values for direct use in styles
    const getThemeValues = () => {
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return {
                selectBackground: '#1a202c',
                selectText: '#f7fafc',
                selectBorder: '#4a5568',
                selectBorderHover: '#718096',
                optionHoverBg: '#2d3748',
                optionSelectedBg: '#4a5568',
                multiValueBg: '#4a5568',
                multiValueText: '#f7fafc',
                multiValueRemoveHoverBg: '#718096',
            };
        } else {
            return {
                selectBackground: '#ffffff',
                selectText: '#171717',
                selectBorder: '#e2e8f0',
                selectBorderHover: '#cbd5e0',
                optionHoverBg: '#f7fafc',
                optionSelectedBg: '#edf2f7',
                multiValueBg: '#edf2f7',
                multiValueText: '#2d3748',
                multiValueRemoveHoverBg: '#e2e8f0',
            };
        }
    };

    const themeValues = getThemeValues();

    // Styles for react-select
    const customStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: themeValues.selectBackground,
            color: themeValues.selectText,
            borderColor: themeValues.selectBorder,
            '&:hover': {
                borderColor: themeValues.selectBorderHover,
            },
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: themeValues.selectBackground,
            zIndex: 9999,
        }),
        menuPortal: (base: any) => ({
            ...base,
            zIndex: 9999,
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? themeValues.optionSelectedBg
                : state.isFocused
                    ? themeValues.optionHoverBg
                    : themeValues.selectBackground,
            color: themeValues.selectText,
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: themeValues.multiValueBg,
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: themeValues.multiValueText,
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            '&:hover': {
                backgroundColor: themeValues.multiValueRemoveHoverBg,
            },
        }),
    };

    // Custom components for the select
    const customComponents = {
        Option: CustomOption,
        MultiValue: CustomMultiValue,
        ValueContainer: CustomValueContainer
    };

    // Create a props object with our custom props
    const selectProps = {
        ref: selectRef,
        options,
        className: "my-react-select-container",
        classNamePrefix: "my-react-select",
        placeholder,
        menuPlacement: "auto",
        styles: customStyles,
        components: customComponents,
        hideSelectedOptions,
        // Close menu on select for single select, keep open for multi-select
        closeMenuOnSelect: !(restProps.isMulti === true),
        ...restProps
    };

    // Cast to any to avoid TypeScript errors with our custom props
    const allProps = {
        ...selectProps,
        showCheckbox,
        hideValueChips
    } as any;

    return (
        <div className="w-full" onKeyDown={handleKeyDown}>
            <Select {...allProps} menuPortalTarget={document.body} />
        </div>
    );
}

export default SelectBox;

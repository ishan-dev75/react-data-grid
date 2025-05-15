import React, { useRef, useEffect } from 'react';
import Select, { type Props as SelectProps, components } from 'react-select';

// Define our option type
type OptionType<T> = {
    value: string | number;
    label: string;
    data?: T;
};

// Define our custom props
type CustomProps = {
    showCheckbox?: boolean;
    hideValueChips?: boolean;
};

// Combine the standard SelectProps with our custom props
interface SelectBoxProps<T> extends Omit<SelectProps<OptionType<T>>, 'options'>, CustomProps {
    options: OptionType<T>[];
    onKeyDown?: (e: React.KeyboardEvent) => void;
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

    if (hideValueChips) {
        return null; // Don't render anything for the selected values
    }

    return <components.MultiValue {...props} />;
};

// Custom ValueContainer to show a count of selected items when chips are hidden
const CustomValueContainer = (props: any) => {
    const { children, selectProps } = props;
    const hideValueChips = selectProps && selectProps.hideValueChips === true;

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

    const showCount = hideValueChips && selectedCount > 0;

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

function SelectBox<T>(props: SelectBoxProps<T>) {
    const {
        options,
        placeholder = 'Select',
        onKeyDown,
        hideSelectedOptions = false,
        showCheckbox = true,
        hideValueChips = false,
        ...restProps
    } = props;

    // Combined CSS styles
    const selectRef = useRef<any>(null);

    // Set CSS variables for light mode
    const lightModeCssVars = {
        '--selectBackground': '#ffffff',
        '--selectText': '#171717',
        '--selectBorder': '#e2e8f0',
        '--selectBorderHover': '#cbd5e0',
        '--optionHoverBg': '#f7fafc',
        '--optionSelectedBg': '#edf2f7',
        '--multiValueBg': '#edf2f7',
        '--multiValueText': '#2d3748',
        '--multiValueRemoveHoverBg': '#e2e8f0',
    } as React.CSSProperties;

    // CSS variables for dark mode
    const darkModeCssVars = {
        '--selectBackground': '#1a202c',
        '--selectText': '#f7fafc',
        '--selectBorder': '#4a5568',
        '--selectBorderHover': '#718096',
        '--optionHoverBg': '#2d3748',
        '--optionSelectedBg': '#4a5568',
        '--multiValueBg': '#4a5568',
        '--multiValueText': '#f7fafc',
        '--multiValueRemoveHoverBg': '#718096',
    } as React.CSSProperties;

    let cssVars = {};
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        cssVars = {
            ...darkModeCssVars,
        };
    } else {
        cssVars = {
            ...lightModeCssVars,
        };
    }

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

    // Styles for react-select
    const customStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: 'var(--selectBackground)',
            color: 'var(--selectText)',
            borderColor: 'var(--selectBorder)',
            '&:hover': {
                borderColor: 'var(--selectBorderHover)',
            },
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: 'var(--selectBackground)',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'var(--optionSelectedBg)'
                : state.isFocused
                    ? 'var(--optionHoverBg)'
                    : 'var(--selectBackground)',
            color: 'var(--selectText)',
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: 'var(--multiValueBg)',
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: 'var(--multiValueText)',
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            '&:hover': {
                backgroundColor: 'var(--multiValueRemoveHoverBg)',
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
        closeMenuOnSelect: false,
        ...restProps
    };

    // Cast to any to avoid TypeScript errors with our custom props
    const allProps = {
        ...selectProps,
        showCheckbox,
        hideValueChips
    } as any;

    return (
        <div className="w-full" style={cssVars as React.CSSProperties} onKeyDown={handleKeyDown}>
            <Select {...allProps} />
        </div>
    );
}

export default SelectBox;

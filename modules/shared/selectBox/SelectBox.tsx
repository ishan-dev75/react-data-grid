import React, { useRef, useEffect } from 'react';
import Select, { MultiValue, Props as SelectProps } from 'react-select';

interface SelectBoxProps<T> extends Omit<SelectProps<{ value: string | number; label: string; data?: T }>, 'options'> {
    options: { value: string | number; label: string; data?: T }[];
    // value: { value: string | number; label: string; data?: T }[];
    onKeyDown?: (e: React.KeyboardEvent) => void;
}

const SelectBox = <T,>({
    options,
    placeholder = 'Select',
    onKeyDown,
    ...props // Spread other props passed to the component
}: SelectBoxProps<T>) => {
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

    return (
        <div className="w-full" style={cssVars as React.CSSProperties} onKeyDown={handleKeyDown}>
            <Select
                ref={selectRef}
                options={options}
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                placeholder={placeholder}
                menuPlacement="auto"
                styles={customStyles} // Use consolidated styles
                {...props} // Pass other props to react-select
            />
        </div>
    );
};

export default SelectBox;

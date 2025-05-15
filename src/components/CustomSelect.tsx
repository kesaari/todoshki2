import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isMulti?: boolean;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, isMulti = false, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string | string[]>(isMulti ? [] : '');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue: string) => {
    let newValue: string | string[];
    if (isMulti) {
      if ((selectedValues as string[]).includes(optionValue)) {
        newValue = (selectedValues as string[]).filter(val => val !== optionValue);
      } else {
        newValue = [...(selectedValues as string[]), optionValue];
      }
    } else {
      newValue = optionValue;
      setIsOpen(false);
    }
    setSelectedValues(newValue);
    onChange(newValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDisplayValue = () => {
    if (isMulti) {
      return (selectedValues as string[]).map(val => options.find(opt => opt.value === val)?.label || val).join(', ');
    } else {
      const selectedOption = options.find(opt => opt.value === selectedValues);
      return selectedOption ? selectedOption.label : placeholder;
    }
  };

  return (
    <div ref={selectRef} className="custom-select">
      <div className="custom-select__control" onClick={handleToggle}>
        {getDisplayValue() || placeholder}
      </div>
      {isOpen && (
        <ul className="custom-select__dropdown">
          {options.map((option, index) => (
            <li
              key={index}
              className={`custom-select__option ${(selectedValues as string[]).includes(option.value) ? 'custom-select__option--selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label || option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue = "Sort",
  onChange,
  className,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleChange}
        className={`${className} outline-none`}
      >
        <option value="">
          {defaultValue}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

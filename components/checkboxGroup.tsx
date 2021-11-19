import { KeyboardEvent } from "react";

interface FilterOption {
  id: string;
  name: string;
  [_: string]: any;
}

const _accessor = (option: any) => option;

function CheckboxGroup({
  options,
  selectedOptions,
  setSelectedOptions,
  onCheckboxChange,
  accessor = _accessor,
  className = "",
}: {
  options: FilterOption[];
  selectedOptions: FilterOption[];
  setSelectedOptions: (options: any) => void;
  onCheckboxChange?: (option: FilterOption) => void;
  accessor?: (option: any) => any;
  className?: string;
}) {
  const _onCheckboxChange = (option: FilterOption) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const onChange = onCheckboxChange || _onCheckboxChange;
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    option: FilterOption
  ) => {
    if (e.key === "Enter") {
      onChange(accessor(option));
    }
  };
  return (
    <div className={className}>
      {options?.map((option) => (
        <label
          key={option.id}
          className="py-2 px-4 flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            className="focus:ring-primary h-4 w-4 text-primary border-dark-50 rounded"
            checked={selectedOptions.includes(accessor(option))}
            onChange={() => onChange(accessor(option))}
            onKeyPress={(e) => handleKeyDown(e, option)}
          />
          <span className="pl-3.5 text-dark-100 font-body">{option.name}</span>
        </label>
      ))}
    </div>
  );
}
export default CheckboxGroup;

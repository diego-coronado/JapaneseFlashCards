import { KeyboardEvent } from "react";
import { Option } from "../lib/types";

const _accessor = (option: any) => option;

function CheckboxGroup({
  options,
  selectedOptions,
  setSelectedOptions,
  onCheckboxChange,
  accessor = _accessor,
  className = "",
}: {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: (options: any) => void;
  onCheckboxChange?: (option: Option) => void;
  accessor?: (option: any) => any;
  className?: string;
}) {
  const _onCheckboxChange = (option: Option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const onChange = onCheckboxChange || _onCheckboxChange;
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    option: Option
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
          className="py-2 px-4 flex items-center cursor-pointer w-full"
        >
          <input
            type="checkbox"
            className="focus:ring-gray-600 h-4 w-4 text-gray-600 bg-blue-600 border-gray-200 rounded"
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

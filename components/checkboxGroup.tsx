import { useCallback } from "react";
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

  const isIncluded = useCallback<(option: Option) => boolean>(
    //@ts-ignore
    (option) => {
      return selectedOptions.find(
        (item) => accessor(item) === accessor(option)
      );
    },
    [selectedOptions, accessor]
  );

  return (
    <div className={className}>
      {options?.map((option) => (
        <label
          key={option.id}
          className="py-2 px-4 flex items-center cursor-pointer w-auto"
        >
          <input
            type="checkbox"
            className="focus:ring-gray-600 h-4 w-4 text-gray-600 border-gray-400 rounded"
            checked={isIncluded(option)}
            onChange={() => onChange(option)}
          />
          <span className="pl-3.5 text-dark-100 font-body">
            {accessor(option)}
          </span>
        </label>
      ))}
    </div>
  );
}
export default CheckboxGroup;

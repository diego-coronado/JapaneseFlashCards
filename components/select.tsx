import { Menu } from "@headlessui/react";
import { useState } from "react";
import { Option } from "../lib/types";
import { ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";

const _accessor = (option: Option) => option.name;

function Select({
  options,
  placeholder,
  allowNull = false,
  accessor = _accessor,
  selectedOption,
  setSelectedOption,
}: {
  options: Option[];
  placeholder: string;
  allowNull?: boolean;
  accessor?: (option: Option) => any;
  selectedOption: Option | null;
  setSelectedOption: (option: Option | null) => void;
}) {
  return (
    <Menu as="div" className="inline-block text-left">
      <Menu.Button
        className={clsx(
          "inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none",
          "border rounded-md border-gray-400"
        )}
      >
        {selectedOption ? accessor(selectedOption) : placeholder}
        <ChevronDownIcon
          className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </Menu.Button>
      <Menu.Items className="absolute flex flex-col border border-gray-200 rounded-md space-y-1 mt-1 bg-white py-2">
        {allowNull ? (
          <Menu.Item onClick={() => setSelectedOption(null)}>
            <div className="px-3 cursor-pointer hover:text-blue-600">Delete option</div>
          </Menu.Item>
        ) : null}
        {options?.map((option) => (
          <Menu.Item key={option.id} onClick={() => setSelectedOption(option)}>
            <span className="px-3 cursor-pointer hover:text-blue-600">{accessor(option)}</span>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default Select;

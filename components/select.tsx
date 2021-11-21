import { Menu } from "@headlessui/react";
import { useState } from "react";
import { Option } from "../lib/types";
import { ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";

function Select({
  options,
  placeholder,
  allowNull = false,
}: {
  options: Option[];
  placeholder: string;
  allowNull?: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  console.log(selectedOption);
  return (
    <Menu as="div" className="inline-block text-left">
      <Menu.Button
        className={clsx(
          "inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none",
          "border rounded-md border-gray-400"
        )}
      >
        {selectedOption ? selectedOption.name : placeholder}
        <ChevronDownIcon
          className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </Menu.Button>
      <Menu.Items className="flex flex-col border border-gray-200 rounded-md space-y-1 mt-1">
        {allowNull ? (
          <Menu.Item onClick={() => setSelectedOption(null)}>
            <div className="px-2 cursor-pointer">Delete option</div>
          </Menu.Item>
        ) : null}
        {options.map((option) => (
          <Menu.Item key={option.id} onClick={() => setSelectedOption(option)}>
            <span className="px-2 cursor-pointer">{option.name}</span>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default Select;

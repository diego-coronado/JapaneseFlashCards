import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full bg-gray-200 items-center justify-between px-2 py-1 rounded-lg">
            <span>{title}</span>
            <ChevronUpIcon
              className={`${
                open ? "" : "transform rotate-180"
              } w-5 h-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            {children}
            </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Accordion;

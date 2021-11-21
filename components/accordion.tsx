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
          <Disclosure.Button className="flex border rounded-md border-gray-400 items-center justify-between px-2 py-1">
            <span>{title}</span>
            <ChevronUpIcon
              className={`${open ? "" : "transform rotate-180"} w-5 h-5`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Accordion;

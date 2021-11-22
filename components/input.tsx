import React from "react";
import clsx from "clsx";

function Input({ ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full sm:w-80">
      <input
        type="text"
        {...props}
        className={clsx(
          "h-7 px-3.5 py-2.5 border border-gray-400 rounded-md focus:outline-none focus:ring-0",
          props.error
            ? "focus:ring-error focus:border-error ring-error border-error"
            : "focus:ring-blue-600 focus:border-blue-600"
        )}
      />
    </div>
  );
}

export default Input;

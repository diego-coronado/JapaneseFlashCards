import React from "react";
import clsx from "clsx";

function Input({ ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        {...props}
        className={clsx(
          "h-7 px-3.5 py-2.5 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary",
          props.error
            ? "focus:ring-error focus:border-error ring-error border-error"
            : "focus:ring-primary focus:border-primary"
        )}
      />
    </div>
  );
}

export default Input;

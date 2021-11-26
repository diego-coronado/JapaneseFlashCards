import clsx from "clsx";
import { ReactNode } from "react";

function Button({
  title,
  onClick,
  className = "",
}: {
  title: string | ReactNode;
  onClick: any;
  className?: string;
}) {
  return (
    <button
      className={clsx(
        "bg-white p-2 border border-gray-400 rounded-md",
        className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;

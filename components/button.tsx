import clsx from "clsx";

function Button({
  title,
  onClick,
  className = "",
}: {
  title: string;
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

function Button({ title, onClick }: { title: string; onClick: any }) {
  return (
    <button
      className="bg-white p-2 border border-gray-400 rounded-md"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;

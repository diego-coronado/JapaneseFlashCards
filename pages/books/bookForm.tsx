import Router from "next/router";
import { useCallback, useState } from "react";
import Input from "../../components/input";

export default function BookForm() {
  const [name, setName] = useState("");

  const handleCreateBook = useCallback(async (e) => {
    e.preventDefault();
    await fetch("api/books", {
      body: JSON.stringify({
        name,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    Router.reload();
  }, [name]);

  return (
    <form onSubmit={handleCreateBook} className="flex-col space-y-2">
      <label htmlFor="name">Name:</label>
      <Input
        id="name"
        name="name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <button type="submit">Create</button>
    </form>
  );
}

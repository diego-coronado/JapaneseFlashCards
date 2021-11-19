import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex-col">
      <Link href="/books">Create a new Book</Link>
      <Link href="/chapters">Create a new Chapter</Link>
      <Link href="/word_cards">Create a new Word Card</Link>
    </div>
  );
};

export default Home;

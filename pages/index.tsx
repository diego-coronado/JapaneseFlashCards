import type { NextPage } from "next";
import Link from "next/link";
import Accordion from "../components/accordion";

const Home: NextPage = () => {
  return (
    <div className="flex-col">
      <div>
        <Link href="/books">Create a new Book</Link>
      </div>
      <div>
        <Link href="/chapters">Create a new Chapter</Link>
      </div>
      <div>
        <Link href="/word_cards">Create a new Word Card</Link>
      </div>
      <Accordion title="Test">
        <div>Test</div>
      </Accordion>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import Link from "next/link";
import Accordion from "../components/accordion";
import CheckboxGroup from "../components/checkboxGroup";
import Select from "../components/select";
const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const Home: NextPage = () => {
  return (
    <div>
      <div>
        <Link href="/books">Create a new Book</Link>
      </div>
      <div>
        <Link href="/chapters">Create a new Chapter</Link>
      </div>
      <div>
        <Link href="/word_cards">Create a new Word Card</Link>
      </div>
      <div>
        <Link href="/grammar_cards">Create a new Grammar Card</Link>
      </div>
      <div>
        <Link href="/vocabulary_cards">Create a new Vocabulary Card</Link>
      </div>
      <div>
        <Link href="/kanji_cards">Create a new Kanji Card</Link>
      </div>
      <div>
        <Link href="/vocabulary_lists">Create a new Vocabulary List</Link>
      </div>
      <div>
        <Link href="/grammar_lists">Create a new Grammar List</Link>
      </div>
      <div>
        <Link href="/kanji_lists">Create a new Kanji List</Link>
      </div>
      <div>
        <Link href="/word_lists">Create a new Word List</Link>
      </div>
    </div>
  );
};

export default Home;

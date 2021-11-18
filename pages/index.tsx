import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/chapters">Create a new Chapter</Link>
    </div>
  );
};

export default Home;

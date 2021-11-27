import { Book } from ".prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import GoBackButton from "../../components/goBackButton";
import { getBooks } from "../../lib/db/books";
import { Type } from "../../lib/types";
import { getTypes } from "../../lib/util";
import BookForm from "./bookForm";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="border border-gray-400 rounded-md p-2 flex-col">
      <p>{`Name: ${book.name}`}</p>
      <p>{`Type: ${book.type}`}</p>
    </div>
  );
};

const Books = ({ books, types }: { books: Book[]; types: Type[] }) => {
  const [showBookForm, setShowBookForm] = useState(false);
  const router = useRouter();

  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <h1>Books</h1>
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowBookForm((prev) => !prev)}
      >
        Create a new Book
      </button>
      {showBookForm && <BookForm types={types} />}
      {books.length > 0 ? (
        <ul>
          {book?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      ) : (
        <p>There are no books created yet</p>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const books = await getBooks();
  const types = await getTypes();

  return {
    props: {
      books,
      types,
    },
  };
}

export default Books;

import { Book } from ".prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { getBooks } from "../../lib/db/books";
import BookForm from "./bookForm";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="border border-gray-400 rounded-md p-2 flex-col">
      <p>{`Name: ${book.name}`}</p>
    </div>
  );
};

const Books = ({ books }: { books: Book[] }) => {
  const [showBookForm, setShowBookForm] = useState(false);
  const router = useRouter();

  return (
    <div className="margin-safe py-5 space-y-3">
      <div onClick={() => router.back()} className="text-xs">
        Go back
      </div>
      <h1>Books</h1>
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowBookForm((prev) => !prev)}
      >
        Create a new Book
      </button>
      {showBookForm && <BookForm />}
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
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
  return {
    props: {
      books,
    },
  };
}

export default Books;

"use client";

import { useEffect, useState } from "react";
import { searchBooks, getBooks, addBook, updateStatus } from "@/lib/api";
import BookGrid from "@/components/BookGrid";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [bookshelf, setBookshelf] = useState<any[]>([]);
  const [status, setStatus] = useState("want_to_read");

  async function loadBooks() {
    try {
      const data = await getBooks();
      setBookshelf(data.books || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function handleSearch() {
    if (!query.trim()) return;

    const data = await searchBooks(query);
    setResults(data);
  }

  async function handleAdd(book: any) {
    await addBook({
      ...book,
      status,
    });

    await loadBooks();
  }

  const wantToRead = bookshelf.filter(
    (book) => book.status === "want_to_read" || !book.status
  );

  const currentlyReading = bookshelf.filter(
    (book) => book.status === "currently_reading"
  );

  const finished = bookshelf.filter(
    (book) => book.status === "finished"
  );

  const dnf = bookshelf.filter(
    (book) => book.status === "dnf"
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          📚 Novly
        </h1>

        <div className="flex gap-3 mb-10">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a book..."
            className="flex-1 border rounded-lg p-3 bg-white"
          />

          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Search
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Search Results
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {results.map((book) => (
            <div
              key={book.open_library_id}
              className="bg-white border rounded-xl p-4 flex gap-4"
            >
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded"
                />
              ) : (
                <div className="w-24 h-36 bg-gray-200 rounded flex items-center justify-center text-xs">
                  No Cover
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {book.title}
                </h3>

                <p className="text-gray-600">
                  {book.author}
                </p>

                <div className="flex gap-2 mt-4">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="border rounded-lg px-2"
                  >
                    <option value="want_to_read">
                      Want To Read
                    </option>

                    <option value="currently_reading">
                      Currently Reading
                    </option>

                    <option value="finished">
                      Finished
                    </option>

                    <option value="dnf">
                      DNF
                    </option>
                  </select>

                  <button
                    onClick={() => handleAdd(book)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4">
          📖 Currently Reading
        </h2>

        <BookGrid books={currentlyReading} />

        <h2 className="text-3xl font-bold mt-12 mb-4">
          📚 Want To Read
        </h2>

        <BookGrid books={wantToRead} />

        <h2 className="text-3xl font-bold mt-12 mb-4">
          ✅ Finished
        </h2>

        <BookGrid books={finished} />

        <h2 className="text-3xl font-bold mt-12 mb-4">
          ❌ DNF
        </h2>

        <BookGrid books={dnf} />
      </div>
    </main>
  );
}
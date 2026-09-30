"use client";

import { useEffect, useState } from "react";
import { searchBooks, getBooks, addBook } from "@/lib/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [bookshelf, setBookshelf] = useState<any[]>([]);

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
    await addBook(book);
    await loadBooks();
  }

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

                <button
                  onClick={() => handleAdd(book)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Add to Shelf
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          My Bookshelf
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bookshelf.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                  No Cover
                </div>
              )}

              <div className="p-3">
                <h3 className="font-semibold line-clamp-2">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {book.author}
                </p>

                <span className="inline-block mt-3 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {book.status || "Want to Read"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
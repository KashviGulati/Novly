import { updateStatus } from "@/lib/api";
export default function BookGrid({
  books,
}: {
  books: any[];
}) {
  if (books.length === 0) {
    return (
      <p className="text-gray-500">
        No books yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          {book.cover_url ? (
            <img
              src={book.cover_url}
              alt={book.title}
              className="w-full h-60 object-cover"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
              No Cover
            </div>
          )}

          <div className="p-3">
            <h3 className="font-semibold line-clamp-2 text-black">
              {book.title}
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              {book.author}
            </p>
            <select
                value={book.status || "want_to_read"}
                onChange={async (e) => {
                    await updateStatus(
                    book.id,
                    e.target.value
                    );

                    window.location.reload();
                }}
                className="mt-3 w-full border rounded p-2"
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
            
            <span className="inline-block mt-3 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {book.status === "currently_reading" && "📖 Reading"}
                {book.status === "finished" && "✅ Finished"}
                {book.status === "dnf" && "❌ DNF"}
                {(book.status === "want_to_read" || !book.status) &&
                    "📚 Want To Read"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
const API_URL = "http://localhost:8000";

export async function searchBooks(query: string) {
  try {
    const res = await fetch(
      `${API_URL}/books/search?q=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    console.log("SEARCH:", data);

    return data;
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    throw err;
  }
}

export async function getBooks() {
  try {
    const res = await fetch(
      `${API_URL}/books/`
    );

    console.log("STATUS:", res.status);

    const data = await res.json();

    console.log("BOOKS:", data);

    return data;
  } catch (err) {
    console.error("GET BOOKS ERROR:", err);
    throw err;
  }
}

export async function addBook(book: any) {
  try {
    const res = await fetch(
      `${API_URL}/books/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      }
    );

    const data = await res.json();

    console.log("ADD BOOK:", data);

    return data;
  } catch (err) {
    console.error("ADD BOOK ERROR:", err);
    throw err;
  }
}

export async function updateStatus(
  bookId: string,
  status: string
) {
  const res = await fetch(
    `${API_URL}/books/status/${bookId}?status=${status}`,
    {
      method: "PUT",
    }
  );

  return res.json();
}
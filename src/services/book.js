import { BASE_URL, fentchAndParse, headers } from "./utils";

export function getMyBooks() {
  return fentchAndParse(`${BASE_URL}/book/my-books`, {
    headers,
  });
}

export function getAllBooks() {
  return fentchAndParse(`${BASE_URL}/book`, {
    headers,
  });
}

export function getBookById(id) {
  return fentchAndParse(`${BASE_URL}/book/${id}`, {
    headers,
  });
}

export function addBook(data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("description", data.description);
  formData.append("file", data.file);

  const newHeaders = { ...headers };
  delete newHeaders["Content-Type"];

  return fentchAndParse(`${BASE_URL}/book`, {
    method: "POST",
    body: formData,
    headers: newHeaders,
  });
}

export function updateBook(data, bookId) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("description", data.description);
  formData.append("file", data.file);

  const newHeaders = { ...headers };
  delete newHeaders["Content-Type"];

  return fentchAndParse(`${BASE_URL}/book/${bookId}`, {
    method: "PUT",
    body: formData,
    headers: newHeaders,
  });
}

export function deleteBook(bookId) {
  return fentchAndParse(`${BASE_URL}/book/${bookId}`, {
    method: "DELETE",
    headers,
  });
}

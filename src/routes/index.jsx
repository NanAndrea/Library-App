import { Route, Routes, Navigate } from "react-router-dom";
import * as Pages from "../pages";
import AppLayout from "../layouts/AppLayout";
import { Book } from "../pages/Book";
import ManageBooks from "../pages/ManageBooks";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import NotFound from "../components/NotFound";
import About from "../pages/About";

export default function () {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/manage" element={<ManageBooks />} />
        <Route path="/manage/add" element={<AddBook />} />
        <Route path="/manage/edit/:id" element={<EditBook />} />
      </Route>

      <Route path="/login" element={<Pages.Login />} />
      <Route path="/register" element={<Pages.Register />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

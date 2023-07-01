import { Route, Routes } from "react-router-dom";
import * as Pages from "../pages";
import AppLayout from "../layouts/AppLayout";
import { Book } from "../pages/Book";
import ManageBooks from "../pages/ManageBooks";
import AddBook from "../pages/AddBook";

export default function () {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/book/:id" element={<Book />}/>
        <Route path="/manage" element={<ManageBooks/>}/>
        <Route path="/manage/add" element={<AddBook/>}/>
      </Route>

      <Route path="/login" element={<Pages.Login />} />
      <Route path="/register" element={<Pages.Register />} />
    </Routes>
  );
}

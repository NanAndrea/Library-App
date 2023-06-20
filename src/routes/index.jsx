import { Route, Routes } from "react-router-dom";
import * as Pages from "../pages";
import AppLayout from "../layouts/AppLayout";

export default function () {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Pages.Home />} />
      </Route>

      <Route path="/login" element={<Pages.Login />} />
      <Route path="/register" element={<Pages.Register />} />
    </Routes>
  );
}

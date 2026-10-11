import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Student from "./Student";
import Addstudent from "./Addstudent";
import Updatestudent from "./Updatestudent";

// Simple client-side guard: sends signed-out visitors back to the login page.
function RequireAuth({ children }) {
  const signedIn = sessionStorage.getItem("signedIn") === "true";
  return signedIn ? children : <Navigate to="/" replace />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student" element={<RequireAuth><Student /></RequireAuth>} />
      <Route path="/student/add" element={<RequireAuth><Addstudent /></RequireAuth>} />
      <Route path="/update/:id" element={<RequireAuth><Updatestudent /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

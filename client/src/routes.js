import Login from "./components/Login";
import Signup from "./components/Signup";
import React from "react";
import Upload from "./components/Upload";

export const routes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/upload", element: <Upload /> },
];

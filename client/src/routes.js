import Login from "./components/Login";
import Signup from "./components/Signup";
import React from "react";
import Upload from "./components/Upload";
import Home from "./components/Home";
import VideoPlayer from "./components/VideoPlayer";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/video/:id", element: <VideoPlayer /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/upload", element: <Upload /> },
];

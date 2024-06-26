import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Upload from "./components/Upload.jsx";
import NotFound from "./components/NotFound.jsx";
import Layout from "./components/Layout.jsx";
import View from "./components/View.jsx";
import Document from "./components/Document.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/upload",
    element: (
      <Layout>
        <Upload />
      </Layout>
    ),
  },
  {
    path: "/view/:id/:content",
    element: (
      <Layout>
        <View />
      </Layout>
    ),
  },
  {
    path: "/document",
    element: (
      <Layout>
        <Document />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

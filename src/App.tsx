import React from "react";
import { useAppSelector } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home";
import Login from "./features/login";
import ErrorPage from "./components/error-page/ErrorPage";
import  './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Home />,
  },
]);

const App = () => {
  const count = useAppSelector((state) => state.loginState.value);
  return <RouterProvider router={router} />;
};

export default App;

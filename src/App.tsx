import React from "react";
import { useAppSelector } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home";
import Login from "./features/login";
import ErrorPage from "./components/error-page/ErrorPage";
import  './App.css'
import Profile from "./features/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
]);

const App = () => {
  const count = useAppSelector((state) => state.loginState.value);
  return <RouterProvider router={router} />;
};

export default App;

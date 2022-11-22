import React from "react";
import { useAppSelector } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home";
import Login from "./features/login";
import ErrorPage from "./components/error-page/ErrorPage";
import  './App.css'
import Profile from "./features/Profile/Profile";
import Hotel from "./features/hotel/hotel";
import OrderTour from "./features/order-tour/OrderTour";
import Restaurant from "./features/restaurant/Restaurant";
import Tour from "./features/tour/Tour";
import Voucher from "./features/voucher/Voucher";

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
  {
    path: "/Hotel",
    element: <Hotel />,
  },
   {
    path: "/OrderTour",
    element: <OrderTour />,
  },
    {
    path: "/Restaurant",
    element: <Restaurant />,
  },
  {
    path: "/Tour",
    element: <Tour />,
  },
   {
    path: "/Voucher",
    element: <Voucher />,
  },
]);

const App = () => {
  const count = useAppSelector((state) => state.loginState.value);
  return <RouterProvider router={router} />;
};

export default App;

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./features/home";
import Login from "./features/login";
import ErrorPage from "./components/error-page/ErrorPage";
import "./App.css";
import Profile from "./features/Profile/Profile";
import Hotel from "./features/hotel/hotel";
import Restaurant from "./features/restaurant/Restaurant";
import Tour from "./features/tour/Tour";
import Voucher from "./features/voucher/Voucher";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RestaurantUpdate from "./features/restaurant-update/RestaurantUpdate";
import LoginScreen from "./features/login-screen";
import VoucherCreate from "./features/voucher-create/VoucherCreate";
import VoucherUpdate from "./features/voucher-update/VoucherUpdate";
import RestaurantCreate from "./features/restaurant-create/RestaurantCreate";
import CreateTour from "./features/tour/createTour/createTour";
import TourList from "./features/tour/tourList/tourList";
import HotelCreate from "./features/hotel-create/HotelCreate";
import { ToastContainer } from "react-toastify";
import HotelUpdate from "./features/hotel-update/HotelUpdate";
import TourOrder from "./features/tour-order/TourOrder";
import TourGuide from "./features/tour-guide/TourGuide";
import TourOrderUpdate from "./features/tour-order-update/TourOrderUpdate";
import Blog from "./features/blog";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      const isLogin = localStorage.getItem("Name");
      console.log("123")
      if (!!isLogin) {
        console.log("123xx1")
        return redirect("/Home");
      }
      return 1;
    },
    element: <LoginScreen />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/",
  //   loader: () => {
  //     const isLogin = localStorage.getItem("Name");
  //     console.log("123")
  //     if (!!isLogin) {
  //       console.log("123xx1")
  //       return redirect("/Home");
  //     }
  //   },
  //   element: <Login />,

  //   errorElement: <ErrorPage />,
  // },
  {
    path: "/Home",
    loader: () => {
      const isLogin = localStorage.getItem("Name");
      if (!isLogin) {
        return redirect("/");
      }
      return 1;
    },
    element: <Home />,
    children: [
      {
        path: "/Home/Profile",
        element: <Profile />,
      },
      {
        path: "/Home/Hotel",
        element: <Hotel />,
      },
      {
        path: "/Home/HotelCreate",
        element: <HotelCreate />,
      },
      {
        path: "/Home/HotelCreate",
        element: <HotelCreate />,
      },
      {
        path: "/Home/TourOrder",
        element: <TourOrder />,
      },
      {
        path: "/Home/TourOrderUpdate/:id",
        element: <TourOrderUpdate />,
      },
      {
        path: "/Home/TourGuide",
        element: <TourGuide />,
      },
      {
        path: "/Home/Restaurant",
        element: <Restaurant />,
      },
      {
        path: "/Home/RestaurantUpdate",
        element: <RestaurantUpdate />,
      },
      {
        path: "/Home/Tour",
        element: <Tour />,
        children: [
          { path: "/Home/Tour", element: <TourList /> },
          { path: "/Home/Tour/create", element: <CreateTour /> },
          { path: "/Home/Tour/update/:id", element: <CreateTour /> },
        ],
      },
      {
        path: "/Home/Voucher",
        element: <Voucher />,
      },
      {
        path: "/Home/VoucherCreate",
        element: <VoucherCreate />,
      },
      {
        path: "/Home/VoucherUpdate/:id",
        element: <VoucherUpdate />,
      },
      {
        path: "/Home/RestaurantCreate",
        element: <RestaurantCreate />,
      },
      {
        path: "/Home/HotelUpdate/:id",
        element: <HotelUpdate />,
      },
      {
        path: "/Home/Blog",
        element: <Blog />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;

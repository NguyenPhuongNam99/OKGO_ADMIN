import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home";
import Login from "./features/login";
import ErrorPage from "./components/error-page/ErrorPage";
import "./App.css";
import Profile from "./features/Profile/Profile";
import Hotel from "./features/hotel/hotel";
import OrderTour from "./features/order-tour/OrderTour";
import Restaurant from "./features/restaurant/Restaurant";
import Tour from "./features/tour/Tour";
import Voucher from "./features/voucher/Voucher";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RestaurantUpdate from "./features/restaurant-update/RestaurantUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
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
        path: "/Home/OrderTour",
        element: <OrderTour />,
      },
      {
        path: "/Home/Restaurant",
        element: <Restaurant />
      },
      {
        path: "/Home/RestaurantUpdate",
        element: <RestaurantUpdate />,
      },
      {
        path: "/Home/Tour",
        element: <Tour />,
      },
      {
        path: "/Home/Voucher",
        element: <Voucher />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};

export default App;

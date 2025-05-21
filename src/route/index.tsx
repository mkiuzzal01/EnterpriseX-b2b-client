import { createBrowserRouter } from "react-router-dom";
import Index from "../layout";
import Notification from "../components/pages/notification/Notification";
import Profile from "../components/pages/profile/Profile";
import Overview from "../components/pages/overview/Overview";
import Login from "../components/pages/Login";
import NotFound from "../components/pages/NotFound";
import CreateUser from "../components/pages/users/CreateUser";
import AllUsers from "../components/pages/users/AllUsers";
import CreateProduct from "../components/pages/product/createProduct";
import CreateOrder from "../components/pages/order/createOrder";
import AllProduct from "../components/pages/product/allProduct";
import CreateVariant from "../components/pages/variant/CreateVariant";
import AllVariant from "../components/pages/variant/AllVariant";
import AllCategory from "../components/pages/category/AllCategory";
import CreateCategory from "../components/pages/category/CreateCategory";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create-user",
        element: <CreateUser />,
      },
      {
        path: "/all-users",
        element: <AllUsers />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/all-product",
        element: <AllProduct />,
      },
      {
        path: "/create-variant",
        element: <CreateVariant />,
      },
      {
        path: "/all-variant",
        element: <AllVariant />,
      },
      {
        path: "/create-category",
        element: <CreateCategory />,
      },
      {
        path: "/all-category",
        element: <AllCategory />,
      },
      {
        path: "/create-order",
        element: <CreateOrder />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

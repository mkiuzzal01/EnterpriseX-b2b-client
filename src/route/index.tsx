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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

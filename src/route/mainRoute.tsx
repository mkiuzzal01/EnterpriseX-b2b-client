import { createBrowserRouter } from "react-router-dom";
import Index from "../layout";
import Notification from "../components/notification/Notification";
import Profile from "../components/profile/Profile";
import Overview from "../components/overview/Overview";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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
        path: "/register",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

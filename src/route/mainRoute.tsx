import { createBrowserRouter } from "react-router-dom";
import Index from "../layout";
import Notification from "../components/notification/Notification";
import Profile from "../components/profile/Profile";
import Overview from "../components/overview/Overview";

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
    ],
  },
]);

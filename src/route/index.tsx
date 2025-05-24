import { createBrowserRouter } from "react-router-dom";
import Index from "../layout";
import Notification from "../components/pages/notification/Notification";
import Profile from "../components/pages/profile/Profile";
import Overview from "../components/pages/overview/Overview";
import Login from "../components/pages/Login";
import NotFound from "../components/pages/NotFound";
import CreateUser from "../components/pages/users/CreateUser";
import AllUsers from "../components/pages/users/AllUsers";
import CreateVariant from "../components/pages/variant/CreateVariant";
import AllVariant from "../components/pages/variant/AllVariant";
import AllCategory from "../components/pages/category/AllCategory";
import CreateCategory from "../components/pages/category/CreateCategory";
import CreateNotification from "../components/pages/notification/CreateNotification";
import CreateRequisition from "../components/pages/requisition/CreateRequisition";
import Requisition from "../components/pages/requisition/Requisition";
import CreateFeedback from "../components/pages/feedback/CreateFeedback";
import AllFeedback from "../components/pages/feedback/AllFeedback";
import AllOrder from "../components/pages/order/AllOrder";
import AllSellerPay from "../components/pages/seller-pay/AllSellerPay";
import CreateProduct from "../components/pages/product/CreateProduct";
import AllProduct from "../components/pages/product/AllProduct";
import CreateOrder from "../components/pages/order/CreateOrder";
import Images from "../components/gallery/Images";
import Folder from "../components/gallery/folder";

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
      {
        path: "/all-order",
        element: <AllOrder />,
      },
      {
        path: "/seller-pay",
        element: <AllSellerPay />,
      },
      {
        path: "/create-notice",
        element: <CreateNotification />,
      },
      {
        path: "/all-notice",
        element: <Notification />,
      },
      {
        path: "/create-requisition",
        element: <CreateRequisition />,
      },
      {
        path: "/all-requisition",
        element: <Requisition />,
      },
      {
        path: "/create-feedback",
        element: <CreateFeedback />,
      },
      {
        path: "/all-feedback",
        element: <AllFeedback />,
      },
      {
        path: "/images",
        element: <Images />,
      },
      {
        path: "/folders",
        element: <Folder />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

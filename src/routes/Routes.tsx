import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Product from "../pages/product/Product";
import DashboardLayoutSlots from "../pages/dashboard/Dashboard";
import Orders from "../pages/dashboard/Orders";
import DProducts from "../pages/dashboard/DProducts";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetails from "../pages/product/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayoutSlots />
      </ProtectedRoute>
    ),
    children: [
      {
        // path: "orders",
        index: true,
        element: <Orders />,
      },
      {
        path: "dashboard-products",
        element: <DProducts />,
      },
    ],
  },
]);

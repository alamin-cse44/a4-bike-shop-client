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
import Checkout from "../pages/product/Checkout";
import About from "../pages/about/About";
import SingleCheckout from "../pages/product/SingleCheckout";
import ErrorPayment from "../pages/payment/ErrorPayment";

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
        path: "/about",
        element: <About />,
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
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/single-checkout/:id",
        element: <SingleCheckout />,
      },
      {
        path: "/payment-error",
        element: <ErrorPayment />,
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

import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";

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
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

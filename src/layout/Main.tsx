import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  const location = useLocation();
  const isLogin = location.pathname.includes("login");
  const isSignup = location.pathname.includes("signup");

  return (
    <div>
      {isLogin || isSignup || <Navbar />}
      <Outlet></Outlet>
      {isLogin || isSignup || "Footer!"}
    </div>
  );
};

export default Main;

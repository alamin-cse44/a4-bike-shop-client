import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  if (user?.userRole !== "admin") {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default AdminRoute;

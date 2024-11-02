import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: FC<{
  children?: ReactNode;
  user: boolean;
  redirectTo?: string;
}> = ({ children, user, redirectTo = "/login" }) => {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

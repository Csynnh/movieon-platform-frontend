import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
   children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const location = useLocation();
   const userIsSignedIn = localStorage.getItem("tenant") ? true : false;

   if (!userIsSignedIn) {
      return <Navigate to="/admin/signin" state={{ from: location }} />;
   }

   return children;
};
export default ProtectedRoute;

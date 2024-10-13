import { AuthContext } from "@/providers/AuthProvider";
import { useContext, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRoutesProps {
  children: ReactNode; // Specify type for children
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const location = useLocation();
  const authContext = useContext(AuthContext); // Get AuthContext
  const user = authContext?.user; // Safely access user
  const loading = authContext?.loading; // Safely access loading

  if (loading) {
    return <h1>Loading...</h1>; // Render loading state if loading
  }

  if (user) {
    return <>{children}</>; // Render children if user is authenticated
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;

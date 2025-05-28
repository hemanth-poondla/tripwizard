import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Explicitly block render if no user
  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;

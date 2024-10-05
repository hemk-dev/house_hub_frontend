import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface RoleBasedRouteProps {
  allowedRoles: number[];
  children: React.ReactNode; // Define children prop
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const roleId = parseInt(localStorage.getItem("role") || "0", 10); // Get the stored roleId from localStorage

  // Check if the user's roleId is allowed
  if (!allowedRoles.includes(roleId)) {
    return <Navigate to="/" />; // Redirect to home if not allowed
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  ); // Render the child components if access is granted
};

export default RoleBasedRoute;

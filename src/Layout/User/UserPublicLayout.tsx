import React from "react";
import Navbar from "../../components/Navbar";

// Define the props interface
interface UserPublicRouteProps {
  component: React.ComponentType; // The component to render
}

const UserPublicRoute: React.FC<UserPublicRouteProps> = ({
  component: Component,
}) => {
  return (
    <>
      <Navbar />
      <Component />
    </>
  );
};

export default UserPublicRoute;

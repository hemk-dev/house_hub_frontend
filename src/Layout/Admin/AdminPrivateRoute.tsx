import { Navigate } from "react-router-dom";
// import { Layout } from "antd";

// import { Navigate } from "react-router-dom";
// const { Content } = Layout;

const AdminPrivateRoute = ({ component: Component, ...rest }: any) => {
  const role = localStorage.getItem("roleId");
  console.log("adminprivareroute", role);
  if (role !== "1") {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div style={{ padding: "0" }}>
        <Component />
      </div>
    </div>
  );
};
export default AdminPrivateRoute;

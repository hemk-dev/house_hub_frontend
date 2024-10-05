import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const UserPrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role === "1") {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Navbar />
      <div style={{ padding: "0", marginTop: "16vh" }}>
        <Component />
      </div>
    </div>
  );
};

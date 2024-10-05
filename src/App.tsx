import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./modules/Dashboard/Dashboard";
import UserPublicRoute from "./Layout/User/UserPublicLayout"; // Assuming you have a public layout
import RoleBasedRoute from "./Layout/RoleBasedRoute";
import Signup from "./modules/Auth/Signup";
import Login from "./modules/Auth/Login";
import ForgotPassword from "./modules/Auth/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPublicRoute component={Home} />} />
        <Route path="/login" element={<UserPublicRoute component={Login} />} />
        <Route
          path="/register"
          element={<UserPublicRoute component={Signup} />}
        />
        <Route
          path="/forgot-password"
          element={<UserPublicRoute component={ForgotPassword} />}
        />

        <Route
          path="/dashboard"
          element={
            <RoleBasedRoute allowedRoles={[1, 2]}>
              <Dashboard />
            </RoleBasedRoute>
          }
        />

        {/* Example of how to add more public routes for buyers or other roles
        <Route
          path="/some-other-route"
          element={<RoleBasedRoute allowedRoles={[2, 3]}>

          </RoleBasedRoute>}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;

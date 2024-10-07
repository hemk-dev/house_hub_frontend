import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./modules/Dashboard/Dashboard";
import UserPublicRoute from "./Layout/User/UserPublicLayout"; // Assuming you have a public layout
import RoleBasedRoute from "./Layout/RoleBasedRoute";
import Signup from "./modules/Auth/Signup";
import Login from "./modules/Auth/Login";
import ForgotPassword from "./modules/Auth/ForgotPassword";
import PropertyList from "./modules/Dashboard/pages/PropertyList";
import UserList from "./modules/Dashboard/pages/UserList";
import InquiryList from "./modules/Dashboard/pages/InquiryList";
import List from "./modules/Property/List";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";

function App() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route path="/" element={<UserPublicRoute component={Home} />} />
          <Route
            path="/login"
            element={<UserPublicRoute component={Login} />}
          />
          <Route
            path="/register"
            element={<UserPublicRoute component={Signup} />}
          />
          <Route path="/list" element={<UserPublicRoute component={List} />} />
          <Route
            path="/forgot-password"
            element={<UserPublicRoute component={ForgotPassword} />}
          />
          <Route
            path="/payment-success"
            element={<UserPublicRoute component={PaymentSuccess} />}
          />

          <Route
            path="/payment-failed"
            element={<UserPublicRoute component={PaymentFailed} />}
          />

          <Route
            path="/dashboard"
            element={
              <RoleBasedRoute allowedRoles={[1, 2]}>
                <Dashboard />
              </RoleBasedRoute>
            }
          >
            <Route path="properties" element={<PropertyList />} />
            <Route path="users" element={<UserList />} />
            <Route path="inquiry" element={<InquiryList />} />
          </Route>

          {/* Example of how to add more public routes for buyers or other roles
        <Route
          path="/some-other-route"
          element={<RoleBasedRoute allowedRoles={[2, 3]}>

          </RoleBasedRoute>}
        /> */}
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;

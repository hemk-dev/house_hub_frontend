import "./App.css";
import ForgotPassword from "./modules/Auth/ForgotPassword";
import Home from "./Pages/Home";
import Login from "./modules/Auth/Login";
import Signup from "./modules/Auth/Signup";
import UserPublicRoute from "./Layout/User/UserPublicLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./modules/Property/List";

import AdminPrivateRoute from "./Layout/Admin/AdminPrivateRoute";
import Dashboard from "./modules/Dashboard/Dashboard";
import LandingPage from "./modules/Dashboard/pages/LandingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserPublicRoute component={Home}/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard/*" element={<AdminPrivateRoute component={Dashboard} />}>
            <Route path="landingpage" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="properties" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="order" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="order/orderDetails/:id" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="user" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="addProduct" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="getProduct" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="updateProduct" element={<AdminPrivateRoute component={LandingPage} />} />
            <Route path="deleteProduct" element={<AdminPrivateRoute component={LandingPage} />} />
          </Route>
        </Routes>
      </Router>
      {/* <Navbar /> */}
      <List />
    </>
  );
}

export default App;

import "./App.css";
import ForgotPassword from "./modules/Auth/ForgotPassword";
import Home from "./Pages/Home";
import Login from "./modules/Auth/Login";
import Signup from "./modules/Auth/Signup";
import UserPublicRoute from "./Layout/User/UserPublicLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPrivateRoute from "./Layout/Admin/AdminPrivateRoute";

function App() {
  return (
    <>
            <Router>
        <Routes>
          <Route path="/" element={<UserPublicRoute component={Home}/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

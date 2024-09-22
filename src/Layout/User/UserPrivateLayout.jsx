import React from "react";
import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const { Content } = Layout;

const UserPrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("id");
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Navbar />
            
            <div style={{ padding: "0",marginTop:"16vh" }}>
                <Component />
            </div>
        </div>
    );
};

export default UserPrivateRoute;
import React from "react";
// import { Layout } from "antd";

// import { Navigate } from "react-router-dom";
// const { Content } = Layout;

const AdminPrivateRoute = ({ component: Component, ...rest }:any) => {
    const isAdmin = localStorage.getItem("isAdmin");
    // const admin = JSON.parse(isAdmin);
    console.log(isAdmin);    
    // if (!admin) {
    //     return <Navigate to="/" />;
    // }
    return (
        <div>
            <div style={{ padding: "0" }}>
                <Component />
            </div>
        </div>
    );
};

export default AdminPrivateRoute;
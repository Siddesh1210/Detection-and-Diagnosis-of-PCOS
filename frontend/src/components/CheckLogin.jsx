import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const CheckLogin = () => {
  const auth = localStorage.getItem("access_token");
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default CheckLogin;

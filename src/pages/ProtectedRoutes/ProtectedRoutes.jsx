import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ValidateToken } from "../../api/userApi";
import { useAppContext } from "../../context/AppContext";
import DashboardLayout from "../../components/layout/Layout";

const ProtectedRoute = () => {
  const { user, setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateTokenApi = async () => {
      if (token) {
        try {
          const response = await ValidateToken();
          console.log("resposnes validation", response);
          setUser(response?.user); 
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem("token"); 
        }
      }
      setIsLoading(false);
    };
    validateTokenApi();
  }, []);

  if (isLoading) return <div>Loading...</div>; 

  return token  ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;

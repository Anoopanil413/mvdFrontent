import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ValidateToken } from "../../api/userApi";
import { useAppContext } from "../../context/AppContext";
import DashboardLayout from "../../components/layout/Layout";
import LoaderComp from "../../components/Loader/Loader";

const ProtectedRoute = () => {
  const {  setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateTokenApi = async () => {
      if (token) {
        try {
          const response = await ValidateToken();
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
  if (isLoading) return <div><LoaderComp/></div>; 



  return token  ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;

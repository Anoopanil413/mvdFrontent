import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import LoaderComp from "../../components/Loader/Loader";

const PublicRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) return <div><LoaderComp/></div>;

    return !token ? (
        <Outlet />
    ) : (
        <Navigate to="/dashboard" />
    );
};

export default PublicRoute;
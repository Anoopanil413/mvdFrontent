import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LoginForm from "./pages/Login/Login";
import RegistrationForm from "./pages/Register/Register";
import VerificationForm from "./pages/Login/VerificationForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AddVehicle } from "./pages/AddVehicle/AddVehicle";
import MyVehicles from "./pages/MyVehicles/MyVehicles";
import SearchVehicle from "./pages/SearchVehicles/SearchVehicles";
import UserMessagingInterface from "./pages/Messaging/UserMessaging";
import ProtectedRoute from "./pages/ProtectedRoutes/ProtectedRoutes";
import PageNotFound from "./components/Notfound/PageNOtFound";
import { useEffect } from "react";
import PrivacySettings from "./pages/UserSettings/Usersettigs";

import Toastify from "./components/Toast/Toast";
import PublicRoute from "./pages/PublicRoutes/PublicRoutes";
import { NotificationProvider } from "./context/Notificationcontext";

function App() {
  
  

  return (
    <AppProvider>
      <NotificationProvider>

            <Toastify />

      <Router>
        <Routes>
          <Route element={<PublicRoute/>}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/otp-verification" element={<VerificationForm />} />
          <Route path="/" element={<LoginForm />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicleSearch" element={<SearchVehicle />} />
            <Route path="/addVehicle" element={<AddVehicle />} />
            <Route path="/myVehicle" element={<MyVehicles />} />
            <Route path="/message" element={<UserMessagingInterface />} />
            <Route path="/settings" element={<PrivacySettings />} />
            <Route path="/" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      </NotificationProvider>
    </AppProvider>
  );
}

export default App;

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

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/otp-verification" element={<VerificationForm />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicleSearch" element={<SearchVehicle />} />
            <Route path="/addVehicle" element={<AddVehicle />} />
            <Route path="/myVehicle" element={<MyVehicles />} />
            <Route path="/message" element={<UserMessagingInterface />} />
          </Route>

          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

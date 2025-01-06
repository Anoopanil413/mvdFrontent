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
import { getToken, onMessage } from "@firebase/messaging";
import { sendFCMToken } from "./api/userApi";
import { setLocalStorage } from "./utils/utils";
import Message from "./components/Message/Message";
import { messaging } from "./firebase/firebase";
import Toastify from "./components/Toast/Toast";
import PublicRoute from "./pages/PublicRoutes/PublicRoutes";
const { VITE_APP_VAPID_KEY } = import.meta.env;

   const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register("../service-worker.js");

      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY, 
      });
      console.log("FCM Token:", token);
      await sendFCMToken({token});
     setLocalStorage('fcmToken', token);
      
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

function App() {
  onMessage(messaging, (payload) => {
    toast(<Message notification={payload.notification} />);
  });

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <AppProvider>
            <Toastify />

      <Router>
        <Routes>
          <Route element={<PublicRoute/>}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/otp-verification" element={<VerificationForm />} />
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
    </AppProvider>
  );
}

export default App;

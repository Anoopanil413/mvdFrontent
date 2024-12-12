
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login/Login';
import RegistrationForm from './pages/Register/Register';
import VerificationForm from './pages/Login/VerificationForm';
import { VehicleSearch } from './components/vehicleSearch/VehicleSearch';
import { AddVehicleForm } from './components/vehicles/AddVehicleForm';
import { AppProvider } from './context/AppContext';
// import Registration from './components/Registration';
// import OtpVerification from './components/OtpVerification';
// import Dashboard from './components/Dashboard';
// import VehicleRegistration from './components/VehicleRegistration';
// import UserProfile from './components/UserProfile';

function App() {
  return (
    <AppProvider>
    <Router>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/otp-verification" element={<VerificationForm />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/vehicle-search" element={<VehicleSearch />} />
      <Route path="/addVehicle" element={<AddVehicleForm />} />
      {/* <Route path="/user-profile" element={<UserProfile />} /> */}
      <Route path="*" element={<LoginForm />} />
      </Routes>
    </Router>
    </AppProvider>
    );
}

export default App;
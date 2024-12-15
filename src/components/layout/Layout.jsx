import React, { useState } from 'react';
import { Bell, ChevronLeft, Home, LogOut, Menu, Settings, User,CarFront,Car,CarTaxiFrontIcon, ParkingMeterIcon, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

import { Link, useLocation } from "react-router-dom";
import { useAppContext } from '../../context/AppContext';

import profileImage from "../../assets/profile.jpg";

const NavItem = ({ icon: Icon, label, to, variant = "default" }) => {
  const location = useLocation(); // Get the current path

  const isActive = location.pathname === to; // Check if the current path matches the NavItem's path

  const baseClasses =
    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
  const activeClasses = "bg-indigo-50 text-indigo-700";
  const defaultClasses = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
  const dangerClasses = "text-red-600 hover:bg-red-50";

  const classes = `${baseClasses} ${
    isActive ? activeClasses : variant === "danger" ? dangerClasses : defaultClasses
  }`;

  return (
    <Link to={to} className={classes}>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const {state} = useAppContext();


  const handleSearch = ()=>{
    navigate('/vehicleSearch');
  }
  const handleClear = ()=>{
    localStorage.clear();
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-100">
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">{state?.user?.name}</h3>
              <p className="text-xs text-gray-500">{state?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded p-1 hover:bg-gray-100 md:hidden"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <nav className="space-y-1 p-4">
  <NavItem icon={Home} to="/dashboard" label="Home" />
  <NavItem icon={CarFront} to="/addVehicle" label="Add Vehicle" />
  <NavItem icon={ParkingMeterIcon} to="/myVehicle" label="My Vehicles" />
  <NavItem icon={Settings} to="/settings" label="Settings" />
  
  <div className="my-4 border-t border-gray-200" />
  
  <NavItem icon={LogOut} to="/logout" label="Logout" variant="danger" onClick={handleClear}/>
</nav>

      </aside>

      <div className="flex min-h-screen flex-col md:ml-4 w-[100%]">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded p-1 hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-6 w-6 text-gray-500" />
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="relative rounded p-1 hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <Button  onClick={handleSearch} className=' border-2 border-blue-800/35'>
            <Search className="h-5 w-5 white mr-2" />
            <span>Search Vehicles</span>
            </Button>
          </div>
        </header>

        <main className=" overflow-auto p-4 ">
          {children}
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;


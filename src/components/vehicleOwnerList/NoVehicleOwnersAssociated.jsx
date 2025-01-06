import React from "react";
import { Car, Search, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import image3 from "../../assets/3.png";

const NoVehicleResults = ({ searchedNumber, handleUseraAvailableToggel }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-50 rounded-full" >

          <div className="relative z-10 top-6">
            <img
              src={image3}
              alt="No vehicle found"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute top-4 right-4 bg-blue-100 p-3 rounded-full animate-bounce">
            <Car className="w-6 h-6 text-blue-500" />
          </div>
          <div className="absolute bottom-2 left-2 bg-gray-100 p-3 rounded-full animate-pulse">
            <Search className="w-6 h-6 text-gray-500" />
          </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-orange-50 px-4 py-2 rounded-full">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <span className="text-orange-600 font-medium">
              No Vehicle Found
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">
            Vehicle Not Registered
          </h2>

          {searchedNumber && (
            <p className="text-gray-600">
              No vehicle found with number{" "}
              <span className="font-medium text-blue-600">
                {searchedNumber.toUpperCase()}
              </span>
            </p>
          )}

          <p className="text-gray-500 max-w-sm mx-auto">
            The vehicle you're looking for might not be registered in our
            system. Please verify the number and try again.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg transition-all duration-300"
            onClick={handleUseraAvailableToggel}
          >
            Try Another Search
          </Button>

          <Button
            variant="outline"
            className="w-full border border-gray-200 text-gray-600 py-6 rounded-lg hover:bg-gray-50"
          >
            View Traffic Updates
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500">
          Need help? Contact our{" "}
          <button className="text-blue-500 hover:underline">
            support team
          </button>
        </p>
      </div>
    </div>
  );
};

export default NoVehicleResults;

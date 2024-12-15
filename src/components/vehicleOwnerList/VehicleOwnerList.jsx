import React from 'react';
import { Car, Phone, MapPin, Mail, User, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const VehicleSearchResults = ({ results,handleUseraAvailableToggel }) => {

    const navigate = useNavigate();
  const getVehicleIcon = (type) => {
    const iconProps = { className: "w-6 h-6 text-white" };
    switch (type) {
      case "Two":
        return <Car {...iconProps} />;
      case "Three":
        return <Car {...iconProps} />;
      default:
        return <Car {...iconProps} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className='flex items-center justify-between'>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Search Results
      </h2>
      <div>
        <Button
        onClick={handleUseraAvailableToggel}
        >
            Back

        </Button>
      </div>

        </div>
      <div className="space-y-4">
        {results.map((vehicle) => (
          <Card 
            key={vehicle._id}
            className="bg-white hover:shadow-lg transition-all duration-300 overflow-hidden group"
            onClick={() => {
                navigate(`/message?id=${vehicle._id}`);
            }}
          >
            <div className="p-6">
              {/* Vehicle Info Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 p-3 rounded-full">
                    {getVehicleIcon(vehicle.vehicleType)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{vehicle.name}</h3>
                    <p className="text-blue-600 font-medium">{vehicle.vehicleNumber.toUpperCase()}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4" />

              {/* Owner Info Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{vehicle.userId.name}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{vehicle.userId.email}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    {vehicle.userId.location}, {vehicle.userId.city}
                  </span>
                </div>

                {vehicle.userId.phoneVisible && (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-3 py-2 rounded-full">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{vehicle.userId.phone}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Indicator */}
            <div className={`h-1 w-full ${vehicle.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-600 font-medium">No vehicles found</h3>
          <p className="text-gray-500 text-sm mt-2">Try searching with a different vehicle number</p>
        </div>
      )}
    </div>
  );
};

export default VehicleSearchResults;
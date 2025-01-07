import React from 'react';
import { Car, Bike, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';



const VehicleCard = ({ vehicle, onClick }) => {
  return (
    <Card
      key={vehicle._id}
      className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClick(vehicle)}
    >
      <div className="p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-grow min-w-0">
          <div className="bg-blue-500 p-2 sm:p-3 rounded-full flex-shrink-0">
            {vehicle.isFourWheeler ? (
              <Car className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            ) : (
              <Bike className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-grow">
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
              {vehicle.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {vehicle.vehicleType}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
          <span className="text-blue-600 font-medium text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
            {vehicle.vehicleNumber}
          </span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;


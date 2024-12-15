import React, { useEffect, useState } from 'react'
import { Car, Bike, Plus, ChevronRight,Truck,BikeIcon } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getMyvehicles } from '../../api/userApi';

const MyVehicles = () => {
    const [vehicles,setVehicled] = useState([]);

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await getMyvehicles();
                    console.log(data);
                    setVehicled(data);
                } catch (error) {
                    console.error(error);
                }
            }
        )()

    },[])

    
  return (

    <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <div className="max-w-md mx-auto p-4 space-y-4">
        {vehicles.map((vehicle) => (
          <Card 
            key={vehicle.id}
            className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  {vehicle.isFourWheeler ? (
                    <Car className="w-6 h-6 text-white" />
                  ) : (
                    <BikeIcon className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{vehicle.name}</h2>
                  <p className="text-sm text-gray-600">{vehicle.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-medium">{vehicle.regNumber}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}

        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>ADD NEW VEHICLE</span>
        </Button>
      </div>


            </div>
    </div>

  )
}

export default MyVehicles
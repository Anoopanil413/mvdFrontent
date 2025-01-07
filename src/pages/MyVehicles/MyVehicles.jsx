import React, { useEffect, useState } from 'react';
import { Car, Bike, Plus, ChevronRight, Truck, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { deleteVehicle, getMyvehicles, updateVehicle } from '../../api/userApi';
import { CustomModal } from '../../components/CommonModal/Modal';
import LoaderComp from '../../components/Loader/Loader';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/Toast/Toast';
import VehicleCard from '../../components/vehicles/vehicle-card';

const MyVehicles = () => {
  const { state, userVehicles, updateVehicleData, removeVehicle } = useAppContext()
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    vehicleNumber: ''
  });
  const [vehicleIdtoEdit, setVehicleId] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEditVehicle = (vehicle) => {
    console.log("Editing vehicle:", vehicle);
    setData({ name: vehicle.name, vehicleNumber: vehicle.vehicleNumber });
    setIsOpen(true);
    setVehicleId(vehicle._id)
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting data:", data);
      const vehicleToUpdate = state.vehicles.find(vehicle => vehicle._id === vehicleIdtoEdit);
      if (vehicleToUpdate) {
        const updatedData = { ...data, id: vehicleToUpdate._id };
        const response = await updateVehicle(updatedData);
        updateVehicleData(response);
      }
    } catch (error) {
      showToast("Failed to update!", "warning");
    }
    setIsOpen(false);
  };

  const onDeleteVehicle = async () => {
    try {
      const vehicleToUpdate = state.vehicles.find(vehicle => vehicle._id === vehicleIdtoEdit);
      if (vehicleToUpdate) {
        await deleteVehicle(vehicleToUpdate._id);
        removeVehicle(vehicleToUpdate._id);
      }
    } catch (error) {
      showToast("Failed to delete!", "warning");
    }
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await getMyvehicles();
        userVehicles(data)
      } catch (error) {
        console.error(error);
        showToast("Failed to fetch vehicles!", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <>
      {loading && <div className='height-[85vh]'><LoaderComp /></div>}

      {!loading && (
        <div className="flex items-center justify-center bg-gray-100 ">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <div className="max-w-md mx-auto p-4 space-y-4">
              {state.vehicles.length === 0 ? (
                <div className="text-center py-10">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="w-16 h-16 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Vehicles Found</h2>
                  <p className="text-gray-600 mb-6">You haven't added any vehicles yet. Start by adding your first vehicle!</p>
                  <div className="flex justify-center space-x-4">
                    <Car className="w-10 h-10 text-gray-400" />
                    <Bike className="w-10 h-10 text-gray-400" />
                    <Truck className="w-10 h-10 text-gray-400" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {state.vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle._id}
                      vehicle={vehicle}
                      onClick={handleEditVehicle}
                    />
                  ))}
                </div>
              )}

              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
                onClick={() => navigate('/addVehicle')}
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>ADD NEW VEHICLE</span>
              </Button>
            </div>
          </div>
          <CustomModal
            title="Edit Vehicles"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="number" className="block mb-1">Number</label>
                <input
                  id="number"
                  name="number"
                  type="text"
                  value={data.vehicleNumber}
                  onChange={(e) => setData({ ...data, vehicleNumber: e.target.value })}
                  className="w-full"
                />
              </div>
              <Button className='bg-red-600 border border-red-700 hover:bg-red-500' type="delete" onClick={onDeleteVehicle}>Delete</Button>
            </div>
          </CustomModal>
        </div>
      )}
    </>
  );
};

export default MyVehicles;


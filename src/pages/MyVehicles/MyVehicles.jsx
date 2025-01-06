import React, {  useEffect, useState } from 'react';
import { Car, Bike, Plus, ChevronRight, Truck, BikeIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { deleteVehicle, getMyvehicles, updateVehicle } from '../../api/userApi';
import { CustomModal } from '../../components/CommonModal/Modal';
import LoaderComp from '../../components/Loader/Loader';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/Toast/Toast';

const MyVehicles = () => {
  const {state,userVehicles,updateVehicleData,removeVehicle} = useAppContext()
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    vehicleNumber: ''
  });
  const [vehicleIdtoEdit,setVehicleId] = useState('')
  const[loading,setLoading] = useState(false);
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
  const onDeleteVehicle = async()=>{
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
        
      }finally{
        setLoading(false);
      }
    };
    console.log("fetching vehicles inside the useeffect");
    fetchVehicles();
  }, []);

  return (
    <>
    {loading && <div className='height-[85vh]' ><LoaderComp/></div>}

    {!loading &&<div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="max-w-md mx-auto p-4 space-y-4">  
          {state.vehicles.map((vehicle) => (
            <Card
              key={vehicle._id}
              className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
              onClick={() => handleEditVehicle(vehicle)}
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
                    <p className="text-sm text-gray-600">{vehicle.vehicleType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-medium">{vehicle.vehicleNumber}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
          onClick={()=>navigate('/addVehicle')}
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
    </div>}
              </>
  );
};

export default MyVehicles;

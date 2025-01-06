import React, { useState } from 'react';
import { Menu, Bell, Search, CarFront, Loader } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { searchVehicle } from '../../api/userApi';
import { useAppContext } from '../../context/AppContext';
import VehicleSearchResults from '../../components/vehicleOwnerList/VehicleOwnerList';
import NoVehicleResults from '../../components/vehicleOwnerList/NoVehicleOwnersAssociated';
import imageLand from '../../assets/landscape.png';
import searchVEhicle from '../../assets/4.png'
import { showToast } from '../../components/Toast/Toast';

const SearchVehicle = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleOwnerAvailable,setVehicleOwneravailable] = useState(false);
  const {setVehicleOwnerList,state,clearVehicleOwnerList} = useAppContext();
  const userName = "Sarath Nambiar";
  const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;

  const handleUseraAvailableToggel = () => {
    setVehicleOwneravailable(false);
    clearVehicleOwnerList();
  }


  const handleFindVehicleOwner = async() => {
    try {
        if (!vehicleNumberPattern.test(vehicleNumber.trim())) {
          showToast("Invalid number!", "error");
            return;
        }
        const vehicleNumb = vehicleNumber.trim().toLowerCase();
        const userLists = await searchVehicle({vehicleNumber:vehicleNumb});
        setVehicleOwnerList(userLists);
        setVehicleOwneravailable(true);
 
    } catch (error) {
        setVehicleOwneravailable(false);
        showToast("Search failed!", "error");

    }

  }


  return (
    <>


    {!vehicleOwnerAvailable &&
     <div className="bg-gray-50 flex flex-col items-center justify-center h-auto">



          <div className="w-full flex flex-col items-center justify-center space-y-8">
        <div className="max-w-sm mx-auto">
          <img 
            src={searchVEhicle}
            alt="City skyline"
            className=""
            />
        </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-medium text-gray-800 text-center">Hello {state?.user?.name}</h2>
              <p className="text-gray-600 mt-2">
                We will help you find out the vehicle blocking your way.
              </p>
            </div>

            <div className="space-y-4 w-full max-w-md mx-auto md:mx-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="TYPE VEHICLE NUMBER"
                  className="w-full h-12 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

              </div>

              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg transition-all duration-300 transform hover:scale-102"
              onClick={handleFindVehicleOwner}>
                FIND VEHICLE OWNER
              </Button>

              <Button
                variant="ghost"
                className="w-full border border-gray-200 text-gray-600 py-6 rounded-lg hover:bg-gray-50"
                >
                TRAFFIC UPDATES
              </Button>
            </div>

          </div>

          {/* <div className="w-full ">
            <div className="relative">
              <div className=" z-10 ">
                <img 
                  src={imageLand}
                  alt="Blocked vehicles illustration"
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
                                          
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-50 rounded-full opacity-50" />
            </div>
          </div> */}


      {/* City Illustration at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <div className="max-w-6xl mx-auto">
          {/* <img 
            src={imageLand}
            alt="City skyline"
            className="w-full opacity-30"
            /> */}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 group">
        <Bell className="w-6 h-6 text-white group-hover:animate-wiggle" />
      </button>
    </div>}
    {vehicleOwnerAvailable && ((vehicleOwnerAvailable && state.vehicleOwnerLIst.length > 0)?(
        <>
        <VehicleSearchResults results={state.vehicleOwnerLIst} handleUseraAvailableToggel={handleUseraAvailableToggel} />
        </>

    ):(
        <>
        <NoVehicleResults searchedNumber={vehicleNumber} handleUseraAvailableToggel={handleUseraAvailableToggel}/>
        </>

)
)


}

</>
  );
};

export default SearchVehicle;
// import { useState } from "react";

// import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";
import { useState } from "react";
import { createVehicle } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { showToast } from "../Toast/Toast";


export function AddVehicleForm() {

    const [vehicleType, setVehicleType] = useState("");
    const [formData, setFormData] = useState({
        vehicleType: "Four",
        name: "",
        vehicleNumber: ""
      })
      const navigate = useNavigate()
    const vehicleTypesin = [
        { value: "Four", label: "Four Wheeler" },
        { value: "Three", label: "Three Wheeler" },
        { value: "Two", label: "Two Wheeler" },
        { value: "Heavy", label: "Heavy" }
    ]; 


    const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;

    const handleVehicleSave = async(event) => {
        event.preventDefault();
        console.log("formData", formData);
        if (!vehicleNumberPattern.test(formData.vehicleNumber)) {
            showToast("Invalid format!", "error");
            return;
        }
        try {
            console.log("formData", formData);
            await createVehicle(formData);
            navigate("/myVehicle");
            
        } catch (error) {
            showToast("Something went wrong!", "error");

        }
    }

    return (
        <form className="space-y-6 p-4" onSubmit={handleVehicleSave}>
            <Select 
                options={vehicleTypesin} 
                value={vehicleType || vehicleTypesin[0].value}
                onChange={(e) =>{ 
                    setVehicleType(e.target.value);
                    setFormData({...formData, vehicleType: e.target.value});
                }}
                className="w-full h-12 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
            />
            <Input 
                placeholder="Vehicle name"
                className="w-full h-12 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />

            <Input 
                placeholder="Registration number"
                className="w-full h-12 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
                onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
            />

            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600" >Save</Button>
        </form>
    );
}
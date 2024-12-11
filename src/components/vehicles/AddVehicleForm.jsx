
// import { useState } from "react";

// import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";


export function AddVehicleForm() {

    // const [vehicleType, setVehicleType] = useState("");
    // const vehicleTypesin = [
    //     { value: "heavy", label: "Heavy" },
    //     { value: "four-wheeler", label: "Four Wheeler" },
    //     { value: "two-wheeler", label: "Two Wheeler" }
    // ]; 
    
    // console.log("vehicleType", vehicleType);
    return (
        <form className="space-y-6 p-4">
            {/* <Select value={vehicleTypesin} onValueChange={setVehicleType}> */}
                {/* <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="four-wheeler">Four Wheeler</SelectItem>
                    <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
                </SelectContent> */}
            {/* </Select> */}

            <Input placeholder="Vehicle name" />
            <Input placeholder="Registration number" />

            <Button className="w-full bg-sky-500 hover:bg-sky-600">Save</Button>
        </form>
    );
}
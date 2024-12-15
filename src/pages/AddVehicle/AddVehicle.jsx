import React from 'react';
import { AddVehicleForm } from '../../components/vehicles/AddVehicleForm';

export function AddVehicle() {
    return (
            <main>


        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Add New Vehicle</h1>
                <AddVehicleForm />
            </div>
        </div>
            </main>

    );
}

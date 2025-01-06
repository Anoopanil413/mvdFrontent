import React from 'react';
import { Bell, Car, MapPin, Shield, Users } from 'lucide-react';
import letMEgo from '../../assets/parkingact3.jpeg';

const DashBoardInfo = () => {
    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Left Section: Image/Video */}
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                                <img
                                    src={letMEgo}
                                    alt="Vehicle parking illustration"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h2 className="text-2xl font-bold text-white">LetMeGo: Your Parking Guardian</h2>
                                    <p className="mt-2 text-sm text-gray-200">Ensuring proper parking through community cooperation</p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">How It Works</h3>
                                    <p className="mt-2 text-gray-600">
                                    LetMeGo is a community-driven platform that helps maintain proper parking etiquette. Here's how it works:
                                    </p>
                                    <ul className="mt-4 space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <Car className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                <span className="font-medium text-gray-900">Register Your Vehicle:</span> Add your vehicle details and contact information to our secure database.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <MapPin className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                <span className="font-medium text-gray-900">Report Improper Parking:</span> Users can report incorrectly parked vehicles through our easy-to-use app.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <Bell className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                <span className="font-medium text-gray-900">Instant Notifications:</span> If your vehicle is reported, you'll receive an immediate notification to take action.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <Shield className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                <span className="font-medium text-gray-900">Privacy Protection:</span> Your personal information is kept confidential and only used for notification purposes.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 text-indigo-600" />
                                        <span className="ml-2 text-sm font-medium text-gray-900">1,234 Active Users</span>
                                    </div>
                                    <button className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        View Your Notifications
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashBoardInfo;
import React, { useEffect, useState } from 'react';
import { Phone, Mail, Image, Bell, Home, Eye, EyeOff, Badge, BadgeAlert,MessageCircleIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAppContext } from '../../context/AppContext';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import MessageModal from '../../components/Modal/MessageMOdal';
import { niotificationTypes } from '../../utils/utils';



const UserMessagingInterface = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageType, setMessageType] = useState(niotificationTypes.sendMessage);
  const {state} = useAppContext();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
const [user, setUser] = React.useState(null);

useEffect(() => {
    const vehicleOwner = state?.vehicleOwnerLIst.find(owner => owner._id === id);

    if(!vehicleOwner){
        navigate('/vehicleSearch')

    }
    setUser(vehicleOwner);
}, [id, state.vehicleOwners]);

const handleSendingSms = () => {
    console.log("Sending SMS")
    setIsModalOpen(true);

}



  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-500">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Section */}
        <div className="text-center text-white space-y-8 py-12">
          {/* Avatar */}
          <div className=" mx-auto flex justify-center items-center">
            <div className=" inset-0 bg-blue-300 rounded-full animate-pulse blur-xl opacity-50" />
            <div className=" w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold border-4 border-white shadow-xl">
              {user?.userId.name?.charAt(0) || 'U'}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold">User Details</h1>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xl">Name: {user?.userId.name || 'User'}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">Phone No: {(showPhone &&user?.userId?.phoneVisible) ? (user?.userId?.phone || '1234567890') : '**********'}</span>
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="hover:bg-blue-600 p-1 rounded-full transition-colors"
              >
                {showPhone ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <Card className="bg-white rounded-xl shadow-xl ">
  <div className="grid grid-cols-2 gap-y-2 gap-x-4 place-items-center">
    {[
      { icon: Phone, label: 'Call User', color: 'bg-green-500', onClick: () => setMessageType(niotificationTypes.callUser) },
      { icon: MessageCircleIcon, label: 'Send SMS', color: 'bg-blue-500',onClick: () => setMessageType(niotificationTypes.sendMessage) },
      { icon: Image, label: 'Send Image', color: 'bg-purple-500',onClick: () => setMessageType(niotificationTypes.sendImage) },
      { icon: Bell, label: 'Send Notification', color: 'bg-orange-500',onClick: () => setMessageType(niotificationTypes.sendNotification) },
    ].map((action, index) => (
      <Button
        key={index}
        variant="ghost"
        className="flex flex-col items-center justify-center w-full max-w-[150px] h-[150px] hover:bg-gray-50 rounded-xl transition-all duration-300 group"
        onClick={()=>{

          action.onClick()
          handleSendingSms()
        }
        }
        >
        <div
          className={`${action.color} p-4 rounded-full mb-3 group-hover:scale-110 transition-transform`}
          >
          <action.icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-gray-700 font-medium text-sm text-center">
          {action.label}
        </span>
      </Button>
    ))}
  </div>
</Card>


        {/* Home Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
            <Home className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 -z-10 animate-blob" />
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10 animate-blob animation-delay-2000" />
    </div>
    <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        messageType={messageType}
      />

  </>
  );
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
}
`;
document.head.appendChild(style);

export default UserMessagingInterface;
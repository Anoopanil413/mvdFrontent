import React from "react";
import { PhoneCall } from "lucide-react";

const CallUser = ({ phoneNumber }) => {
  const handleCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("No phone number available.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      {phoneNumber ? (
        <button
          onClick={handleCall}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          <PhoneCall className="w-5 h-5" />
          Call User: {phoneNumber}
        </button>
      ) : (
        <p className="text-gray-400">The user has no public phone number.</p>
      )}
    </div>
  );
};

export default CallUser;

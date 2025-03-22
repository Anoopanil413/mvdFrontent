import React, { useState } from "react";
import { customMessage } from "../../utils/utils";
import { sendNotificationToUser } from "../../api/userApi";

const SendNotification = ({  user,onClose }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");


  const handleSendNotification = async () => {
    if (!user || !user.userId._id) {
      setStatus("User data is missing.");
      return;
    }

    setLoading(true);
    setStatus("");

    const messages = customMessage(user);
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const payload = {
      receiverId: user.userId?._id,
      title: "Vehicle Notification",
      body: randomMessage,
    };

    try {
       await sendNotificationToUser(payload);
        setStatus("Notification sent successfully.");
        onClose();
 
    } catch (error) {
        console.log("error",error)
      setStatus("Error sending notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h2 className="text-lg font-semibold">Send Vehicle Notification</h2>
      <button
        onClick={handleSendNotification}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Notification"}
      </button>
      {status && <p className="text-sm text-gray-300">{status}</p>}
    </div>
  );
};

export default SendNotification;

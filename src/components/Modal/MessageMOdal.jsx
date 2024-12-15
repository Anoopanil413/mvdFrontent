import React, { useState } from "react";
import Modal from "react-modal";
import { X, Send } from "lucide-react";

Modal.setAppElement("#root");

const MessageModal = ({ isOpen, onClose, user }) => {
  const [message, setMessage] = useState("");
  const handleMessageSend = async() => {
    const data = {
        userId:user?.userId?._id,
        vehicleId:user?.vehicleId,
        message:message
    }
    try {
        
        await sendUserMessage(data);
    } catch (error) {
        alert('Error sending message:');
    }
  }

  // Predefined message suggestions
  const suggestions = [
    `Your vehicle ${user?.vehicleNumber} is blocking the driveway.`,
    `Your vehicle ${user?.vehicleNumber} is causing an obstruction.`,
    `Kindly move your vehicle ${user?.vehicleNumber} to avoid inconvenience.`,
    `Your vehicle ${user?.vehicleNumber} needs immediate attention.`,
    `Please relocate your vehicle ${user?.vehicleNumber} to a proper spot.`,
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal Content */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Notify User About Vehicle
      </h2>

      {/* Input Field */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        placeholder="Type your message here..."
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
      />

      {/* Suggestions */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Suggestions:</p>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              className="w-full text-left text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Notify Button */}
      <button
        onClick={async() => {
        await handleMessageSend();
          alert(`Message sent: ${message}`);
          onClose();
        }}
        disabled={!message.trim()}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium ${
          message.trim()
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        <Send className="w-5 h-5" />
        Notify User
      </button>
    </Modal>
  );
};

export default MessageModal;

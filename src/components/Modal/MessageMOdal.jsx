import React, { useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import SendSms from "../Notifications/SendSms";
import { niotificationTypes } from "../../utils/utils";
import CallUser from "../Notifications/CallUser";
import SendNotification from "../Notifications/sendNotification";

Modal.setAppElement("#root");

const MessageModal = ({ isOpen, onClose, user,messageType }) => {


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
      {messageType === niotificationTypes.sendMessage && <SendSms  onClose={onClose} user={user}/>}
      {messageType=== niotificationTypes.callUser && <CallUser  phoneNumber={user.userId?.phone}/>}
      {messageType=== niotificationTypes.sendImage && <div>Send Image</div>}
      {messageType=== niotificationTypes.sendNotification && <SendNotification user={user} onClose={onClose} />}
    </Modal>
  );
};

export default MessageModal;

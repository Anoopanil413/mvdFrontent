import React, { useState } from 'react';
import { Send } from 'lucide-react'; // Assuming you have react-icons installed
import { customMessage } from '../../utils/utils';
import { sendUserMessage } from '../../api/userApi';

const SendSms = ({   onClose,user }) => {
    const [message, setMessage] = useState('');
    const Messagesuggestions = customMessage(user);
      const handleMessageSend = async() => {
        const data = {
            userId:user?.userId?._id,
            vehicleId:user?._id,
            message:message
        }
        try {
            
            await sendUserMessage(data);
        } catch (error) {
            alert('Error sending message:');
        }
      }

    return (
        <div>
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
                    {Messagesuggestions.map((suggestion, index) => (
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
                onClick={async () => {
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
        </div>
    );
};

export default SendSms;
import React from 'react';

interface NotificationModalProps {
  message: string;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, onClose }) => {
  const getButtonBgColor = () => {
    if (message === "Registration successful!") {
      return "bg-green-500";
    } else if (message.startsWith("Please fill the")) {
      return "bg-yellow-500";
    } else if (message === "An error occurred during registration.") {
      return "bg-red-500";
    } else {
      return "bg-gray-500"; // Default color if no conditions match
    }
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            <div className="mb-8">
              <p className="text-gray-600 text-center text-xl font-bold">{message}</p>
            </div>
            <div className="space-y-4">
              <button
                className={`p-3 rounded-full text-white w-full font-semibold ${getButtonBgColor()}`}
                onClick={onClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

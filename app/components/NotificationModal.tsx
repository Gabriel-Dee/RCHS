import React from 'react';

interface NotificationModalProps {
  message: string;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl text-center font-extrabold">Attention</h1>
              <p className="text-gray-600 text-center">{message}</p>
            </div>
            <div className="space-y-4">
              <button
                className="p-3 bg-red-500 rounded-full text-white  w-full font-semibold"
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

import React from "react";

const NavigationMenu: React.FC = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
      <div className="space-y-5">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-blue-200 p-1">
          <ul className="flex items-center gap-2 text-sm font-medium">
            <li className="flex-1">
              <a
                href="#"
                className="text-gra relative flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 shadow hover:bg-white hover:text-gray-700"
              >
                Profile
              </a>
            </li>
            <li className="flex-1">
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
              >
                Preferences
              </a>
            </li>
            <li className="flex-1">
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
              >
                Notifications
              </a>
            </li>
            <li className="flex-1">
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
              >
                Applications
              </a>
            </li>
            <li className="flex-1">
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
              >
                API
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;

import React, { useState } from "react";

interface TabsProps {
  tabs: { name: string; content: React.ReactNode }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  return (
    <div className="analytics-page items-center justify-center p-5 bg-white border border-blue-500 rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-6">Health Care Analytics</h1>

      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:flex justify-center">
        <nav className="flex gap-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href="#"
              className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                selectedTab === tab.name
                  ? "bg-sky-100 text-sky-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
              onClick={() => setSelectedTab(tab.name)}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {tabs.map((tab) =>
          selectedTab === tab.name ? (
            <div key={tab.name}>{tab.content}</div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;

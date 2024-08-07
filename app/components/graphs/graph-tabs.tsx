"use client";
import React, { useState } from "react";
import { CardItem } from "@/types/types";
import BoyBmiStatistics0to2 from "./patient-bmi-age-boys0to2";
import BoyStatistics0t02 from "./patient-length-age-boys-0t02";
import BoyWeightStatistics from "./patient-weight-age-boys";

enum Menu {
  LENGTH_HEIGHT = "Length/Height",
  WEIGHT = "Weight",
  BMI = "BMI",
}

interface CardProps {
  cardData: CardItem[];
}

const NavigationMenu: React.FC<CardProps> = ({ cardData = [] }) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  // Ensure cardData is an array
  if (!Array.isArray(cardData)) {
    console.error("cardData is not an array", cardData);
    return <p>Invalid card data</p>;
  }

  const handleMenuClick = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
      <h2 className="text-2xl text-gray-900 font-bold text-center">
        Child Growth Curves
      </h2>

      <div className="space-y-5 mt-5">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-blue-200 p-1">
          <ul className="flex items-center justify-between gap-4 text-sm font-medium">
            <li
              className={`flex-1 text-center ${
                selectedMenu === Menu.LENGTH_HEIGHT
                  ? "focus:outline-none focus:ring-2 focus:ring-rchs"
                  : ""
              }`}
            >
              <button
                onClick={() => handleMenuClick(Menu.LENGTH_HEIGHT)}
                className="relative flex items-center justify-center w-full h-12 rounded-lg bg-white px-3 py-2 shadow hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Length/Height Vs Age
              </button>
            </li>
            <li
              className={`flex-1 text-center ${
                selectedMenu === Menu.WEIGHT
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : ""
              }`}
            >
              <button
                onClick={() => handleMenuClick(Menu.WEIGHT)}
                className="flex items-center justify-center w-full h-12 rounded-lg bg-white px-3 py-2 shadow hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Weight Vs Age
              </button>
            </li>
            <li
              className={`flex-1 text-center ${
                selectedMenu === Menu.BMI
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : ""
              }`}
            >
              <button
                onClick={() => handleMenuClick(Menu.BMI)}
                className="flex items-center justify-center w-full h-12 rounded-lg bg-white px-3 py-2 shadow hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                BMI Vs Age
              </button>
            </li>
          </ul>
        </div>
        {selectedMenu === Menu.LENGTH_HEIGHT && <BoyStatistics0t02 cardData={cardData} />}
        {selectedMenu === Menu.WEIGHT && <BoyWeightStatistics cardData={cardData} />}
        {selectedMenu === Menu.BMI && <BoyBmiStatistics0to2 cardData={cardData} />}
      </div>
    </div>
  );
};

export default NavigationMenu;

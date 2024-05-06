
"use client";
import React, { useEffect, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

const AboutStatisticss: React.FC = () => {
  const [statsData, setStatsData] = useState<any[]>([]);

  // Simulating fetching data from the database
  useEffect(() => {
    // Mock data representing statistics cards
    const mockData = [
      { title: "Total Revenue", value: "$8,141", percentage: "3%" },
      { title: "New Orders", value: "217", percentage: "5%" },
      { title: "New Connections", value: "54", percentage: "7%" },
    ];
    // Simulate delay for fetching data
    const fetchData = setTimeout(() => {
      setStatsData(mockData);
    }, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(fetchData);
  }, []);

  useEffect(() => {
    const DATA_SET_VERTICAL_BAR_CHART_1 = [
      68.106, 26.762, 94.255, 72.021, 74.082, 64.923, 85.565, 32.432, 54.664,
      87.654, 43.013, 91.443,
    ];
    const labels_vertical_bar_chart = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dataVerticalBarChart = {
      labels: labels_vertical_bar_chart,
      datasets: [
        {
          label: "Revenue",
          data: DATA_SET_VERTICAL_BAR_CHART_1,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
      ],
    };
    const configVerticalBarChart: ChartConfiguration<"bar", number[], string> =
      {
        type: "bar",
        data: dataVerticalBarChart,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Last 12 Months",
            },
          },
        },
      };

    const canvasElement = document.getElementById("verticalBarChart");
    if (canvasElement instanceof HTMLCanvasElement) {
      var verticalBarChart = new Chart(canvasElement, configVerticalBarChart);
    }

    return () => {
      // Clean up the chart instance when the component unmounts
      if (verticalBarChart) {
        verticalBarChart.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full 2xl:w-2/3 min-w-full ">
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
        <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Render statistics cards */}
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-600">
                  {stat.title}
                </span>
                <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                  7 days
                </span>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <svg
                    className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <span className="text-2xl 2xl:text-3xl font-bold">
                      {stat.value}
                    </span>
                    <div className="flex items-center ml-2 mb-1">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <span className="font-bold text-sm text-gray-500 ml-0.5">
                        {stat.percentage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <canvas id="verticalBarChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default AboutStatisticss;

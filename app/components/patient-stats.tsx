"use client";
import React, { useEffect } from "react";
import Chart, { ChartConfiguration, Tick } from "chart.js/auto";

const AboutStatistics: React.FC = () => {
  useEffect(() => {
    // Data preparation
    const dataLengthAgainstAge = [
      // First year (0-11 months)
      45,
      46,
      48,
      50,
      51.5,
      52,
      54,
      55.5,
      57,
      58.5,
      60,
      62,
      // Second year (12-23 months)
      65,
      66.5,
      67.5,
      69,
      70.5,
      72,
      73.5,
      75,
      76,
      78,
      80,
      82,
      // Third year (24-35 months)
      85,
      87.5,
      88,
      90,
      95,
      102.5,
      103,
      105,
      106,
      107,
      108,
      109,
      // Fourth year (36-47 months)
      110,
      110.5,
      111.5,
      112.5,
      113.5,
      114.5,
      115,
      115.5,
      116,
      116.5,
      117,
      117.5,
      // Fifth year (48-59 months)
      118,
      118.5,
      119,
      119.5,
      120.5,
      121,
      122,
      123,
      124,
      124.5,
      125,
      125,
      // Sixth year (60 months)
      125, // The child's height will reach 125 cm by the end of the sixth year
    ];

    const labelsMonths = Array.from({ length: 60 }, (_, i) =>
      (i + 1).toString()
    ); // Convert numbers to strings

    // Chart configuration
    const dataLineChart = {
      labels: labelsMonths,
      datasets: [
        {
          label: "Length vs Age",
          data: dataLengthAgainstAge,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          tension: 0.4, // Adjust tension for smoother curves, if needed
        },
      ],
    };

    const configLineChart: ChartConfiguration<"line", number[], string> = {
      type: "line",
      data: dataLineChart,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Child Growth Chart",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Age (months)",
            },
            ticks: {
              callback: (
                value: string | number,
                index: number,
                values: Tick[]
              ) => {
                const typedValues = values as unknown as (string | number)[];
                if (typeof value === "number" && value % 12 === 0) {
                  return `Year ${value / 12}`;
                }
                return value.toString();
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Length (cm)",
            },
            min: 40,
            max: 135, // Maximum height
            ticks: {
              callback: (
                value: string | number,
                index: number,
                values: Tick[]
              ) => {
                const typedValues = values as unknown as (string | number)[];
                if (
                  typeof value === "number" &&
                  value >= 45 &&
                  value % 5 === 0
                ) {
                  return value.toString();
                }
                return "";
              },
            },
          },
        },
      },
    };

    // Chart creation
    const canvasElement = document.getElementById("lineChart");
    if (canvasElement instanceof HTMLCanvasElement) {
      const lineChart = new Chart(canvasElement, configLineChart);

      // Cleanup function to destroy chart instance
      return () => {
        lineChart.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col w-full 2xl:w-2/3 min-w-full ">
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
        <h2 className="text-xl text-gray-900 font-bold text-center">
          Child Nutritional Status (Height Vs Age)
        </h2>

        {/* Omitted code for statistics cards */}

        {/* Line chart canvas */}
        <div className="mt-4">
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default AboutStatistics;

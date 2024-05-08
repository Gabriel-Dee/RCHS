"use client";
import React, { useEffect } from "react";
import Chart, { ChartConfiguration, Tick } from "chart.js/auto";
import {
  fillBetweenLinesSD2negToSD3negPlugin,
  fillBetweenLinesSD2toSD2negPlugin,
} from "@/plugins/fillBetweenLinesPlugin";
import { drawLineOnTopPlugin } from "@/plugins/drawLineOnTopPlugin";

const GirlStatistics2to5: React.FC = () => {
  useEffect(() => {
    // Register the Chart plugins
    Chart.register(fillBetweenLinesSD2toSD2negPlugin);
    Chart.register(fillBetweenLinesSD2negToSD3negPlugin);
    Chart.register(drawLineOnTopPlugin);
    // Data preparation
    const dataLengthAgainstAge = [
      // this has also been defined at drawLineOnTopPlugin
      45, 46, 48, 50, 51.5, 52, 54, 55.5, 57, 58.5, 60, 62, 65, 66.5, 67.5, 69,
      70.5, 72, 73.5, 75, 76, 78, 80, 82, 85, 87.5, 88, 90, 100, 102.5, 103,
      105, 106, 107, 108, 109, 110, 110.5, 111.5, 112.5, 113.5, 114.5, 115,
      115.5, 116, 116.5, 117, 117.5, 118, 118.5, 119, 119.5, 120.5, 121, 122,
      123, 124, 124.5, 125, 125, 125,
    ];

    // Data for all seven lines
    const line1Data = [
      43.6, 47.8, 51, 53.5, 55.6, 57.4, 58.9, 60.3, 61.7, 62.9, 64.1, 65.2,
      66.3, 67.3, 68.3, 69.3, 70.2, 71.1, 72, 72.8, 73.7, 74.5, 75.2, 76, 76.7,//
      76, 76.8, 77.5, 78.1, 78.8, 79.5, 80.1, 80.7, 81.3, 81.9, 82.5, 83.1,
      83.6, 84.2, 84.7, 85.3, 85.8, 86.3, 86.8, 87.4, 87.9, 88.4, 88.9, 89.3,
      89.8, 90.3, 90.7, 91.2, 91.7, 92.1, 92.6, 93, 93.4, 93.9, 94.3, 94.7,
      95.2,
    ];

    const line2Data = [
      45.4, 49.8, 53, 55.6, 57.8, 59.6, 61.2, 62.7, 64, 65.3, 66.5, 67.7, 68.9,
      70, 71, 72, 73, 74, 74.9, 75.8, 76.7, 77.5, 78.4, 79.2, 80, 79.3, 80,
      80.8, 81.5, 82.2, 82.9, 83.6, 84.3, 84.9, 85.6, 86.2, 86.8, 87.4, 88,
      88.6, 89.2, 89.8, 90.4, 90.9, 91.5, 92, 92.5, 93.1, 93.6, 94.1, 94.6,
      95.1, 95.6, 96.1, 96.6, 97.1, 97.6, 98.1, 98.5, 99, 99.5, 99.9,
    ];

    const line3Data = [
      49.1, 53.7, 57.1, 59.8, 62.1, 64, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74,
      75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4,
      85.7, 86.6, 87.4, 88.3, 89.1, 89.9, 90.7, 91.4, 92.2, 92.9, 93.6, 94.4,
      95.1, 95.7, 96.4, 97.1, 97.7, 98.4, 99, 99.7, 100.3, 100.9, 101.5, 102.1,
      102.7, 103.3, 103.9, 104.5, 105, 105.6, 106.2, 106.7, 107.3, 107.8, 108.4,
      108.9, 109.4,
    ];

    const line4Data = [
      52.9, 57.6, 61.1, 64, 66.4, 68.5, 70.3, 71.9, 73.5, 75, 76.4, 77.8, 79.2,
      80.5, 81.7, 83, 84.2, 85.4, 86.5, 87.6, 88.7, 89.8, 90.8, 91.9, 92.9,
      92.2, 93.1, 94.1, 95, 96, 96.9, 97.7, 98.6, 99.4, 100.3, 101.1, 101.9,
      102.7, 103.4, 104.2, 105, 105.7, 106.4, 107.2, 107.9, 108.6, 109.3, 110,
      110.7, 111.3, 112, 112.7, 113.3, 114, 114.6, 115.2, 115.9, 116.5, 117.1,
      117.7, 118.3, 118.9,
    ];

    const line5Data = [
      54.7, 59.5, 63.2, 66.1, 68.6, 70.7, 72.5, 74.2, 75.8, 77.4, 78.9, 80.3,
      81.7, 83.1, 84.4, 85.7, 87, 88.2, 89.4, 90.6, 91.7, 92.9, 94, 95, 96.1,
      95.4, 96.4, 97.4, 98.4, 99.4, 100.3, 101.3, 102.2, 103.1, 103.9, 104.8,
      105.6, 106.5, 107.3, 108.1, 108.9, 109.7, 110.5, 111.2, 112, 112.7, 113.5,
      114.2, 114.9, 115.7, 116.4, 117.1, 117.7, 118.4, 119.1, 119.8, 120.4,
      121.1, 121.8, 122.4, 123.1, 123.7,
    ];

    // Prepare labels and chart data for the main line
    const labelsMonths = Array.from({ length: 61 }, (_, i) =>
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
          tension: 0.5, // Adjust tension for smoother curves, if needed
        },
      ],
    };

    // Add datasets for constant lines
    const constantLinesDatasets = [
      {
        label: "SD3neg",
        data: line1Data,
        borderColor: "black",
        backgroundColor: "rgba(255, 0, 0, 0.5)", // Transparent background
        borderWidth: 1,
        borderDash: [5, 5], // Dotted line
        tension: 0, // Not used for dashed lines
        fill: true,
        pointRadius: 0, // Remove nodes
        pointHoverRadius: 0, // Remove nodes
      },
      {
        label: "SD2neg",
        data: line2Data,
        borderColor: "red",
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        borderWidth: 1,
        borderDash: [5, 5], // Dotted line
        tension: 0, // Not used for dashed lines
        fill: false,
        pointRadius: 0, // Remove nodes
        pointHoverRadius: 0, // Remove nodes
      },
      {
        label: "SD0",
        data: line3Data,
        borderColor: "green",
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        borderWidth: 1,
        borderDash: [5, 5], // Dotted line
        tension: 0, // Not used for dashed lines
        fill: false,
        pointRadius: 0, // Remove nodes
        pointHoverRadius: 0, // Remove nodes
      },

      {
        label: "SD2",
        data: line4Data,
        borderColor: "red",
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        borderWidth: 1,
        borderDash: [5, 5], // Dotted line
        tension: 0, // Not used for dashed lines
        fill: false,
        pointRadius: 0, // Remove nodes
        pointHoverRadius: 0, // Remove nodes
      },
      {
        label: "SD3",
        data: line5Data,
        borderColor: "black",
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        borderWidth: 1,
        borderDash: [5, 5], // Dotted line
        tension: 0, // Not used for dashed lines
        fill: false,
        pointRadius: 0, // Remove nodes
        pointHoverRadius: 0, // Remove nodes
      },
    ];
    
    // Merge constant lines datasets with the main line dataset
    dataLineChart.datasets = [
      ...dataLineChart.datasets,
      ...constantLinesDatasets,
    ];

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
            text: "Girl Child Growth Chart",
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
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Length (cm)",
            },
            min: 40,
            max: 130, // Maximum height
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
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Length (cm)",
            },
            min: 40,
            max: 130, // Maximum height
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
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    };

    // Chart creation
    const canvasElement = document.getElementById("girlLineChart");
    if (canvasElement instanceof HTMLCanvasElement) {
      const girlLineChart = new Chart(canvasElement, configLineChart);

      // Cleanup function to destroy chart instance
      return () => {
        girlLineChart.destroy();
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
          <canvas id="girlLineChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default GirlStatistics2to5;

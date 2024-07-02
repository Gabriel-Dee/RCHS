"use client";
import React, { useEffect } from "react";
import Chart, { ChartConfiguration, Tick } from "chart.js/auto";
import {
  fillBetweenLinesSD2negToSD3negPlugin,
  fillBetweenLinesSD2toSD2negPlugin,
} from "@/plugins/fillBetweenLinesPlugin";
import { drawLineOnTopPlugin } from "@/plugins/drawLineOnTopPlugin";
import { CardItem } from "@/types/types";

interface GirlStatistics0t02Props {
  cardData: CardItem[];
}

const GirlStatistics0to2: React.FC<GirlStatistics0t02Props> = ({
  cardData = [],
}) => {
  useEffect(() => {
    // Register the Chart plugins
    Chart.register(fillBetweenLinesSD2toSD2negPlugin);
    Chart.register(fillBetweenLinesSD2negToSD3negPlugin);
    Chart.register(drawLineOnTopPlugin);

    // Replace hardcoded length data with the heights from cardData
    const dataLengthAgainstAge = cardData.map((item) => item.height);

    // Data for all seven lines
    const line1Data = [
      43.6, 47.8, 51, 53.5, 55.6, 57.4, 58.9, 60.3, 61.7, 62.9, 64.1, 65.2,
      66.3, 67.3, 68.3, 69.3, 70.2, 71.1, 72, 72.8, 73.7, 74.5, 75.2, 76, 76.7,
    ];

    const line2Data = [
      45.4, 49.8, 53, 55.6, 57.8, 59.6, 61.2, 62.7, 64, 65.3, 66.5, 67.7, 68.9,
      70, 71, 72, 73, 74, 74.9, 75.8, 76.7, 77.5, 78.4, 79.2, 80,
    ];

    const line3Data = [
      49.1, 53.7, 57.1, 59.8, 62.1, 64, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74,
      75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4,
    ];

    const line4Data = [
      52.9, 57.6, 61.1, 64, 66.4, 68.5, 70.3, 71.9, 73.5, 75, 76.4, 77.8, 79.2,
      80.5, 81.7, 83, 84.2, 85.4, 86.5, 87.6, 88.7, 89.8, 90.8, 91.9, 92.9,
    ];

    const line5Data = [
      54.7, 59.5, 63.2, 66.1, 68.6, 70.7, 72.5, 74.2, 75.8, 77.4, 78.9, 80.3,
      81.7, 83.1, 84.4, 85.7, 87, 88.2, 89.4, 90.6, 91.7, 92.9, 94, 95, 96.1,
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
            min: 0,
            max: 24,
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
    const canvasElement = document.getElementById("girlLengthLineChart");
    if (canvasElement instanceof HTMLCanvasElement) {
      const girlLengthLineChart = new Chart(canvasElement, configLineChart);

      // Cleanup function to destroy chart instance
      return () => {
        girlLengthLineChart.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col w-full 2xl:w-2/3 min-w-full ">
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
        <h2 className="text-xl text-gray-900 font-bold text-center">
          Child Nutritional Status (Length Vs Age)
        </h2>
        <p className="text-md text-gray-900 font-bold text-center">
          This is for Growth Tracking form Birth to two Years of Age
        </p>

        {/* Line chart canvas */}
        <div className="mt-4">
          <canvas id="girlLengthLineChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default GirlStatistics0to2;

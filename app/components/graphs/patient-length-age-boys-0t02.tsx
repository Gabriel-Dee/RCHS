"use client";
import React, { useEffect } from "react";
import Chart, { ChartConfiguration, Tick } from "chart.js/auto";
import {
  fillBetweenLinesSD2toSD2negPlugin,
  fillBetweenLinesSD2negToSD3negPlugin,
} from "@/plugins/fillBetweenLinesPlugin";
import { drawLineOnTopPlugin } from "@/plugins/drawLineOnTopPlugin";
import { CardItem } from "@/types/types";

interface BoyStatistics0t02Props {
  cardData: CardItem[];
}

const BoyStatistics0t02: React.FC<BoyStatistics0t02Props> = ({
  cardData = [],
}) => {
  // Register the Chart plugins
  Chart.register(fillBetweenLinesSD2toSD2negPlugin);
  Chart.register(fillBetweenLinesSD2negToSD3negPlugin);
  Chart.register(drawLineOnTopPlugin);

  useEffect(() => {
    // Replace hardcoded length data with the heights from cardData
    const dataLengthAgainstAge = cardData
      .map((item) => item.height)
      .filter((_, index) => index === 0 || index >= 3);

    // Data for all seven lines
    const line1Data = [
      44.2, 48.9, 52.4, 55.3, 57.6, 59.6, 61.2, 62.7, 64, 65.2, 66.4, 67.6,
      68.6, 69.6, 70.6, 71.6, 72.5, 73.3, 74.2, 75, 75.8, 76.5, 77.2, 78, 78.7,
    ];

    const line2Data = [
      46.1, 50.8, 54.4, 57.3, 59.7, 61.7, 63.3, 64.8, 66.2, 67.5, 68.7, 69.9,
      71, 72.1, 73.1, 74.1, 75, 76, 76.9, 77.7, 78.6, 79.4, 80.2, 81, 81.7,
    ];

    const line3Data = [
      49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72, 73.3, 74.5,
      75.7, 76.9, 78, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1, 86, 86.9, 87.8,
    ];

    const line4Data = [
      53.7, 58.6, 62.4, 65.5, 68, 70.1, 71.9, 73.5, 75, 76.5, 77.9, 79.2, 80.5,
      81.8, 83, 84.2, 85.4, 86.5, 87.7, 88.8, 89.8, 90.9, 91.9, 92.9, 93.9,
    ];

    const line5Data = [
      55.6, 60.6, 64.4, 67.6, 70.1, 72.2, 74, 75.7, 77.2, 78.7, 80.1, 81.5,
      82.9, 84.2, 85.5, 86.7, 88, 89.2, 90.4, 91.5, 92.6, 93.8, 94.9, 95.9, 97,
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
        backgroundColor: "rgba(0, 0, 0, 0)", // Red color with 50% opacity
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
            text: "Boy Child Growth Chart",
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
    const canvasElement = document.getElementById("boyLineChartLength");
    if (canvasElement instanceof HTMLCanvasElement) {
      const boyLineChartLength = new Chart(canvasElement, configLineChart);

      // Cleanup function to destroy chart instance
      return () => {
        boyLineChartLength.destroy();
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

        {/* Omitted code for statistics cards */}

        {/* Line chart canvas */}
        <div className="mt-4">
          <canvas id="boyLineChartLength"></canvas>
        </div>
      </div>
    </div>
  );
};

export default BoyStatistics0t02;

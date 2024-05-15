"use client";
import React, { useEffect } from "react";
import Chart, { ChartConfiguration, Tick } from "chart.js/auto";
import {
  fillBetweenLinesSD2toSD2negPlugin,
  fillBetweenLinesSD2negToSD3negPlugin,
  fillBetweenLinesSD2toSD3Plugin,
} from "@/plugins/fillBetweenLinesPlugin";
import { drawLineOnTopPlugin } from "@/plugins/drawLineOnTopPlugin";

const BoyBmiStatistics2to5: React.FC = () => {
  // Register the Chart plugins
  Chart.register(fillBetweenLinesSD2toSD2negPlugin);
  Chart.register(fillBetweenLinesSD2negToSD3negPlugin);
  Chart.register(fillBetweenLinesSD2toSD3Plugin);
  Chart.register(drawLineOnTopPlugin);

  useEffect(() => {
    // Updated BMI data
    const dataBmiAgainstAge = [
      11.88, 11.83, 11.79, 11.76, 11.72, 11.69, 11.66, 11.64, 11.62, 11.6,
      11.59, 11.58, 11.57, 11.56, 11.55, 11.55, 11.54, 11.54, 11.54, 11.53,
      11.53, 11.53, 11.53, 11.53, 11.53, 11.53, 11.53, 11.53, 11.53, 11.54,
      11.54, 11.54, 11.54, 11.54, 11.54,
    ];

    // Updated line1Data
    const line1Data = [
      12.9, 12.8, 12.8, 12.7, 12.7, 12.7, 12.6, 12.6, 12.5, 12.5, 12.5, 12.4,
      12.4, 12.4, 12.3, 12.3, 12.3, 12.2, 12.2, 12.2, 12.2, 12.2, 12.1, 12.1,
      12.1, 12.1, 12.1, 12.1, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    ];

    // Updated line2Data
    const line2Data = [
      13.8, 13.8, 13.7, 13.7, 13.6, 13.6, 13.6, 13.5, 13.5, 13.5, 13.4, 13.4,
      13.4, 13.3, 13.3, 13.3, 13.2, 13.2, 13.2, 13.2, 13.1, 13.1, 13.1, 13.1,
      13.1, 13, 13, 13, 13, 13, 13, 13, 12.9, 12.9, 12.9, 12.9, 12.9,
    ];

    // Updated line3Data
    const line3Data = [
      16, 16, 15.9, 15.9, 15.9, 15.8, 15.8, 15.8, 15.7, 15.7, 15.7, 15.6, 15.6,
      15.6, 15.5, 15.5, 15.5, 15.5, 15.4, 15.4, 15.4, 15.4, 15.4, 15.3, 15.3,
      15.3, 15.3, 15.3, 15.3, 15.3, 15.3, 15.2, 15.2, 15.2, 15.2, 15.2, 15.2,
    ];

    // Updated line4Data
    const line4Data = [
      18.9, 18.8, 18.8, 18.7, 18.7, 18.6, 18.6, 18.5, 18.5, 18.5, 18.4, 18.4,
      18.4, 18.3, 18.3, 18.3, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2,
      18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.3,
      18.3, 18.3,
    ];

    // Updated line5Data
    const line5Data = [
      20.6, 20.5, 20.5, 20.4, 20.4, 20.3, 20.2, 20.2, 20.1, 20.1, 20, 20, 20,
      19.9, 19.9, 19.9, 19.9, 19.9, 19.8, 19.8, 19.8, 19.8, 19.8, 19.9, 19.9,
      19.9, 19.9, 19.9, 19.9, 20, 20, 20, 20.1, 20.1, 20.2, 20.2, 20.3,
    ];

    // Prepare labels and chart data for the main line
    const labelsMonths = Array.from({ length: 37 }, (_, i) =>
      (i + 25).toString()
    ); // Convert numbers to strings for months 25 to 60

    // Chart configuration
    const dataLineChart = {
      labels: labelsMonths,
      datasets: [
        {
          label: "BMI vs Age",
          data: dataBmiAgainstAge,
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
            ticks: {
              callback: (
                value: string | number,
                index: number,
                values: Tick[]
              ) => {
                const typedValues = values as unknown as (string | number)[];
                if (typeof value === "number" && value % 12 === 0) {
                  return `Year ${value / 12 + 2}`;
                } else if (typeof value === "number") {
                  // Convert months 0 to 36 to months 24 to 60
                  return `${value + 24}`;
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
              text: "BMI (kg/m²)",
            },
            min: 10, // Start from 0
            max: 23, // Maximum BMI
            ticks: {
              stepSize: 1, // Set step size to 1
              callback: (
                value: string | number,
                index: number,
                values: Tick[]
              ) => {
                const typedValues = values as unknown as (string | number)[];
                if (
                  typeof value === "number" &&
                  value >= 10 &&
                  value % 1 === 0
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
            min: 0, // Start from 0
            max: 23, // Maximum BMI
            ticks: {
              stepSize: 1, // Set step size to 1
              callback: (
                value: string | number,
                index: number,
                values: Tick[]
              ) => {
                const typedValues = values as unknown as (string | number)[];
                if (
                  typeof value === "number" &&
                  value >= 10 &&
                  value % 1 === 0
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
    const canvasElement = document.getElementById("boyBmiLineChart2to5");
    if (canvasElement instanceof HTMLCanvasElement) {
      const boyBmiLineChart2to5 = new Chart(canvasElement, configLineChart);

      // Cleanup function to destroy chart instance
      return () => {
        boyBmiLineChart2to5.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col w-full 2xl:w-2/3 min-w-full ">
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
        <h2 className="text-xl text-gray-900 font-bold text-center">
          Child Nutritional Status (BMI Vs Age)
        </h2>
        <p className="text-md text-gray-900 font-bold text-center">
          This is for Growth Tracking form Two Years of Age to Five Years of Age
        </p>

        {/* Line chart canvas */}
        <div className="mt-4">
          <canvas id="boyBmiLineChart2to5"></canvas>
        </div>
      </div>
    </div>
  );
};

export default BoyBmiStatistics2to5;

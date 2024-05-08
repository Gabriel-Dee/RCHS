"use client";
import React, { useEffect } from "react";
import Chart, { ChartConfiguration, Tick } from "chart.js/auto";
import {
  fillBetweenLinesSD2toSD2negPlugin,
  fillBetweenLinesSD2negToSD3negPlugin,
  fillBetweenLinesSD2toSD3Plugin,
} from "@/plugins/fillBetweenLinesPlugin";
import { drawLineOnTopPlugin } from "@/plugins/drawLineOnTopPlugin";

const BoyWeightStatistics: React.FC = () => {
  // Register the Chart plugins
  Chart.register(fillBetweenLinesSD2toSD2negPlugin);
  Chart.register(fillBetweenLinesSD2negToSD3negPlugin);
  Chart.register(fillBetweenLinesSD2toSD3Plugin);
  Chart.register(drawLineOnTopPlugin);

  useEffect(() => {
    // Updated weight data
    const dataWeightAgainstAge = [
      // Replace with your weight data from 0 to 60 months
      2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2, 7.6,
      8.0, 8.4, 8.8, 9.2, 9.6, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0, 12.4, 12.8,
      13.2, 13.6, 14.0, 14.4, 14.8, 15.2, 15.6, 16.0, 16.4, 16.8, 17.2, 17.6,
      18.0, 18.4, 18.8, 19.2, 19.6, 20.0, 20.4, 20.8, 21.2, 21.6, 22.0, 22.4,
      22.8, 23.2, 23.6, 24.0, 24.4, 24.8, 25.2, 25.6, 26.0, 26.4, 26.8, 27.2,
      27.6, 28.0,
    ];

    // Updated line1Data
    const line1Data = [
      2.1, 2.9, 3.8, 4.4, 4.9, 5.3, 5.7, 5.9, 6.2, 6.4, 6.6, 6.8, 6.9, 7.1, 7.2,
      7.4, 7.5, 7.7, 7.8, 8, 8.1, 8.2, 8.4, 8.5, 8.6, 8.8, 8.9, 9, 9.1, 9.2,
      9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6,
      10.7, 10.8, 10.9, 11, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8,
      11.9, 12, 12.1, 12.2, 12.3, 12.4,
    ];

    // Updated line2Data
    const line2Data = [
      2.5, 3.4, 4.3, 5, 5.6, 6, 6.4, 6.7, 6.9, 7.1, 7.4, 7.6, 7.7, 7.9, 8.1,
      8.3, 8.4, 8.6, 8.8, 8.9, 9.1, 9.2, 9.4, 9.5, 9.7, 9.8, 10, 10.1, 10.2,
      10.4, 10.5, 10.7, 10.8, 10.9, 11, 11.2, 11.3, 11.4, 11.5, 11.6, 11.8,
      11.9, 12, 12.1, 12.2, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 13.1, 13.2,
      13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 14, 14.1,
    ];

    // Updated line3Data
    const line3Data = [
      3.3, 4.5, 5.6, 6.4, 7, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1,
      10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.8, 12, 12.2, 12.4, 12.5,
      12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.8, 14, 14.2, 14.3, 14.5, 14.7,
      14.8, 15, 15.2, 15.3, 15.5, 15.7, 15.8, 16, 16.2, 16.3, 16.5, 16.7, 16.8,
      17, 17.2, 17.3, 17.5, 17.7, 17.8, 18, 18.2, 18.3,
    ];

    // Updated line4Data
    const line4Data = [
      4.4, 5.8, 7.1, 8, 8.7, 9.3, 9.8, 10.3, 10.7, 11, 11.4, 11.7, 12, 12.3,
      12.6, 12.8, 13.1, 13.4, 13.7, 13.9, 14.2, 14.5, 14.7, 15, 15.3, 15.5,
      15.8, 16.1, 16.3, 16.6, 16.9, 17.1, 17.4, 17.6, 17.8, 18.1, 18.3, 18.6,
      18.8, 19, 19.3, 19.5, 19.7, 20, 20.2, 20.5, 20.7, 20.9, 21.2, 21.4, 21.7,
      21.9, 22.2, 22.4, 22.7, 22.9, 23.2, 23.4, 23.7, 23.9, 24.2,
    ];

    // Updated line5Data
    const line5Data = [
      5, 6.6, 8, 9, 9.7, 10.4, 10.9, 11.4, 11.9, 12.3, 12.7, 13, 13.3, 13.7, 14,
      14.3, 14.6, 14.9, 15.3, 15.6, 15.9, 16.2, 16.5, 16.8, 17.1, 17.5, 17.8,
      18.1, 18.4, 18.7, 19, 19.3, 19.6, 19.9, 20.2, 20.4, 20.7, 21, 21.3, 21.6,
      21.9, 22.1, 22.4, 22.7, 23, 23.3, 23.6, 23.9, 24.2, 24.5, 24.8, 25.1,
      25.4, 25.7, 26, 26.3, 26.6, 26.9, 27.2, 27.6, 27.9,
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
          label: "Weight vs Age",
          data: dataWeightAgainstAge,
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
              text: "Weight (kg)",
            },
            min: 0, // Start from 0
            max: 30, // Maximum weight
            ticks: {
              stepSize: 2, // Set step size to 2
              callback: (
                value: string | number,
                index: number,
                values: Tick[]
              ) => {
                const typedValues = values as unknown as (string | number)[];
                if (
                  typeof value === "number" &&
                  value >= 2 &&
                  value % 2 === 0
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
            max: 30, // Maximum weight
            ticks: {
              stepSize: 2, // Set step size to 2
              callback: (
                value: string | number,
                index: number,
                values: Tick[]
              ) => {
                const typedValues = values as unknown as (string | number)[];
                if (
                  typeof value === "number" &&
                  value >= 2 &&
                  value % 2 === 0
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
    const canvasElement = document.getElementById("boyWeightLineChart");
    if (canvasElement instanceof HTMLCanvasElement) {
      const boyWeightLineChart = new Chart(canvasElement, configLineChart);

      // Cleanup function to destroy chart instance
      return () => {
        boyWeightLineChart.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col w-full 2xl:w-2/3 min-w-full ">
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
        <h2 className="text-xl text-gray-900 font-bold text-center">
          Child Nutritional Status (weight Vs Age)
        </h2>

        {/* Omitted code for statistics cards */}

        {/* Line chart canvas */}
        <div className="mt-4">
          <canvas id="boyWeightLineChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default BoyWeightStatistics;

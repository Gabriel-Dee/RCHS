"use client";
import React, { useEffect } from "react";
import Chart, { BubbleDataPoint, ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartTypeRegistry, Point } from "chart.js/auto";

// Example data
const totalRegisteredPatients = 1000;
const ageDistribution = { "0-1": 200, "1-2": 300, "2-3": 250, "3-4": 150, "4-5": 100 };
const genderDistribution = { Male: 500, Female: 500 };
const monthlyVisitTrends = [30, 50, 45, 60, 80, 70, 90, 100, 110, 120, 130, 140];
const immunizationCoverage = { BCG: 90, OPV: 85, DPT: 80, Measles: 75 };

const createChart = (id: string, config: ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>) => {
  const canvasElement = document.getElementById(id);
  if (canvasElement instanceof HTMLCanvasElement) {
    return new Chart(canvasElement, config);
  }
  return null;
};

const AnalyticsPage: React.FC = () => {
  useEffect(() => {
    const charts: (Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | null)[] = [];

    // Total Registered Patients (Doughnut Chart)
    charts.push(createChart("totalRegisteredPatientsChart", {
      type: "doughnut",
      data: {
        labels: ["Total Registered Patients"],
        datasets: [{
          data: [totalRegisteredPatients],
          backgroundColor: ["#36A2EB"],
        }],
      },
    }));

    // Age Distribution (Bar Chart)
    charts.push(createChart("ageDistributionChart", {
      type: "bar",
      data: {
        labels: Object.keys(ageDistribution),
        datasets: [{
          label: "Age Distribution",
          data: Object.values(ageDistribution),
          backgroundColor: "#FF6384",
        }],
      },
    }));

    // Gender Distribution (Pie Chart)
    charts.push(createChart("genderDistributionChart", {
      type: "pie",
      data: {
        labels: Object.keys(genderDistribution),
        datasets: [{
          data: Object.values(genderDistribution),
          backgroundColor: ["#36A2EB", "#FF6384"],
        }],
      },
    }));

    // Monthly Visit Trends (Line Chart)
    charts.push(createChart("monthlyVisitTrendsChart", {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Monthly Visit Trends",
          data: monthlyVisitTrends,
          borderColor: "#FFCE56",
          fill: false,
        }],
      },
    }));

    // Immunization Coverage (Bar Chart)
    charts.push(createChart("immunizationCoverageChart", {
      type: "bar",
      data: {
        labels: Object.keys(immunizationCoverage),
        datasets: [{
          label: "Immunization Coverage",
          data: Object.values(immunizationCoverage),
          backgroundColor: "#4BC0C0",
        }],
      },
    }));

    // Cleanup charts on component unmount
    return () => charts.forEach(chart => chart && chart.destroy());
  }, []);

  return (
    <div className="analytics-page p-5 bg-white border border-blue-500 rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-6">Healthcare Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="chart-container bg-white p-6 rounded-lg shadow-md border border-blue-200">
          <h2 className="text-center text-lg font-semibold mb-4">Total Registered Patients</h2>
          <canvas id="totalRegisteredPatientsChart"></canvas>
        </div>
        <div className="chart-container bg-white p-6 rounded-lg shadow-md border border-blue-200">
          <h2 className="text-center text-lg font-semibold mb-4">Gender Distribution</h2>
          <canvas id="genderDistributionChart"></canvas>
        </div>
      </div>
      <div className="chart-container bg-white p-6 rounded-lg shadow-md mt-6 border border-blue-200">
        <h2 className="text-center text-lg font-semibold mb-4">Age Distribution</h2>
        <canvas id="ageDistributionChart"></canvas>
      </div>
      <div className="chart-container bg-white p-6 rounded-lg shadow-md mt-6 border border-blue-200">
        <h2 className="text-center text-lg font-semibold mb-4">Monthly Visit Trends</h2>
        <canvas id="monthlyVisitTrendsChart"></canvas>
      </div>
      <div className="chart-container bg-white p-6 rounded-lg shadow-md mt-6 border border-blue-200">
        <h2 className="text-center text-lg font-semibold mb-4">Immunization Coverage</h2>
        <canvas id="immunizationCoverageChart"></canvas>
      </div>
    </div>
  );
};

export default AnalyticsPage;

"use client";
import React, { useEffect, useState } from "react";
import Chart, { BubbleDataPoint, ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartTypeRegistry, Point } from "chart.js/auto";

const createChart = (id: string, config: ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>) => {
  const canvasElement = document.getElementById(id);
  if (canvasElement instanceof HTMLCanvasElement) {
    return new Chart(canvasElement, config);
  }
  return null;
};

const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/Analytics/");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const charts: (Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | null)[] = [];

    // Total Registered Patients (Doughnut Chart)
    charts.push(createChart("totalRegisteredPatientsChart", {
      type: "doughnut",
      data: {
        labels: ["Total Registered Patients"],
        datasets: [{
          data: [data.Total_Count],
          backgroundColor: ["#36A2EB"],
        }],
      },
    }));

    // Age Distribution (Bar Chart)
    charts.push(createChart("ageDistributionChart", {
      type: "bar",
      data: {
        labels: Object.keys(data.age_distribution),
        datasets: [{
          label: "Age Distribution",
          data: Object.values(data.age_distribution),
          backgroundColor: "#FF6384",
        }],
      },
    }));

    // Gender Distribution (Pie Chart)
    charts.push(createChart("genderDistributionChart", {
      type: "pie",
      data: {
        labels: ["Male", "Female"],
        datasets: [{
          data: [data.Boys_count, data.Girls_Count],
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
          data: Object.values(data.visit_distribution),
          borderColor: "#FFCE56",
          fill: false,
        }],
      },
    }));

    // Cleanup charts on component unmount
    return () => charts.forEach(chart => chart && chart.destroy());
  }, [data]);

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
    </div>
  );
};

export default AnalyticsPage;

"use client"
import React, { useEffect, useState } from "react";
import Chart, { BubbleDataPoint, ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartTypeRegistry, Point } from "chart.js/auto";
import Tabs from "@/app/components/tabs";

const createChart = (id: string, config: ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>) => {
  const canvasElement = document.getElementById(id);
  if (canvasElement instanceof HTMLCanvasElement) {
    return new Chart(canvasElement, config);
  }
  return null;
};

const ChildAnalytics: React.FC<{ data: any }> = ({ data }) => {
  useEffect(() => {
    if (!data) return;

    const charts: (Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | null)[] = [];

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

    return () => charts.forEach(chart => chart && chart.destroy());
  }, [data]);

  return (
    <div className="analytics-page p-5 bg-white border border-blue-500 rounded-lg">
      <h3 className="text-center text-lg font-bold mb-6">Child Analytics</h3>
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

const ParentAnalytics: React.FC<{ data: any }> = ({ data }) => {
  // Similar to ChildAnalytics, you would define the charts for parent/guardian analytics here.
  // For the sake of brevity, we'll leave this as an exercise to replicate similar to ChildAnalytics.

  return (
    <div className="analytics-page p-5 bg-white border border-blue-500 rounded-lg">
      <h2 className="text-center text-lg font-bold mb-6">Parent/Guardian Analytics</h2>
      {/* Add Parent/Guardian analytics charts here */}
    </div>
  );
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

  const tabs = [
    { name: "Child Analytics", content: <ChildAnalytics data={data} /> },
    { name: "Parent/Guardian Analytics", content: <ParentAnalytics data={data} /> },
  ];

  return <Tabs tabs={tabs} />;
};

export default AnalyticsPage;

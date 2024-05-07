// Define the custom plugin
export const fillBetweenLinesSD2toSD2negPlugin = {
  id: "fillBetweenLinesSD2toSD2neg", // Unique identifier for the plugin
  afterDatasetsDraw: function (
    chart: {
      ctx: any;
      scales: { [x: string]: any };
      data: { datasets: any };
    },
    _: any
  ) {
    const ctx = chart.ctx;
    const xAxis = chart.scales["x"];
    const yAxis = chart.scales["y"];
    const datasets = chart.data.datasets;

    // Find the SD2 and SD2neg datasets
    const sd2Dataset = datasets.find(
      (dataset: { label: string }) => dataset.label === "SD2"
    );
    const sd2NegDataset = datasets.find(
      (dataset: { label: string }) => dataset.label === "SD2neg"
    );

    if (!sd2Dataset || !sd2NegDataset) {
      return;
    }

    const sd2Data = sd2Dataset.data;
    const sd2NegData = sd2NegDataset.data;

    // Begin the fill area
    ctx.save();
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)"; // green color with 50% opacity
    ctx.beginPath();
    ctx.moveTo(xAxis.left, yAxis.getPixelForValue(sd2Data[0])); // Start from the left edge

    // Draw the fill area between SD2 and SD2neg lines
    for (let i = 0; i < sd2Data.length; i++) {
      const x = xAxis.getPixelForValue(i);
      const y1 = yAxis.getPixelForValue(sd2Data[i]);
      const y2 = yAxis.getPixelForValue(sd2NegData[i]);
      ctx.lineTo(x, y1); // Draw to the SD2 line
    }

    // Draw back down to the SD2neg line
    for (let i = sd2Data.length - 1; i >= 0; i--) {
      const x = xAxis.getPixelForValue(i);
      const y2 = yAxis.getPixelForValue(sd2NegData[i]);
      ctx.lineTo(x, y2); // Draw back down to the SD2neg line
    }

    // Close the fill area
    ctx.closePath();
    ctx.fill();
    ctx.restore(); // Restore the context
  },
};

// warningFillPlugin.js

export const fillBetweenLinesSD2toSD3Plugin = {
    id: "fillBetweenLinesSD2toSD3",
    afterDatasetsDraw: function (
      chart: {
        ctx: any;
        scales: { [x: string]: any };
        data: { datasets: any };
      },
      _: any
    ) {
      const ctx = chart.ctx;
      const xAxis = chart.scales["x"];
      const yAxis = chart.scales["y"];
      const datasets = chart.data.datasets;
  
      // Find the SD2 and SD3 datasets
      const sd2Dataset = datasets.find(
        (dataset: { label: string }) => dataset.label === "SD2"
      );
      const sd3Dataset = datasets.find(
        (dataset: { label: string }) => dataset.label === "SD3"
      );
  
      if (!sd2Dataset || !sd3Dataset) {
        return;
      }
  
      const sd2Data = sd2Dataset.data;
      const sd3Data = sd3Dataset.data;
  
      // Begin the fill area
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Yellow color with 50% opacity
      ctx.beginPath();
      ctx.moveTo(xAxis.left, yAxis.getPixelForValue(sd2Data[0])); // Start from the left edge
  
      // Draw the fill area between SD2 and SD3 lines
      for (let i = 0; i < sd2Data.length; i++) {
        const x = xAxis.getPixelForValue(i);
        const y1 = yAxis.getPixelForValue(sd2Data[i]);
        const y2 = yAxis.getPixelForValue(sd3Data[i]);
        ctx.lineTo(x, y1); // Draw to the SD2 line
      }
  
      // Draw back down to the SD3 line
      for (let i = sd2Data.length - 1; i >= 0; i--) {
        const x = xAxis.getPixelForValue(i);
        const y2 = yAxis.getPixelForValue(sd3Data[i]);
        ctx.lineTo(x, y2); // Draw back down to the SD3 line
      }
  
      // Close the fill area
      ctx.closePath();
      ctx.fill();
      ctx.restore(); // Restore the context
    },
  };
  
  export const fillBetweenLinesSD2negToSD3negPlugin = {
    id: "fillBetweenLinesSD2negToSD3neg",
    afterDatasetsDraw: function (
      chart: {
        ctx: any;
        scales: { [x: string]: any };
        data: { datasets: any };
      },
      _: any
    ) {
      const ctx = chart.ctx;
      const xAxis = chart.scales["x"];
      const yAxis = chart.scales["y"];
      const datasets = chart.data.datasets;
  
      // Find the SD2neg and SD3neg datasets
      const sd2negDataset = datasets.find(
        (dataset: { label: string }) => dataset.label === "SD2neg"
      );
      const sd3negDataset = datasets.find(
        (dataset: { label: string }) => dataset.label === "SD3neg"
      );
  
      if (!sd2negDataset || !sd3negDataset) {
        return;
      }
  
      const sd2negData = sd2negDataset.data;
      const sd3negData = sd3negDataset.data;
  
      // Begin the fill area
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Yellow color with 50% opacity
      ctx.beginPath();
      ctx.moveTo(xAxis.left, yAxis.getPixelForValue(sd2negData[0])); // Start from the left edge
  
      // Draw the fill area between SD2neg and SD3neg lines
      for (let i = 0; i < sd2negData.length; i++) {
        const x = xAxis.getPixelForValue(i);
        const y1 = yAxis.getPixelForValue(sd2negData[i]);
        const y2 = yAxis.getPixelForValue(sd3negData[i]);
        ctx.lineTo(x, y1); // Draw to the SD2neg line
      }
  
      // Draw back down to the SD3neg line
      for (let i = sd2negData.length - 1; i >= 0; i--) {
        const x = xAxis.getPixelForValue(i);
        const y2 = yAxis.getPixelForValue(sd3negData[i]);
        ctx.lineTo(x, y2); // Draw back down to the SD3neg line
      }
  
      // Close the fill area
      ctx.closePath();
      ctx.fill();
      ctx.restore(); // Restore the context
    },
  };
  
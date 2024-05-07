// Define a plugin to draw the line on top

const dataLengthAgainstAge = [
    45, 46, 48, 50, 51.5, 52, 54, 55.5, 57, 58.5, 60, 62, 65, 66.5, 67.5, 69,
    70.5, 72, 73.5, 75, 76, 78, 80, 82, 85, 87.5, 88, 90, 100, 102.5, 103,
    105, 106, 107, 108, 109, 110, 110.5, 111.5, 112.5, 113.5, 114.5, 115,
    115.5, 116, 116.5, 117, 117.5, 118, 118.5, 119, 119.5, 120.5, 121, 122,
    123, 124, 124.5, 125, 125, 125,
  ];
  
export const drawLineOnTopPlugin = {
    id: "drawLineOnTop",
    afterDatasetsDraw: function (chart: { ctx: any; data: { datasets: any; }; scales: { x: any; y: any; }; }, _args: any, options: any) {
      const ctx = chart.ctx;
      const datasets = chart.data.datasets;
      const xAxis = chart.scales.x;
      const yAxis = chart.scales.y;
  
      // Find the dataset with dataLengthAgainstAge
      const topDataset = datasets.find((dataset: { data: any; }) => dataset.data === dataLengthAgainstAge);
      if (!topDataset) {
        return;
      }
  
      // Draw the line
      ctx.save();
      ctx.lineWidth = 2; // Adjust line width as needed
      ctx.strokeStyle = topDataset.borderColor;
      ctx.beginPath();
      topDataset.data.forEach((value: any, index: number) => {
        const x = xAxis.getPixelForValue(index);
        const y = yAxis.getPixelForValue(value);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      ctx.restore();
    },
  };
  
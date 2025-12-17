import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

interface DashboardLineChartProps {
  oneDay: number | string;
  threeDays: number | string;
  fiveDays: number | string;
}

export default function DashboardLineChart({
  oneDay,
  threeDays,
  fiveDays,
}: DashboardLineChartProps) {
  const paddedLabels = ["", "1 día", "3 días", "5 días", ""];
  const paddedData = [0, oneDay, threeDays, fiveDays, 0];

  const data = {
    labels: paddedLabels,
    datasets: [
      {
        label: "Line chart",
        data: paddedData,
        borderColor: "#53F7F6",
        borderWidth: 4,
        pointRadius: paddedData.map((_, i) =>
          i === 0 || i === paddedData.length - 1 ? 0 : 6
        ),
        pointBackgroundColor: "#53F7F6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointShadowOffsetY: 3,
        pointShadowBlur: 5,
        pointShadowColor: "rgba(255, 255, 255, 0.3)",
        pointHoverRadius: paddedData.map((_, i) =>
          i === 0 || i === paddedData.length - 1 ? 0 : 4
        ),
        pointHoverBorderWidth: 2,
        pointStyle: "circle",
        tension: 0.4,
        fill: true,
        backgroundColor: (context: Context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
        shadowColor: "rgba(255, 255, 255, 0.5)",
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
      },
    ],
  };

  const paddedDataNumbers = paddedData.map((m) =>
    Number.isNaN(Number(m)) ? 0 : Number(m)
  );
  const maxValue = Math.max(...paddedDataNumbers);
  const suggestedMax = maxValue * 1.5;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 2,
    scales: {
      x: {
        ticks: {
          display: true,
          color: "#ffffff",
          font: {
            size: 10,
            family: "Aldrich",
          },
        },
        grid: { display: false },
      },
      y: {
        min: 0,
        suggestedMax: suggestedMax,
        ticks: { display: false },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        display: true,
        align: "top" as const,
        anchor: "end" as const,
        color: "#ffffff",
        font: {
          size: 12,
          weight: "bold" as const,
          family: "Aldrich",
        },
        formatter: (value: number) => (value === 0 ? "" : value),
      },
    },
  };

  return (
    <div className="flex-1 h-32 min-w-0">
      <Line data={data} options={options} />
    </div>
  );
}

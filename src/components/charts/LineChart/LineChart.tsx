import { Line } from "react-chartjs-2";
import { useRef, useEffect } from "react";
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
  const chartRef = useRef<ChartJS<"line", (number | string)[], unknown>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);
  const paddedLabels = ["", "1 día", "3 días", "5 días", ""];
  const paddedData = [0, oneDay, threeDays, fiveDays, 0];

  const numericData = [Number(oneDay), Number(threeDays), Number(fiveDays)];
  const maxValue = Math.max(...numericData);
  const dotRadius = 5;

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
          const chartArea = context.chart.chartArea;

          if (!chartArea) {
            return "rgba(255, 255, 255, 0.2)";
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.5)");
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
          gradient.addColorStop(0.75, "rgba(255, 255, 255, 0.08)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
      },
    ],
  };

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
            family: "Anta",
          },
        },
        grid: { display: false },
      },
      y: {
        min: 0 - dotRadius,
        suggestedMax: (maxValue + dotRadius) * 1.6,
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
          family: "Anta",
        },
        formatter: (value: number, context: Context) => {
          const index = context.dataIndex;
          const dataLength = context.dataset.data.length;
          if (index === 0 || index === dataLength - 1) {
            return "";
          }
          return value;
        },
      },
    },
  };

  return (
    <div className="flex-1 w-full h-24 sm:h-28 md:h-32 lg:h-40 xl:h-44 min-w-0">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}

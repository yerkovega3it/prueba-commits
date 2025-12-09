import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  percentage: number;
  maxCapacity: number;
  color?: string;
}

export default function DoughnutChart({
  percentage,
  maxCapacity,
  color = "#64CCC9",
}: DoughnutChartProps) {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "rgba(255, 255, 255, 0.2)"],
        borderColor: ["#64ccc966", "#64ccc966"],
        borderWidth: 5,
        cutout: "90%",
        circumference: 360,
        rotation: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    devicePixelRatio: window.devicePixelRatio || 2,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-24 h-24 sm:w-34 sm:h-34">
      <div style={{ width: "100%", height: "100%" }}>
        <Doughnut data={data} options={options} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl text-white">{percentage}%</p>
        <p className="sm:text-[10px] text-white mt-0.5 sm:mt-1">Capacidad</p>
        <p className="sm:text-[10px] text-white mt-0.5 sm:mt-1">
          máx. {maxCapacity}
        </p>
      </div>
    </div>
  );
}

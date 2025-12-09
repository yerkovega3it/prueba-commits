import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMonthlyApprovedPasses } from "@/hooks/useDashboardData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function MonthlyPassesChart() {
  const monthlyData = useMonthlyApprovedPasses();

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const values = months.map((_, index) => {
    const monthKey = `month${String(index + 1).padStart(2, "0")}`;
    return monthlyData[monthKey] ?? 0;
  });
  const currentMonthIndex = new Date().getMonth();

  const data = {
    labels: months,
    datasets: [
      {
        label: "",
        data: values,
        borderRadius: 20,
        backgroundColor: (ctx: { dataIndex: number }) => {
          const index = ctx.dataIndex;
          return index === currentMonthIndex ? "#ff005e" : "#53F7F6";
        },
        barPercentage: 0.4,
        categoryPercentage: 0.85,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
        max: 40,
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: { size: 12 },
          autoSkip: false,
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl h-auto">
      <h2 className="text-approved font-bold text-sm sm:text-base lg:text-md mb-4 sm:mb-6">
        PASES APROBADOS REALIZADOS DE FORMA MENSUAL
      </h2>
      <div className="relative pr-8 sm:pr-12 h-[280px] sm:h-[300px] max-w-full sm:max-w-[420px]">
        <Bar data={data} options={options} />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-around py-1">
          {values.map((value, i) => (
            <div
              key={i}
              className="flex items-center justify-end"
              style={{
                height: `${100 / values.length}%`,
              }}
            >
              <span className="text-white font-bold text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

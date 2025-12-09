import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  useMonthlyApprovedPasses,
  useVisitorPass,
} from "@/hooks/useDashboardData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function MonthlyPassesChart() {
  const monthlyData = useMonthlyApprovedPasses();
  const {
    approvedPassesToday,
    peopleWithPlusOneApprovedNext5Days,
    approvedPassesNext7Days,
  } = useVisitorPass();

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
    <div className="lg:col-span-2 bg-main rounded-3xl p-4 sm:p-5 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-4 sm:mb-6">
        <h2 className="text-approved font-bold text-sm sm:text-base lg:text-md">
          PASES APROBADOS REALIZADOS DE FORMA MENSUAL
        </h2>
        <h2 className="text-approved font-bold text-base sm:text-lg">
          PASES DE VISITA
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 h-full">
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
        <div className="w-full text-white space-y-5 sm:space-y-6 lg:space-y-8">
          <div className="mt-[32px] space-y-12">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-approved/15 shadow-[0_0_10px_var(--tw-approved)] shrink-0">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-approved text-base sm:text-lg"
                />
              </div>
              <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-4">
                <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
                  {approvedPassesToday}
                </span>
                <span className="text-xs sm:text-sm opacity-90">
                  Pases Aprobados hoy (duración 1 día)
                </span>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-approved/15 shadow-[0_0_10px_var(--tw-approved)] shrink-0">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-approved text-base sm:text-lg"
                />
              </div>
              <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-4">
                <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
                  {peopleWithPlusOneApprovedNext5Days}
                </span>
                <span className="text-xs sm:text-sm opacity-90">
                  Personas con +1 pase aprobados en los próximos 5 días
                </span>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-approved/15 shadow-[0_0_10px_var(--tw-approved)] shrink-0">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-approved text-base sm:text-lg"
                />
              </div>
              <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-4">
                <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
                  {approvedPassesNext7Days}
                </span>
                <span className="text-xs sm:text-sm opacity-90">
                  Pases Aprobados en los próximos 7 días
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

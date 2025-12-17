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
import type { MonthlyApprovedPasses } from "@/interfaces/dashboard/monthlyApprovedPasses.interface";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function MonthlyPassesChart() {
  const monthlyData: MonthlyApprovedPasses = useMonthlyApprovedPasses();
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
    return monthlyData[monthKey as keyof MonthlyApprovedPasses] ?? 0;
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
    <div className="w-full bg-main rounded-3xl p-4 sm:p-5 xl:p-6 overflow-hidden">
      <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 h-full">
        <div className="w-full xl:flex-1">
          <h2 className="text-approved font-bold text-sm sm:text-base xl:text-md mb-4 sm:mb-6">
            PASES APROBADOS REALIZADOS DE FORMA MENSUAL
          </h2>
          <div className="relative pr-8 sm:pr-12 h-[280px] sm:h-[300px] w-full max-w-full xl:max-w-[420px] flex-shrink-0">
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
        <div className="w-full xl:flex-1">
          <h2 className="text-approved font-bold text-base sm:text-lg mb-4 sm:mb-6">
            PASES DE VISITA
          </h2>
          <div className="w-full max-w-full text-white space-y-5 sm:space-y-6 xl:space-y-8">
            <div className="mt-0 xl:mt-[32px] space-y-8 sm:space-y-12 px-2 sm:px-0">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-approved/15 shadow-[0_0_10px_var(--tw-approved)] shrink-0">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-approved text-base sm:text-lg"
                  />
                </div>
                <div className="flex items-start gap-3 sm:gap-4 ml-3 sm:ml-4 min-w-0">
                  <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
                    {approvedPassesToday}
                  </span>
                  <span className="text-xs sm:text-sm opacity-90 break-words self-center">
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
                <div className="flex items-start gap-3 sm:gap-4 ml-3 sm:ml-4 min-w-0">
                  <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
                    {peopleWithPlusOneApprovedNext5Days}
                  </span>
                  <span className="text-xs sm:text-sm opacity-90 break-words self-center">
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
                <div className="flex items-start gap-3 sm:gap-4 ml-3 sm:ml-4 min-w-0">
                  <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
                    {approvedPassesNext7Days}
                  </span>
                  <span className="text-xs sm:text-sm opacity-90 break-words self-center">
                    Pases Aprobados en los próximos 7 días
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

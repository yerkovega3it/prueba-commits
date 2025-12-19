import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import {
  useMonthlyApprovedPasses,
  useVisitorPass,
} from "@/hooks/useDashboardData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import type { MonthlyApprovedPasses } from "@/interfaces/dashboard/monthlyApprovedPasses.interface";
import FitText from "@/components/shared/FitText";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function MonthlyPassesChart({
  companyName,
}: {
  companyName: string;
}) {
  const monthlyData: MonthlyApprovedPasses =
    useMonthlyApprovedPasses(companyName);
  const {
    approvedPassesToday,
    peopleWithPlusOneApprovedNext5Days,
    approvedPassesNext7Days,
  } = useVisitorPass(companyName);

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
  const maxValue = Math.ceil(Math.max(...(values as number[])));
  const scaledMaxValue = maxValue > 100 ? maxValue * 1.3 : maxValue;

  const data = {
    labels: months,
    datasets: [
      {
        label: "",
        data: values,
        borderRadius: 8,
        borderSkipped: false,
        borderWidth: 2,
        borderColor: (ctx: { dataIndex: number }) => {
          const index = ctx.dataIndex;
          return index === currentMonthIndex ? "#ff005e" : "#53F7F6";
        },
        backgroundColor: (ctx: Context) => {
          const index = ctx.dataIndex;
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;

          if (!chartArea) {
            return undefined;
          }

          const gradient = canvasCtx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );

          if (index === currentMonthIndex) {
            gradient.addColorStop(0, "rgba(145, 49, 78, 1)");
            gradient.addColorStop(1, "rgba(255, 0, 94, 1)");
          } else {
            gradient.addColorStop(0, "rgba(49, 145, 144, 1)");
            gradient.addColorStop(1, "rgba(83, 247, 246, 1)");
          }

          return gradient;
        },
        barPercentage: 0.5,
        categoryPercentage: 0.85,
        maxBarThickness: 20,
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
        display: maxValue !== 0,
        anchor: "end" as const,
        align: "end" as const,
        color: "#ffffff",
        font: {
          size: 12,
          weight: "bold" as const,
          family: "Anta",
        },
        offset: 4,
        borderRadius: 4,
        padding: {
          top: 4,
          bottom: 4,
          left: 6,
          right: 6,
        },
        formatter: (value: number) => value,
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
        max: scaledMaxValue,
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: (context: { index: number }) => {
            const index = context.index;
            return {
              size: 12,
              weight: (index === currentMonthIndex ? "bold" : "normal") as
                | "bold"
                | "normal",
              family: "Anta",
            };
          },
          autoSkip: false,
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full bg-main rounded-3xl p-4 overflow-hidden h-full flex flex-col">
      <div className="flex gap-6 flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <FitText
            className="text-3xl font-bold whitespace-nowrap text-approved mb-2"
            maxFontSizePx={16}
            minFontSizePx={12}
          >
            PASES APROBADOS REALIZADOS DE FORMA MENSUAL
          </FitText>
          <div className="relative flex-1 w-full h-72">
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <FitText
            className="text-3xl font-bold whitespace-nowrap text-approved mb-2"
            maxFontSizePx={16}
            minFontSizePx={12}
          >
            PASES DE VISITA
          </FitText>
          <div className="w-full text-white flex-1 flex flex-col justify-around">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 shrink-0">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-approved text-lg md:text-xl lg:text-2xl"
                />
              </div>
              <div className="flex items-start gap-2 ml-2 min-w-0">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold w-14 md:w-16 text-center shrink-0 font-anta">
                  {approvedPassesToday}
                </span>
                <p className="text-sm md:text-lg text-white text-center mt-1 break-words self-center">
                  Pases Aprobados hoy (duración 1 día)
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 shrink-0">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-approved text-lg md:text-xl lg:text-2xl"
                />
              </div>
              <div className="flex items-start gap-2 ml-2 min-w-0">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold w-14 md:w-16 text-center shrink-0 font-anta">
                  {peopleWithPlusOneApprovedNext5Days}
                </span>
                <p className="text-sm md:text-lg text-white text-center mt-1 break-words self-center">
                  Personas con +1 pase aprobados en los próximos 5 días
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 shrink-0">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-approved text-lg md:text-xl lg:text-2xl"
                />
              </div>
              <div className="flex items-start gap-2 ml-2 min-w-0">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold w-14 md:w-16 text-center shrink-0 font-anta">
                  {approvedPassesNext7Days}
                </span>
                <p className="text-sm md:text-lg text-white text-center mt-1 break-words self-center">
                  Pases Aprobados en los próximos 7 días
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

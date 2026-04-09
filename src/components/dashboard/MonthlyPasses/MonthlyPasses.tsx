import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import {
  useMonthlyApprovedPasses,
  useVisitorPass,
} from "@/hooks/useDashboardData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import FitText from "@/components/shared/FitText";
import Skeleton from "@/components/shared/Skeleton";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { getChartValues, getChartData, getChartOptions } from "./utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export default function MonthlyPassesChart({
  companyName,
}: {
  companyName: string;
}) {
  const monthlyData = useMonthlyApprovedPasses(companyName);
  const {
    approvedPassesToday,
    peopleWithPlusOneApprovedNext5Days,
    approvedPassesNext7Days,
    isLoading: isLoadingVisitor,
  } = useVisitorPass(companyName);

  const { isMd, isLg, isXl } = useBreakpoint();
  const labelFontSize = isXl ? 12 : isLg ? 11 : isMd ? 10 : 9;
  const tickFontSize = isXl ? 12 : isLg ? 11 : isMd ? 10 : 9;
  const maxTicksLimit = isMd ? undefined : 6;

  const currentMonthIndex = new Date().getMonth();
  const values = getChartValues(monthlyData);
  const maxValue = Math.ceil(Math.max(...values));
  const scaledMaxValue = maxValue * 1.3;

  const data = getChartData(monthlyData, currentMonthIndex);
  const options = getChartOptions(
    labelFontSize,
    tickFontSize,
    maxTicksLimit,
    scaledMaxValue,
    currentMonthIndex,
    maxValue,
  );

  return (
    <div className="w-full bg-main rounded-3xl p-4 overflow-hidden h-full flex flex-col">
      <div className="flex gap-6 flex-1 overflow-hidden flex-col md:flex-row">
        <div className="flex-1 flex flex-col min-w-0">
          <FitText
            className="text-3xl font-bold whitespace-nowrap text-approved mb-2"
            maxFontSizePx={16}
            minFontSizePx={12}
          >
            PASES APROBADOS REALIZADOS DE FORMA MENSUAL
          </FitText>
          <div className="relative flex-1 w-full h-48 sm:h-56 md:h-64 xl:h-72">
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
            {isLoadingVisitor ? (
              <>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 shrink-0">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-approved text-base md:text-lg xl:text-2xl"
                    />
                  </div>
                  <div className="flex items-start gap-2 ml-2 min-w-0">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-bold w-14 lg:w-16 text-center shrink-0 font-anta flex items-center justify-center">
                      <Skeleton width={40} height={32} className="mx-auto" />
                    </span>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white text-center mt-1 break-words self-center">
                      Pases Aprobados hoy (duración 1 día)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 shrink-0">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-approved text-base md:text-lg xl:text-2xl"
                    />
                  </div>
                  <div className="flex items-start gap-2 ml-2 min-w-0">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-bold w-14 lg:w-16 text-center shrink-0 font-anta flex items-center justify-center">
                      <Skeleton width={40} height={32} className="mx-auto" />
                    </span>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white text-center mt-1 break-words self-center">
                      Personas con +1 pase aprobados en los próximos 5 días
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 shrink-0">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-approved text-base md:text-lg xl:text-2xl"
                    />
                  </div>
                  <div className="flex items-start gap-2 ml-2 min-w-0">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-bold w-14 lg:w-16 text-center shrink-0 font-anta flex items-center justify-center">
                      <Skeleton width={40} height={32} className="mx-auto" />
                    </span>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white text-center mt-1 break-words self-center">
                      Pases Aprobados en los próximos 7 días
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 shrink-0">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-approved text-base md:text-lg xl:text-2xl"
                    />
                  </div>
                  <div className="flex items-start gap-2 ml-2 min-w-0">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-bold w-14 lg:w-16 text-center shrink-0 font-anta">
                      {approvedPassesToday}
                    </span>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white text-center mt-1 break-words self-center">
                      Pases Aprobados hoy (duración 1 día)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 shrink-0">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-approved text-base md:text-lg xl:text-2xl"
                    />
                  </div>
                  <div className="flex items-start gap-2 ml-2 min-w-0">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-bold w-14 lg:w-16 text-center shrink-0 font-anta">
                      {peopleWithPlusOneApprovedNext5Days}
                    </span>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white text-center mt-1 break-words self-center">
                      Personas con +1 pase aprobados en los próximos 5 días
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 shrink-0">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-approved text-base md:text-lg xl:text-2xl"
                    />
                  </div>
                  <div className="flex items-start gap-2 ml-2 min-w-0">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-bold w-14 lg:w-16 text-center shrink-0 font-anta">
                      {approvedPassesNext7Days}
                    </span>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white text-center mt-1 break-words self-center">
                      Pases Aprobados en los próximos 7 días
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

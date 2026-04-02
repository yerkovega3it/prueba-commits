import useCurrentTime from "@/hooks/useCurrentTime";
import {
  useCriticalOperationalAlert,
  useDashboardInfo,
} from "@/hooks/useDashboardData";
import FitText from "@/components/shared/FitText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheckCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface DashboardHeaderProps {
  companyName: string;
  onScrollToAlert: () => void;
}

function DashboardHeader({
  companyName,
  onScrollToAlert,
}: DashboardHeaderProps) {
  const { currentDateTime } = useCurrentTime();
  const { miningCompanyName, isLoading } = useDashboardInfo(companyName);
  const {
    isCriticalOperationalAlertActive,
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
  } = useCriticalOperationalAlert(companyName);

  const activeAlertCount = [
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
  ].filter((value) => typeof value === "number" && value > 0).length;

  return (
    <div className="px-3 sm:px-4 md:px-5 xl:px-6 py-2 xl:py-[8px] rounded-3xl bg-card">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-2">
        <div>
          <h1 className="font-normal text-approved leading-tight font-aldrich">
            <FitText
              className="inline-block"
              maxFontSizePx={18}
              minFontSizePx={12}
            >
              Centro de Mando SIGA -{" "}
              {isLoading ? (
                <span className="inline-block align-middle">
                  <span className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-32 h-6 inline-block" />
                </span>
              ) : (
                miningCompanyName
              )}
            </FitText>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-0.5 font-normal font-aldrich">
            Estado de faena - Actualización cada 1 hora
          </p>
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="text-center md:text-right">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal font-aldrich">
              {currentDateTime.toLocaleTimeString("es-CL", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white mt-0.5 font-aldrich">
              {currentDateTime.toLocaleDateString("es-CL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div
            className="xl:hidden flex flex-col items-center gap-0"
            onClick={
              isCriticalOperationalAlertActive ? onScrollToAlert : undefined
            }
            style={{
              cursor: isCriticalOperationalAlertActive ? "pointer" : "default",
            }}
          >
            <span className="flex flex-col items-center justify-center gap-1 px-3 py-2">
              <FontAwesomeIcon
                icon={
                  isCriticalOperationalAlertActive
                    ? faExclamationTriangle
                    : faCheckCircle
                }
                className={`text-3xl ${isCriticalOperationalAlertActive ? "text-critic" : "text-success"}`}
              />
              <span
                className={`text-xs font-aldrich ${isCriticalOperationalAlertActive ? "text-critic" : "text-success"}`}
              >
                {activeAlertCount}{" "}
                {activeAlertCount === 1 ? "Alerta activa" : "Alertas activas"}
              </span>
            </span>
            {isCriticalOperationalAlertActive && (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-xs animate-bounce text-critic"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;

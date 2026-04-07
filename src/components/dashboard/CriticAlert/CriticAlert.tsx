import CardTitle from "../shared/CardHeader";
import {
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useCriticalOperationalAlert } from "@/hooks/useDashboardData";
import Skeleton from "@/components/shared/Skeleton";
import CompanyMap from "@/components/dashboard/CompanyMap/CompanyMap";
import "./styles.css";

function CrtiticAlert({ companyName }: { companyName: string }) {
  const {
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    isCriticalOperationalAlertActive,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
    isLoading,
  } = useCriticalOperationalAlert(companyName);

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden p-3 md:p-5 xl:p-8">
      <div
        className={`${
          isCriticalOperationalAlertActive
            ? "card flex flex-col flex-1 min-h-0"
            : "relative p-2.5 rounded-2xl mb-4 flex flex-col flex-1 min-h-0"
        }`}
      >
        <div
          className={`card-content flex flex-col flex-1 min-h-0 ${
            !isCriticalOperationalAlertActive
              ? "border-5 shadow-[0_0_15px_0px_rgba(8,247,51,0.8)] border-success"
              : ""
          }`}
        >
          <CardTitle
            title="ALERTA OPERATIVA CRÍTICA EN FAENA"
            icon={
              isCriticalOperationalAlertActive
                ? faExclamationTriangle
                : faCheckCircle
            }
            titleClassName={`text-xl md:text-2xl xl:text-3xl font-bold flex flex-col break-words whitespace-normal w-full max-w-full overflow-hidden text-center ${
              !isCriticalOperationalAlertActive ? "text-success" : "text-critic"
            }`}
            iconClassName={`text-alert text-xl ${
              !isCriticalOperationalAlertActive ? "text-success" : "text-critic"
            }`}
          />

          {!isCriticalOperationalAlertActive ? (
            <div className="mt-3 flex flex-col justify-center flex-1 min-h-0 bg-success-light/20">
              <div className="text-xl md:text-2xl xl:text-3xl text-center mx-auto">
                <span className="text-success">
                  No hay alertas registradas en este momento.
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-col justify-between gap-3 flex-1 min-h-0">
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1">
                <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                  {isLoading ? (
                    <Skeleton width={40} height={32} />
                  ) : (
                    peopleWithExpiredExams
                  )}
                </span>
                <p className="text-white text-base xl:text-xl leading-tight">
                  Personas con exámenes vencidos
                </p>
              </div>

              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1">
                <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                  {isLoading ? (
                    <Skeleton width={40} height={32} />
                  ) : (
                    vehiclesWithExpiredAccreditation
                  )}
                </span>
                <p className="text-white text-base xl:text-xl leading-tight">
                  Vehículos con acreditación vencida
                </p>
              </div>

              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1">
                <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                  {isLoading ? (
                    <Skeleton width={40} height={32} />
                  ) : (
                    peopleOutOfShiftNotCheckedOutWithDailyConsumption
                  )}
                </span>
                <p className="text-white text-base xl:text-xl leading-tight">
                  Personas fuera de turno que no han registrado salida y tienen
                  consumo diario
                </p>
              </div>

              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1">
                <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                  {isLoading ? (
                    <Skeleton width={40} height={32} />
                  ) : (
                    visitorsApprovedNotCheckedOut
                  )}
                </span>
                <p className="text-white text-base  xl:text-xl leading-tight">
                  Personas con pase de visita aprobado que aún no registran
                  salida
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <CompanyMap
        companyName={companyName}
        className="hidden xl:block flex-shrink-0 mt-3 h-[200px]"
      />
    </div>
  );
}

export default CrtiticAlert;

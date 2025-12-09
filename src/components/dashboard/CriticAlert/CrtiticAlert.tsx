import CardTitle from "../shared/CardHeader";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useCriticalOperationalAlert } from "@/hooks/useDashboardData";

function CrtiticAlert() {
  const {
    peopleFinishedShiftNotCheckedOut,
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    isCriticalOperationalAlertActive,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
  } = useCriticalOperationalAlert();

  const inactiveAlerts = !isCriticalOperationalAlertActive;

  return (
    <div
      className={`lg:row-span-2 w-full max-w-full sm:max-w-sm mx-auto rounded-3xl sm:rounded-2xl p-3 sm:p-4 relative flex flex-col ${
        inactiveAlerts
          ? "border-3 shadow-[0_20px_50px_-10px_rgba(8,247,51,0.8)] border-success"
          : "border-5 shadow-[0_20px_120px_-10px_rgba(255,0,94,0.5)] border-critic-light"
      }`}
    >
      <CardTitle
        title={"ALERTA OPERATIVA CRÍTICA"}
        icon={faExclamationTriangle}
        titleClassName={`text-xl ${
          inactiveAlerts ? "text-success" : "text-critic"
        }`}
        iconClassName={"text-alert mb-1.5"}
      />
      {inactiveAlerts ? (
        <div className="flex-1 flex items-center justify-center bg-success-light/20 p-6 sm:p-8">
          <div className="text-xs sm:text-sm max-w-xs text-center">
            <span className="text-success">
              No hay alertas registradas en este momento.
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-4 sm:mt-6 flex flex-col justify-between gap-4">
          <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[16px] py-[14px]">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {peopleFinishedShiftNotCheckedOut}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas que terminaron su jornada y no se han retirado
            </p>
          </div>
          <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[16px] py-[14px]">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {peopleWithExpiredExams}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas con exámenes vencidos
            </p>
          </div>
          <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[16px] py-[14px]">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {vehiclesWithExpiredAccreditation}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Vehículos con acreditación vencida
            </p>
          </div>
          <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[16px] py-[14px]">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {peopleOutOfShiftNotCheckedOutWithDailyConsumption}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas fuera de turno que no han registrado retiro y tienen
              consumo diario
            </p>
          </div>
          <div className="bg-critic-light rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {visitorsApprovedNotCheckedOut}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas con pase de visita aprobado que aún no registran retiro
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrtiticAlert;

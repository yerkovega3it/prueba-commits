import CardTitle from "../shared/CardHeader";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useCriticalOperationalAlert } from "@/hooks/useDashboardData";
import Map from "@/assets/map.svg";

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
    <div className="flex flex-col gap-4 lg:gap-10 w-full">
      <div
        className={`w-full mx-auto rounded-3xl sm:rounded-2xl p-3 sm:p-4 relative flex flex-col ${
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
          <div className="mt-4 sm:mt-6 flex flex-col justify-center bg-success-light/20 min-h-[530px] px-[20px]">
            <div className="text-xs sm:text-sm text-center mx-auto">
              <span className="text-success">
                No hay alertas registradas en este momento.
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 sm:mt-6 flex flex-col justify-between gap-5">
            <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[20px] py-[14px] min-h-[90px]">
              <span className="text-white text-2xl sm:text-3xl font-bold shrink-0 w-12 sm:w-16 text-center">
                {peopleFinishedShiftNotCheckedOut}
              </span>
              <p className="text-white text-xs sm:text-sm leading-tight">
                Personas que terminaron su jornada y no se han retirado
              </p>
            </div>
            <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[20px] py-[14px] min-h-[90px]">
              <span className="text-white text-2xl sm:text-3xl font-bold shrink-0 w-12 sm:w-16 text-center">
                {peopleWithExpiredExams}
              </span>
              <p className="text-white text-xs sm:text-sm leading-tight">
                Personas con exámenes vencidos
              </p>
            </div>
            <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[20px] py-[14px] min-h-[90px]">
              <span className="text-white text-2xl sm:text-3xl font-bold shrink-0 w-12 sm:w-16 text-center">
                {vehiclesWithExpiredAccreditation}
              </span>
              <p className="text-white text-xs sm:text-sm leading-tight">
                Vehículos con acreditación vencida
              </p>
            </div>
            <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[20px] py-[14px] min-h-[90px]">
              <span className="text-white text-2xl sm:text-3xl font-bold shrink-0 w-12 sm:w-16 text-center">
                {peopleOutOfShiftNotCheckedOutWithDailyConsumption}
              </span>
              <p className="text-white text-xs sm:text-sm leading-tight">
                Personas fuera de turno que no han registrado retiro y tienen
                consumo diario
              </p>
            </div>
            <div className="bg-critic-light rounded-lg flex items-center gap-3 sm:gap-4 px-[20px] py-[14px] min-h-[90px]">
              <span className="text-white text-2xl sm:text-3xl font-bold shrink-0 w-12 sm:w-16 text-center">
                {visitorsApprovedNotCheckedOut}
              </span>
              <p className="text-white text-xs sm:text-sm leading-tight">
                Personas con pase de visita aprobado que aún no registran retiro
              </p>
            </div>
          </div>
        )}
      </div>
      <img
        src={Map}
        alt="Map"
        className="w-full sm:w-3/4 md:w-2/3 h-auto object-contain rounded-3xl mx-auto"
      />
    </div>
  );
}

export default CrtiticAlert;

import CardTitle from "../shared/CardHeader";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useCriticalOperationalAlert } from "@/hooks/useDashboardData";

function CrtiticAlert() {
  const {
    peopleFinishedShiftNotCheckedOut,
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    peopleNotRegisteredExit,
    visitorsApprovedNotCheckedOut,
  } = useCriticalOperationalAlert();

  const noAlerts =
    peopleFinishedShiftNotCheckedOut === 0 &&
    peopleWithExpiredExams === 0 &&
    vehiclesWithExpiredAccreditation === 0 &&
    peopleNotRegisteredExit === 0 &&
    visitorsApprovedNotCheckedOut === 0;

  //const noAlerts = true;

  return (
    <div
      className={`lg:row-span-2 w-full max-w-full sm:max-w-sm mx-auto rounded-xl sm:rounded-2xl p-3 sm:p-4 relative ${
        noAlerts
          ? "border-3 shadow-[0_20px_50px_-10px_rgba(8,247,51,0.8)] border-success"
          : "border-5 shadow-[0_20px_120px_-10px_rgba(255,0,94,0.5)] border-critic-light"
      }`}
    >
      <CardTitle
        title={"ALERTA OPERATIVA CRÍTICA"}
        icon={faExclamationTriangle}
        titleClassName={`text-xl  my-2 ${
          noAlerts ? "text-success" : "text-critic"
        }`}
        iconClassName={"text-alert mb-1.5"}
      />
      {noAlerts ? (
        <div className="mt-4 sm:mt-6 flex justify-center items-center text-xs sm:text-sm max-w-xs mx-auto text-center bg-success-light/20 p-6 sm:p-8 min-h-[300px] sm:min-h-[500px]">
          <span className="text-success">
            No hay alertas registradas en este momento.
          </span>
        </div>
      ) : (
        <>
          <div className="bg-critic-light rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3 flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {peopleFinishedShiftNotCheckedOut}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas que terminaron su jornada y no se han retirado
            </p>
          </div>

          <div className="bg-critic-light rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3 flex items-center gap-3 sm:gap-4">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {peopleWithExpiredExams}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas con exámenes vencidos
            </p>
          </div>

          <div className="bg-critic-light rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3 flex items-center gap-3 sm:gap-4">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {vehiclesWithExpiredAccreditation}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Vehículos con acreditación vencida
            </p>
          </div>

          <div className="bg-critic-light rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3 flex items-center gap-3 sm:gap-4">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {peopleNotRegisteredExit}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas que no han marcado su salida
            </p>
          </div>

          <div className="bg-critic-light rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <span className="text-white text-2xl sm:text-3xl font-bold shrink-0">
              {visitorsApprovedNotCheckedOut}
            </span>
            <p className="text-white text-xs sm:text-sm leading-tight">
              Personas con pase de visita aprobado que aún no registran retiro
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default CrtiticAlert;

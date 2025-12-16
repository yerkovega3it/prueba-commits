import CardTitle from "../shared/CardHeader";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useCriticalOperationalAlert } from "@/hooks/useDashboardData";
import Map from "@/assets/map.svg";
import "./styles.css";

function CrtiticAlert() {
  const {
    peopleFinishedShiftNotCheckedOut,
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    isCriticalOperationalAlertActive,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
  } = useCriticalOperationalAlert();

  const inactiveAlerts = isCriticalOperationalAlertActive;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden p-8 ">
      <div className="card ">
        <div
          className={`card-content ${
            inactiveAlerts
              ? "border-5 shadow-[0_0_15px_0px_rgba(8,247,51,0.8)] border-success"
              : ""
          }
           `}
        >
          <CardTitle
            title={"ALERTA OPERATIVA CRÍTICA"}
            icon={faExclamationTriangle}
            titleClassName={`text-3xl font-bold whitespace-nowrap ${
              inactiveAlerts ? "text-success" : "text-critic"
            }`}
            iconClassName={"text-alert mb-1.5 text-3xl"}
          />
          {inactiveAlerts ? (
            <div className="mt-3 flex flex-col justify-center flex-1 bg-success-light/20 px-[20px]">
              <div className="text-3xl text-center mx-auto">
                <span className="text-success">
                  No hay alertas registradas en este momento.
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-col justify-between gap-3 flex-1 overflow-hidden">
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-6xl font-bold shrink-0 w-20 text-center font-anta">
                  {peopleFinishedShiftNotCheckedOut}
                </span>
                <p className="text-white text-lg leading-tight">
                  Personas fuera de turno y no han marcado salida
                </p>
              </div>
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-6xl font-bold shrink-0 w-20 text-center font-anta">
                  {peopleWithExpiredExams}
                </span>
                <p className="text-white text-lg leading-tight">
                  Personas con exámenes vencidos
                </p>
              </div>
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-6xl font-bold shrink-0 w-20 text-center font-anta">
                  {vehiclesWithExpiredAccreditation}
                </span>
                <p className="text-white text-lg leading-tight">
                  Vehículos con acreditación vencida
                </p>
              </div>
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-6xl font-bold shrink-0 w-20 text-center font-anta">
                  {peopleOutOfShiftNotCheckedOutWithDailyConsumption}
                </span>
                <p className="text-white text-lg leading-tight">
                  Personas fuera de turno que no han registrado retiro y tienen
                  consumo diario
                </p>
              </div>
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-6xl font-bold shrink-0 w-20 text-center font-anta">
                  {visitorsApprovedNotCheckedOut}
                </span>
                <p className="text-white text-lg leading-tight">
                  Personas con pase de visita aprobado que aún no registran
                  retiro
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <img
        src={Map}
        alt="Map"
        className="w-full h-auto object-contain rounded-3xl flex-shrink-0 mt-3"
        style={{ maxHeight: "25%" }}
      />
    </div>
  );
}

export default CrtiticAlert;

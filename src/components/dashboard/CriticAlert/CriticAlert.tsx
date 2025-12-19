import CardTitle from "../shared/CardHeader";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useCriticalOperationalAlert } from "@/hooks/useDashboardData";
import { useState } from "react";
import "./styles.css";

function CrtiticAlert({ companyName }: { companyName: string }) {
  const {
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    isCriticalOperationalAlertActive,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
  } = useCriticalOperationalAlert(companyName);

  const [imageExists, setImageExists] = useState(true);
  const imageSrc = `src/assets/maps/${companyName}.svg`;

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden p-8">
      <div
        className={`$${
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
          }
           `}
        >
          <CardTitle
            title={"ALERTA OPERATIVA CRÍTICA EN FAENA"}
            icon={faExclamationTriangle}
            titleClassName={`text-3xl font-bold flex flex-col break-words whitespace-normal w-full max-w-full overflow-hidden text-center ${
              !isCriticalOperationalAlertActive ? "text-success" : "text-critic"
            }`}
            iconClassName={`text-alert text-xl ${
              !isCriticalOperationalAlertActive ? "text-success" : "text-critic"
            }`}
          />
          {!isCriticalOperationalAlertActive ? (
            <div className="mt-3 flex flex-col justify-center flex-1 min-h-0 bg-success-light/20">
              <div className="text-3xl text-center mx-auto">
                <span className="text-success">
                  No hay alertas registradas en este momento.
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-col justify-between gap-3 flex-1 min-h-0 overflow-hidden">
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-4xl font-bold shrink-0 w-20 text-center font-anta">
                  {peopleWithExpiredExams}
                </span>
                <p className="text-white text-lg leading-tight">
                  Personas con exámenes vencidos
                </p>
              </div>
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-4xl font-bold shrink-0 w-20 text-center font-anta">
                  {vehiclesWithExpiredAccreditation}
                </span>
                <p className="text-white text-lg leading-tight">
                  Vehículos con acreditación vencida
                </p>
              </div>
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-4xl font-bold shrink-0 w-20 text-center font-anta">
                  {peopleOutOfShiftNotCheckedOutWithDailyConsumption}
                </span>
                <p className="text-white text-lg leading-tight">
                  Personas fuera de turno que no han registrado salida y tienen
                  consumo diario
                </p>
              </div>
              <div className="bg-critic-light rounded-lg flex items-center gap-3 px-[20px] py-[14px] flex-1 min-h-0">
                <span className="text-white text-4xl font-bold shrink-0 w-20 text-center font-anta">
                  {visitorsApprovedNotCheckedOut}
                </span>
                <p className="text-white text-lg leading-tight">
                  Personas con pase de visita aprobado que aún no registran
                  salida
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {imageExists ? (
        <img
          src={imageSrc}
          alt="Map"
          className="w-full h-[200px] object-contain rounded-3xl flex-shrink-0 mt-3"
          onError={() => setImageExists(false)}
        />
      ) : (
        <div className="w-full h-[200px] object-contain rounded-3xl flex-shrink-0 mt-3" />
      )}
    </div>
  );
}

export default CrtiticAlert;

import {
  faCalendarDay,
  faCarSide,
  faClipboardCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import AlertCard from "./AlertCard";
import CardTitle from "../shared/CardHeader";

function CriticalAlerts() {
  const [withDataMode, setWithDataMode] = useState<boolean>(true);

  const handleModeSwitch = () => {
    setWithDataMode(!withDataMode);
  };

  return (
    <div
      className={`col-span-1 lg:col-span-3 min-h-[390px] border ${
        withDataMode ? "border-critical" : "border-approved"
      } p-6 rounded-xl bg-card flex flex-col gap-2`}
    >
      <div className="min-[1024px]:max-[1200px]:flex-col flex justify-between items-start md:items-center gap-2 sm:mb-2 md:mb-4 lg:mb-6">
        <CardTitle
          icon={faTriangleExclamation}
          iconClassName="text-white"
          title="Alerta Operativa Crítica"
        />
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={withDataMode}
                onChange={handleModeSwitch}
                className="sr-only"
              />
              <div
                className={
                  "border-2 border-white w-10 h-6 rounded-full transition-colors bg-gray-600"
                }
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    withDataMode ? "translate-x-4" : ""
                  }`}
                />
              </div>
            </div>
            <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">
              Con datos
            </span>
          </label>
        </div>
      </div>
      {withDataMode ? (
        <div className="flex flex-col gap-2">
          <AlertCard
            icon={faCalendarDay}
            value={3}
            label="Jornadas No Retiradas"
          />
          <AlertCard
            icon={faClipboardCheck}
            value={30}
            label="Exámenes Vencidos"
          />
          <AlertCard icon={faIdCard} value={7} label="Licencias Vencidas" />
          <AlertCard
            icon={faCarSide}
            value={5}
            label="Vehículos No Acreditados"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <h3 className="text-center text-[#64CCC9] text-xl mt-10 mb-10">
            No hay alertas registradas en este momento.
          </h3>
        </div>
      )}
    </div>
  );
}

export default CriticalAlerts;

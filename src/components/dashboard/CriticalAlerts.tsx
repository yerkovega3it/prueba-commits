import AnimatedCounter from "../animatedCounter/AnimatedCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCarSide,
  faClipboardCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

function CriticalAlerts() {
  const [withDataMode, setWithDataMode] = useState<boolean>(true);

  const handleModeSwitch = () => {
    setWithDataMode(!withDataMode);
  };

  return (
    <div
      className={`lg:col-span-3 ${
        withDataMode ? "border-4" : "border-2 border-[#64CCC9]"
      } p-3 sm:p-4 lg:p-6 rounded-xl bg-black transition-shadow duration-300 flex flex-col gap-2 animate-neon-glow`}
      style={
        withDataMode
          ? {
              boxShadow:
                "0 0 30px #ff0055, 0 0 60px #ff0055, inset 0 0 30px rgba(255,0,85,0.2)",
            }
          : {}
      }
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 sm:mb-2 md:mb-4 lg:mb-6">
        <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-neon-pink flex items-center gap-2 shrink-0">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className={`${
              withDataMode ? "animate-pulse" : ""
            } text-sm sm:text-base lg:text-lg`}
            style={
              withDataMode
                ? {
                    filter:
                      "drop-shadow(0 0 10px #ff0055) drop-shadow(0 0 20px #ff0055)",
                  }
                : {}
            }
          />
          Alerta Operativa Crítica
        </h2>
        <div className="flex justify-start md:justify-end w-full md:w-auto">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={withDataMode}
                onChange={handleModeSwitch}
                className="sr-only"
              />
              <div
                className={`border-2 border-white w-10 h-6 rounded-full transition-colors ${
                  withDataMode ? "bg-neon-pink" : "bg-gray-600"
                }`}
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
        <div className="grid grid-cols-2 gap-2">
          <div
            className="border-2 border-neon-pink p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
            style={{
              boxShadow: "0 0 15px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
            }}
          >
            <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="text-neon-pink text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
              />
            </div>
            <div className="text-left flex-1">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-pink leading-none">
                <AnimatedCounter value={3} />
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Jornadas No Retiradas
              </p>
            </div>
          </div>
          <div
            className="border-2 border-neon-orange p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
            style={{
              boxShadow: "0 0 15px #ff9900, inset 0 0 10px rgba(255,153,0,0.1)",
            }}
          >
            <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="text-neon-orange text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
              />
            </div>
            <div className="text-left flex-1">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-orange leading-none">
                <AnimatedCounter value={30} />
              </p>
              <p className="text-xs text-gray-300 mt-1">Exámenes Vencidos</p>
            </div>
          </div>
          <div
            className="border-2 border-neon-orange p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
            style={{
              boxShadow: "0 0 15px #ff9900, inset 0 0 10px rgba(255,153,0,0.1)",
            }}
          >
            <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-neon-orange text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
              />
            </div>
            <div className="text-left flex-1">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-orange leading-none">
                <AnimatedCounter value={7} />
              </p>
              <p className="text-xs text-gray-300 mt-1">Licencias Vencidas</p>
            </div>
          </div>
          <div
            className="border-2 border-neon-yellow p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
            style={{
              boxShadow: "0 0 15px #ffff00, inset 0 0 10px rgba(255,255,0,0.1)",
            }}
          >
            <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
              <FontAwesomeIcon
                icon={faCarSide}
                className="text-neon-yellow text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
              />
            </div>
            <div className="text-left flex-1">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-yellow leading-none">
                <AnimatedCounter value={5} />
              </p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Vehículos No Acreditados
              </p>
            </div>
          </div>
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

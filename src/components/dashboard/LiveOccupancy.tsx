import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedCounter from "../animatedCounter/AnimatedCounter";
import useDashboardData from "@/hooks/useDashboardData";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";

function LiveOccupancy() {
  const {
    peopleOnSite,
    maxCapacity,
    occupancyPercentage,
    entryPerHour,
    exitPerHour,
  } = useDashboardData();
  return (
    <div
      className="lg:col-span-2 border-2 border-neon-cyan p-3 sm:p-4 lg:p-6 rounded-xl bg-black transition-shadow duration-300 flex flex-col justify-between"
      style={{
        boxShadow: "0 0 15px #00ffff, inset 0 0 15px rgba(0,255,255,0.1)",
      }}
    >
      <h2 className="text-sm sm:text-base lg:text-xl font-semibold mb-2 flex items-center gap-2 text-neon-cyan shrink-0">
        <FontAwesomeIcon
          icon={faUserClock}
          className="text-neon-cyan text-sm sm:text-base lg:text-lg animate-neon-pulse"
        />{" "}
        Personas en Faena (Tiempo Real)
      </h2>
      <div className="text-center shrink-0">
        <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-neon-cyan mb-1">
          <AnimatedCounter value={peopleOnSite} />
        </p>
        <p className="text-xs text-gray-400 mb-1">
          Capacidad Máx: {maxCapacity.toLocaleString()}
        </p>
        <div className="mt-1 mb-2">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <div className="bg-gray-950 h-1.5 sm:h-2 rounded-full flex-1 overflow-hidden border border-neon-cyan">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${occupancyPercentage}%`,
                  background:
                    "linear-gradient(90deg, #00ffff 0%, #00ff88 100%)",
                  boxShadow: "0 0 10px #00ffff",
                }}
              />
            </div>
            <span className="text-sm sm:text-base lg:text-lg font-bold text-neon-cyan">
              {occupancyPercentage}%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Ocupación</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 shrink-0">
        <div
          className="border-2 border-neon-green p-2 rounded-lg bg-gray-900 flex items-center gap-1.5 justify-center"
          style={{
            boxShadow: "0 0 10px #00ff88, inset 0 0 10px rgba(0,255,136,0.1)",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            className="text-neon-green text-xl sm:text-2xl lg:text-4xl animate-neon-pulse"
          />
          <div className="text-left">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-green leading-none">
              <AnimatedCounter value={entryPerHour} />
            </p>
            <p className="text-xs text-gray-400 mt-1">/ Hr Entrada</p>
          </div>
        </div>
        <div
          className="border-2 border-neon-pink p-2 rounded-lg bg-gray-900 flex items-center gap-1.5 justify-center"
          style={{
            boxShadow: "0 0 10px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="text-neon-pink text-xl sm:text-2xl lg:text-4xl animate-neon-pulse"
          />
          <div className="text-left">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-pink leading-none">
              <AnimatedCounter value={exitPerHour} />
            </p>
            <p className="text-xs text-gray-400 mt-1">/ Hr Salida</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveOccupancy;

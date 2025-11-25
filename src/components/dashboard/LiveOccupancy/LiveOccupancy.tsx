import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDashboardData from "@/hooks/useDashboardData";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import CardTitle from "../shared/CardHeader";

function LiveOccupancy() {
  const {
    peopleOnSite,
    maxCapacity,
    occupancyPercentage,
    entryPerHour,
    exitPerHour,
  } = useDashboardData();
  return (
    <div className="col-span-1 lg:col-span-2 p-6 rounded-xl bg-card flex flex-col gap-4 justify-around">
      <CardTitle
        icon={faClock}
        title="Estado en faena"
        iconClassName="text-info"
      />
      <div>
        <p className="text-6xl font-bold mb-1 text-center">{peopleOnSite}</p>
        <p className="text-lg text-white my-2 text-center">
          Personas en Faena (tiempo real)
        </p>
        <p className="text-sm text-white lg:mb-4 text-center">
          Capacidad Máx: {maxCapacity.toLocaleString()}
        </p>
      </div>
      <div>
        <span className="text-sm">Ocupación: {occupancyPercentage}%</span>
        <div className="flex items-center justify-center gap-1 sm:gap-2 mt-1">
          <div className="bg-gray-950 h-1.5 sm:h-2 rounded-full flex-1 overflow-hidden border">
            <div
              className="h-full rounded-full"
              style={{
                width: `${occupancyPercentage}%`,
                background: "linear-gradient(90deg, #00ffff 0%, #00ff88 100%)",
                boxShadow: "0 0 10px #00ffff",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded-lg bg-main flex items-center gap-1.5 justify-center">
          <div className="text-left">
            <p className="text-xl text-center tracking-widest mb-1">
              {entryPerHour} / hr
            </p>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className="text-xs text-info"
              />
              <p className="text-xs text-white tracking-tight">Entrada</p>
            </div>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-main flex items-center gap-1.5 justify-center">
          <div className="text-left">
            <p className="text-xl text-center tracking-widest mb-1">
              {exitPerHour} / hr
            </p>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-xs text-info"
              />
              <p className="text-xs text-white tracking-tight">Salida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveOccupancy;

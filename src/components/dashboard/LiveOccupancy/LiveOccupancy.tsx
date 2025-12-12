import { useLaborStatus } from "@/hooks/useDashboardData";
import DashboardCard from "../shared/DashboardCard";
import StatCard from "../shared/StatCard";
import {
  faUtensils,
  faArrowRight,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

function LiveOccupancy() {
  const {
    peopleOnSite,
    peopleRepeatedSameDiningHallConsumption,
    peopleOutOfShiftAndNotRegisteredExit,
    peopleDidNotShowUpForFlight,
  } = useLaborStatus();

  return (
    <DashboardCard
      title="ESTADO EN FAENA"
      contentClassName="flex flex-col items-center sm:items-end gap-4 sm:gap-6 justify-between mt-3"
      className="col-span-1 p-4 sm:p-5 lg:p-6 rounded-3xl bg-main h-full"
    >
      <div className="w-full sm:w-auto mx-auto p-4 sm:p-5 lg:p-6">
        <p className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-center text-approved">
          {peopleOnSite}
        </p>
        <p className="text-sm sm:text-base lg:text-lg text-white text-center">
          Personas en Faena
        </p>
      </div>
      <div className="rounded-3xl bg-main h-full flex flex-col justify-around gap-8 mt-2 w-full mx-auto">
        <StatCard
          icon={faArrowRight}
          value={peopleOutOfShiftAndNotRegisteredExit}
          label="Personas fuera de turno y no han marcado salida"
        />
        <StatCard
          icon={faUtensils}
          value={peopleRepeatedSameDiningHallConsumption}
          label="Personas han repetido un mismo consumo en casino"
        />
        <StatCard
          icon={faPlaneDeparture}
          value={peopleDidNotShowUpForFlight}
          label="Personas no se presentaron al vuelo"
        />
      </div>
    </DashboardCard>
  );
}

export default LiveOccupancy;

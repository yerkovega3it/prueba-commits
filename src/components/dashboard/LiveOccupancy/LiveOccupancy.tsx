import { useLaborStatus } from "@/hooks/useDashboardData";
import DashboardCard from "../shared/DashboardCard";
import StatCard from "../shared/StatCard";
import {
  faUtensils,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

function LiveOccupancy() {
  const {
    peopleOnSite,
    peopleRepeatedSameDiningHallConsumption,
    peopleDidNotShowUpForFlight,
  } = useLaborStatus();

  return (
    <DashboardCard
      title="ESTADO EN FAENA"
      titleClassName="text-3xl font-bold whitespace-nowrap text-approved"
      contentClassName="flex flex-col items-center gap-24 lg:gap-20 xl:gap-12 mt-20 lg:mt-16 xl:mt-12 h-full"
      className="col-span-1 p-4 rounded-3xl bg-main h-full"
    >
      <div className="w-full mx-auto flex-none flex flex-col items-center">
        <p className="text-6xl md:text-8xl lg:text-[9rem] text-center text-approved font-anta leading-none">
          {peopleOnSite}
        </p>
        <p className="text-xl md:text-2xl text-white text-center mt-2">
          Personas en Faena
        </p>
      </div>
      <div className="rounded-3xl bg-main flex-none flex flex-col items-stretch justify-center gap-16 lg:gap-14 w-full mx-auto">
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
